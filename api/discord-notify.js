// Vercel Serverless Function for Discord Notifications with Google Sheets Email Tracking
const { google } = require('googleapis');

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

  const DISCORD_SIGNUP_WEBHOOK_URL = process.env.DISCORD_SIGNUP_WEBHOOK_URL;
  const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
  const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

  // Validate environment variables
  if (!DISCORD_SIGNUP_WEBHOOK_URL || !GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    console.error('Missing environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Step 1: Read existing emails from Google Sheets
    let existingEmails = [];
    let debugInfo = {
      sheetsAttempted: true,
      sheetsSuccess: false,
      emailsFetched: 0,
      error: null
    };

    try {
      // Initialize Google Sheets API
      const auth = new google.auth.JWT(
        GOOGLE_SERVICE_ACCOUNT_EMAIL,
        null,
        GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        ['https://www.googleapis.com/auth/spreadsheets']
      );

      const sheets = google.sheets({ version: 'v4', auth });

      // Read emails from column A (starting from row 2, skipping header)
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: 'A2:A', // Column A, starting from row 2
      });

      const rows = response.data.values || [];
      existingEmails = rows.map(row => row[0]).filter(e => e && e.includes('@'));
      debugInfo.emailsFetched = existingEmails.length;
      debugInfo.sheetsSuccess = true;
      console.log('[DEBUG] Successfully fetched', existingEmails.length, 'emails from Google Sheets');
    } catch (sheetsError) {
      debugInfo.error = `Sheets error: ${sheetsError.message}`;
      console.error('[DEBUG] Google Sheets fetch error:', sheetsError.message);
    }

    // Step 2: Add new email to the list (avoid duplicates)
    const emailLower = email.toLowerCase().trim();
    const isDuplicate = existingEmails.some(e => e.toLowerCase() === emailLower);

    if (!isDuplicate) {
      existingEmails.push(email);

      // Step 3: Write the new email to Google Sheets
      try {
        const auth = new google.auth.JWT(
          GOOGLE_SERVICE_ACCOUNT_EMAIL,
          null,
          GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          ['https://www.googleapis.com/auth/spreadsheets']
        );

        const sheets = google.sheets({ version: 'v4', auth });

        // Append new row with email, timestamp, source, and optional form data
        const newRow = [
          email,
          new Date().toISOString(),
          source || 'unknown',
          formData?.firstName || '',
          formData?.platform || '',
          formData?.codingComfort || '',
          formData?.firstTool || '',
          idea || '',
          path || ''
        ];

        await sheets.spreadsheets.values.append({
          spreadsheetId: GOOGLE_SHEET_ID,
          range: 'A:I',
          valueInputOption: 'RAW',
          resource: {
            values: [newRow]
          }
        });

        console.log('[DEBUG] Successfully wrote new email to Google Sheets');
      } catch (writeError) {
        console.error('[DEBUG] Failed to write to Google Sheets:', writeError.message);
        debugInfo.error = `Write error: ${writeError.message}`;
      }
    }

    // Step 4: Format the Discord message
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

    // Step 5: Send to Discord webhook
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
      isDuplicate,
      debug: debugInfo
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
