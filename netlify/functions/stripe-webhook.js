// ─────────────────────────────────────────────────────────────────────────────
// EASTER PARADE MATZO BALL — Stripe Webhook → Google Sheets Order Recorder
//
// This function is called by Stripe automatically after every successful payment.
// It writes one row per order to your Google Sheet.
//
// TO SET UP:
//
//   STEP 1 — Stripe Webhook
//     In Stripe Dashboard → Developers → Webhooks → Add endpoint
//     URL: https://YOUR-NETLIFY-SITE.netlify.app/.netlify/functions/stripe-webhook
//     Event to listen for: checkout.session.completed
//     Copy the "Signing secret" — this becomes STRIPE_WEBHOOK_SECRET
//
//   STEP 2 — Google Sheets
//     a. Create a new Google Sheet
//     b. On row 1 add these headers in columns A–L:
//        Timestamp | Name | Email | Phone | Items | Delivery |
//        Address | City | ZIP | Total | Payment Status | Stripe Session ID
//     c. Note the Sheet ID from the URL:
//        https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
//        Set this as GOOGLE_SHEET_ID
//
//   STEP 3 — Google Service Account
//     a. Go to console.cloud.google.com → New Project → Enable Google Sheets API
//     b. IAM & Admin → Service Accounts → Create Service Account
//     c. Keys tab → Add Key → JSON — download the file
//     d. Copy the entire JSON content and set it as GOOGLE_SERVICE_ACCOUNT_JSON
//        (paste the whole JSON blob as one line in the env variable)
//     e. Share your Google Sheet with the service account email
//        (looks like: name@project.iam.gserviceaccount.com) — give Editor access
//
//   ENVIRONMENT VARIABLES NEEDED:
//     STRIPE_SECRET_KEY           — from Stripe Dashboard
//     STRIPE_WEBHOOK_SECRET       — from the webhook endpoint you create above
//     GOOGLE_SHEET_ID             — the ID portion of your Sheet URL
//     GOOGLE_SERVICE_ACCOUNT_JSON — the full JSON content of your service account key
//
//   LOCAL TESTING:
//     Use the Stripe CLI to forward webhooks to your local netlify dev server:
//     stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook
//     The CLI will give you a temporary webhook secret — use that as STRIPE_WEBHOOK_SECRET
//
// ─────────────────────────────────────────────────────────────────────────────

const stripe       = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { google }   = require('googleapis');

const SHEET_ID     = process.env.GOOGLE_SHEET_ID;
const SHEET_RANGE  = 'Orders!A:L';  // Must match the sheet tab name "Orders"

exports.handler = async (event) => {
  // Stripe sends the raw body — Netlify provides it as a string
  const sig = event.headers['stripe-signature'];

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // Only act on completed payments
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    try {
      await recordOrderToSheets(session);
      console.log('Order recorded:', session.id);
    } catch (err) {
      console.error('Google Sheets error:', err.message);
      // Return 200 anyway so Stripe doesn't keep retrying — log the error instead
      return { statusCode: 200, body: 'Payment recorded but sheet write failed — check logs' };
    }
  }

  return { statusCode: 200, body: 'OK' };
};

async function recordOrderToSheets(session) {
  // Parse service account credentials — handles common formatting issues
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON env var is not set');

  // Strip surrounding quotes, normalize escaped newlines in the private key
  const cleaned = raw
    .trim()
    .replace(/^["']|["']$/g, '')   // remove surrounding quotes if present
    .replace(/\\n/g, '\n');         // convert literal \n to real newlines in private_key

  let credentials;
  try {
    credentials = JSON.parse(cleaned);
  } catch (err) {
    // Log the first 80 chars to diagnose format issues without exposing the full key
    console.error('JSON parse failed. Raw value starts with:', raw.slice(0, 80));
    console.error('Parse error:', err.message);
    throw new Error(`Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON: ${err.message}`);
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const meta   = session.metadata || {};

  // Parse cart items and format for the sheet
  let itemsDisplay = '';
  try {
    const items = JSON.parse(meta.items || '[]');
    itemsDisplay = items.map(i => `${i.qty}× ${i.color} / ${i.size}`).join(', ');
  } catch {
    itemsDisplay = meta.items || '';
  }

  const totalDollars = session.amount_total
    ? `$${(session.amount_total / 100).toFixed(2)}`
    : '';

  const row = [
    new Date().toLocaleString('en-US', { timeZone: 'America/Phoenix' }),
    meta.customer_name    || '',
    session.customer_email || '',
    meta.phone            || '',
    itemsDisplay,
    meta.delivery === 'shipping' ? 'Ship' : 'Pickup',
    meta.ship_address     || '',
    meta.ship_city        || '',
    meta.ship_zip         || '',
    totalDollars,
    session.payment_status || '',
    session.id,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: SHEET_RANGE,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}
