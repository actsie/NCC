// Vercel Serverless Function for Discord Notifications with Email List Tracking
// This keeps the bot token secure on the server side

const INITIAL_EMAILS = [
  'sora@apasport.xyz',
  'nonfungiblemomo@gmail.com',
  'ok2spam@sarsorito.com',
  'yusuke.tanaka@restup.co',
  'shun@remotehour.com',
  'kwabena.a92@gmail.com',
  'anitagagarina@gmail.com',
  'espangenberg@gmail.com',
  'ash.kind@labskilo.com',
  '1patfrancis@gmail.com',
  'kldeepak745@gmail.com',
  'matthewjwheeler@yahoo.com',
  'matthewwheeler25@gmail.com',
  'ferdinand@alura.no',
  'dominik@adamec.pro',
  'mayunekominegoro@gmail.com',
  'emaildonovin@gmail.com',
  'flor@alchemy.com',
  'benjackson990@gmail.com',
  'ruinawayo@gmail.com'
];

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, idea, source, path, formData } = req.body;

  // Validate required fields
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
  const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
  const DISCORD_SIGNUP_WEBHOOK_URL = process.env.DISCORD_SIGNUP_WEBHOOK_URL;

  // Validate environment variables
  if (!DISCORD_BOT_TOKEN || !DISCORD_CHANNEL_ID || !DISCORD_SIGNUP_WEBHOOK_URL) {
    console.error('Missing Discord environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Step 1: Fetch the last message from the Discord channel
    let existingEmails = [...INITIAL_EMAILS];

    try {
      const messagesResponse = await fetch(
        `https://discord.com/api/v10/channels/${DISCORD_CHANNEL_ID}/messages?limit=1`,
        {
          headers: {
            'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (messagesResponse.ok) {
        const messages = await messagesResponse.json();

        if (messages.length > 0) {
          const lastMessage = messages[0];

          // Parse email list from the last message
          if (lastMessage.content) {
            const emailRegex = /\d+\.\s+([^\n]+@[^\n]+)/g;
            const matches = [...lastMessage.content.matchAll(emailRegex)];

            if (matches.length > 0) {
              existingEmails = matches.map(match => match[1].trim());
            }
          }
        }
      }
    } catch (fetchError) {
      console.log('Could not fetch previous messages, using initial list:', fetchError.message);
    }

    // Step 2: Add new email to the list (avoid duplicates)
    const emailLower = email.toLowerCase().trim();
    const isDuplicate = existingEmails.some(e => e.toLowerCase() === emailLower);

    if (!isDuplicate) {
      existingEmails.push(email);
    }

    // Step 3: Format the Discord message
    const totalCount = existingEmails.length;
    const emailList = existingEmails
      .map((e, index) => `${index + 1}. ${e}`)
      .join('\n');

    // Get source emoji and label
    const sourceMap = {
      'landing_chat': { emoji: '💬', label: 'Chat Interface' },
      'animated_button': { emoji: '🎯', label: 'Animated Button' },
      'early_access': { emoji: '🎟️', label: 'Early Access Modal' }
    };

    const sourceInfo = sourceMap[source] || { emoji: '📝', label: 'Form' };

    // Format additional details
    let details = `📧 **New Email:** ${email}\n`;

    if (idea) {
      details += `💡 **Idea:** ${idea}\n`;
    }

    if (formData) {
      if (formData.firstName) details += `👤 **Name:** ${formData.firstName}\n`;
      if (formData.platform) details += `💻 **Platform:** ${formData.platform}\n`;
      if (formData.codingComfort) details += `🎓 **Coding Level:** ${formData.codingComfort}\n`;
      if (formData.firstTool) details += `🛠️ **First Tool:** ${formData.firstTool}\n`;
    }

    if (path) {
      details += `📍 **Page:** ${path}\n`;
    }

    details += `⏰ **Time:** ${new Date().toISOString()}\n`;

    const messageContent = `${sourceInfo.emoji} **New Signup #${totalCount}** - ${sourceInfo.label}
━━━━━━━━━━━━━━━━━━━━━
${details}
📊 **Total Signups: ${totalCount}**${isDuplicate ? ' (duplicate - not added)' : ''}
━━━━━━━━━━━━━━━━━━━━━
**Email List:**
${emailList}`;

    // Step 4: Send to Discord webhook
    const webhookResponse = await fetch(DISCORD_SIGNUP_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: messageContent
      })
    });

    if (!webhookResponse.ok) {
      throw new Error(`Discord webhook failed: ${webhookResponse.status}`);
    }

    // Success!
    return res.status(200).json({
      success: true,
      totalCount,
      isDuplicate
    });

  } catch (error) {
    console.error('Discord notification error:', error);

    // Return success to not break user experience, but log the error
    return res.status(200).json({
      success: false,
      error: error.message
    });
  }
}
