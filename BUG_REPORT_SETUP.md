# Bug Report System Setup

This project includes a bug reporting system that allows users to submit bug reports directly from the docs site, which are then posted to a Discord channel.

## Features

- **Modal Form**: Clean, accessible modal with form fields for bug details
- **File Uploads**: Users can attach screenshots or log files (up to 2 MB)
- **Auto-collected Metadata**: Page URL, browser/OS info, viewport size
- **Discord Integration**: Reports posted as rich embeds in Discord
- **Security**: Rate limiting, bot detection (honeypot + timing check), CORS protection
- **Fallback**: If submission fails, users get a mailto: link

## Setup Instructions

### 1. Discord Webhook Setup

1. Go to your Discord server
2. Navigate to **Server Settings → Integrations → Webhooks**
3. Click **Create Webhook** or **New Webhook**
4. Choose the channel for bug reports (e.g., `#bug-reports`)
5. Copy the **Webhook URL**

### 2. Environment Configuration

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Discord webhook URL:
   ```
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
   ```

3. **For Vercel deployment**, add the environment variable:
   - Go to your Vercel project
   - Navigate to **Settings → Environment Variables**
   - Add `DISCORD_WEBHOOK_URL` with your webhook URL
   - Set for: Production, Preview, Development

### 3. Test the System

1. Start the development server:
   ```bash
   npm start
   ```

2. Navigate to the docs page
3. Click "Report a bug" (in TOC sidebar or below "Export a project")
4. Fill out and submit a test report
5. Check your Discord channel for the message

## How It Works

### Frontend (`src/components/ReportBugModal.js`)
- Modal with form fields: summary, location, steps, error output, email
- File upload validation (type and size checks)
- Honeypot field and timing check for bot prevention
- Submits to `/api/report` endpoint

### Backend (`api/report.js`)
- Vercel serverless function
- Handles both JSON and multipart/form-data
- Rate limiting: 5 requests per minute per IP+UA
- Bot detection validation
- Posts to Discord webhook as rich embed
- Returns ticket ID on success

### Button Placements
1. **TOC Sidebar** (desktop only): Text link below "On this page" section
2. **Export Page**: Button below the "Notes" section

## Discord Message Format

Reports appear in Discord as rich embeds with:
- **Title**: 🐞 Bug: [Summary]
- **Fields**:
  - Happened in (Pawgrammer app or Website)
  - Email (if provided)
  - Steps to reproduce
  - Pasted error output
  - Page URL
  - Environment (browser/OS, viewport)
- **Footer**: Ticket ID and timestamp
- **Attachment**: Screenshot or log file (if uploaded)

## Security Features

1. **Rate Limiting**: 5 requests per minute per IP+User Agent
2. **Bot Detection**:
   - Hidden honeypot field (must be empty)
   - Timing check (must take >2s to submit)
3. **File Validation**:
   - Type whitelist: `.png`, `.jpg`, `.jpeg`, `.txt`, `.log`, `.json`
   - Max size: 2 MB
4. **CORS**: Only allows requests from approved origins
5. **Webhook Protection**: URL stored server-side only

## Troubleshooting

### "Report service not configured" error
- Make sure `DISCORD_WEBHOOK_URL` is set in environment variables
- For local development, check `.env.local`
- For Vercel, check project settings

### Rate limit errors
- Wait 1 minute before trying again
- Rate limit resets every 60 seconds

### File upload fails
- Check file type (must be image, txt, log, or json)
- Check file size (max 2 MB)

### Discord webhook returns 429
- API automatically retries after delay
- If persistent, check Discord webhook rate limits

## Customization

### Change rate limits
Edit `api/report.js`:
```javascript
const RATE_LIMIT = 5; // requests
const WINDOW_MS = 60 * 1000; // time window
```

### Change file upload limits
Edit `src/components/ReportBugModal.js`:
```javascript
const MAX_FILE_SIZE = 2 * 1024 * 1024; // bytes
const ALLOWED_TYPES = ['.png', '.jpg', '.jpeg', '.txt', '.log', '.json'];
```

### Update allowed origins
Edit `api/report.js`:
```javascript
const allowedOrigins = [
  'https://ncc-nine.vercel.app',
  'http://localhost:3000',
  // Add more origins
];
```

## Future Enhancements

- Add "Report this" button inside Pawgrammer app (deep-link to docs)
- Store reports in database (Supabase/Firestore) for searchability
- Add ticket status tracking
- Email notifications for follow-ups
- Analytics dashboard for bug trends