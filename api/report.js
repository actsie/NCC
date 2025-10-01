// Vercel Serverless Function for Bug Report Submission
// Handles JSON and multipart/form-data with Busboy

const Busboy = require('busboy');

// File validation
const ALLOWED_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/jpg',
  'text/plain',
  'application/json',
  'text/log'
]);
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

// In-memory rate limiter
const requestLog = new Map();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 1000;

function checkRateLimit(ip, ua) {
  const key = `${ip}:${ua}`;
  const now = Date.now();

  if (!requestLog.has(key)) {
    requestLog.set(key, []);
  }

  const requests = requestLog.get(key);
  const recent = requests.filter(t => now - t < WINDOW_MS);

  if (recent.length >= RATE_LIMIT) {
    return { allowed: false, resetAt: new Date(recent[0] + WINDOW_MS).toISOString() };
  }

  recent.push(now);
  requestLog.set(key, recent);

  // Cleanup
  if (Math.random() < 0.01) {
    for (const [k, ts] of requestLog.entries()) {
      const valid = ts.filter(t => now - t < WINDOW_MS);
      if (valid.length === 0) requestLog.delete(k);
      else requestLog.set(k, valid);
    }
  }

  return { allowed: true };
}

function generateTicketId() {
  return `PG-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

// Vercel automatically parses JSON body into req.body
// No helper needed!

module.exports = async (req, res) => {
  // Only accept POST
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
  }

  // CORS
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'https://ncc-nine.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Rate limiting
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const ua = req.headers['user-agent'] || 'unknown';
  const rateCheck = checkRateLimit(ip, ua);

  if (!rateCheck.allowed) {
    res.statusCode = 429;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      ok: false,
      error: 'Too many requests. Please try again later.',
      resetAt: rateCheck.resetAt
    }));
  }

  const ticketId = generateTicketId();
  const ct = req.headers['content-type'] || '';

  try {
    let payload = {};
    let fileBuffer = null;
    let fileName = null;
    let fileType = null;
    let totalBytes = 0;

    // Parse based on content type
    if (ct.includes('multipart/form-data')) {
      await new Promise((resolve, reject) => {
        const bb = Busboy({ headers: req.headers, limits: { fileSize: MAX_FILE_SIZE } });

        bb.on('field', (name, val) => {
          if (name === 'payload') {
            try {
              payload = JSON.parse(val);
            } catch (err) {
              console.error('Failed to parse payload JSON:', err);
            }
          }
        });

        bb.on('file', (_name, file, info) => {
          fileName = info.filename || 'upload';
          fileType = info.mimeType || 'application/octet-stream';

          if (!ALLOWED_TYPES.has(fileType)) {
            file.resume(); // drain stream
            return reject(new Error(`Unsupported file type: ${fileType}`));
          }

          const chunks = [];
          file.on('data', (chunk) => {
            totalBytes += chunk.length;
            if (totalBytes > MAX_FILE_SIZE) {
              file.resume(); // drain
              return reject(new Error('File too large (max 2 MB)'));
            }
            chunks.push(chunk);
          });

          file.on('end', () => {
            fileBuffer = Buffer.concat(chunks);
          });

          file.on('error', reject);
        });

        bb.on('finish', resolve);
        bb.on('error', reject);
        req.pipe(bb);
      });
    } else if (ct.includes('application/json')) {
      // Vercel automatically parses JSON into req.body
      payload = req.body || {};
    } else {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ ok: false, error: 'Unsupported content type' }));
    }

    // Bot detection - honeypot
    if (payload.website) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ ok: false, error: 'Invalid submission' }));
    }

    // Bot detection - timing check
    if (payload.formLoadTime) {
      const timeDiff = Date.now() - parseInt(payload.formLoadTime, 10);
      if (timeDiff < 2000) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ ok: false, error: 'Invalid submission' }));
      }
    }

    // Validation
    if (!payload.summary || payload.summary.trim().length < 5) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ ok: false, error: 'Summary is required (min 5 characters)' }));
    }

    // Build Discord embed
    const embed = {
      title: `🐞 Bug: ${String(payload.summary).slice(0, 80)}`,
      color: 0xF87171,
      fields: [
        {
          name: 'Happened in',
          value: payload.location || 'Pawgrammer app',
          inline: true
        },
        {
          name: 'Email',
          value: payload.email || '—',
          inline: true
        },
        {
          name: 'Steps to reproduce',
          value: (payload.steps || '—').slice(0, 1024)
        },
        {
          name: 'Pasted error output',
          value: (payload.errorOutput || '—').slice(0, 900)
        },
        {
          name: 'Page URL',
          value: payload.pageUrl || '—'
        },
        {
          name: 'Environment',
          value: `${payload.ua || ''}\n${payload.viewport || ''}`.trim() || '—'
        },
      ],
      footer: { text: `Ticket ${ticketId}` },
      timestamp: new Date().toISOString(),
    };

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('DISCORD_WEBHOOK_URL not configured');
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({
        ok: false,
        error: 'Report service not configured. Please email us instead.',
        mailto: `mailto:stacy@pawgrammer.com?subject=Bug Report ${ticketId}&body=${encodeURIComponent(`Summary: ${payload.summary}\n\nSteps: ${payload.steps || 'N/A'}\n\nError: ${payload.errorOutput || 'N/A'}`)}`
      }));
    }

    // Send to Discord (with or without attachment)
    let webhookRes;

    if (fileBuffer) {
      // Send with file attachment using FormData
      // Node 18+ provides fetch, FormData, and Blob globally
      const form = new FormData();
      form.append('payload_json', JSON.stringify({ embeds: [embed] }));
      form.append('file', new Blob([fileBuffer], { type: fileType }), fileName);

      webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        body: form
      });
    } else {
      // Send JSON only
      webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] })
      });
    }

    // Handle Discord rate limiting
    if (webhookRes.status === 429) {
      const retryAfter = parseInt(webhookRes.headers.get('retry-after') || '1', 10) * 1000;
      await new Promise(resolve => setTimeout(resolve, retryAfter));

      // Retry once
      webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] })
      });
    }

    if (!webhookRes.ok) {
      const errorText = await webhookRes.text();
      console.error('Discord webhook failed:', webhookRes.status, errorText);

      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({
        ok: false,
        error: 'Failed to submit report. Please try again or email us.',
        mailto: `mailto:stacy@pawgrammer.com?subject=Bug Report ${ticketId}&body=${encodeURIComponent(`Summary: ${payload.summary}\n\nSteps: ${payload.steps || 'N/A'}\n\nError: ${payload.errorOutput || 'N/A'}`)}`
      }));
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      ok: true,
      ticketId,
      message: 'Report submitted successfully!'
    }));

  } catch (error) {
    console.error('Error processing bug report:', error);

    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      ok: false,
      error: `Server error: ${error.message}`,
      mailto: `mailto:stacy@pawgrammer.com?subject=Bug Report ${ticketId}&body=Please describe your issue here`
    }));
  }
};