// ─────────────────────────────────────────────────────────────────────────────
// EASTER PARADE MATZO BALL — Stripe Checkout Session Creator
//
// TO USE:
//   1. Set environment variable STRIPE_SECRET_KEY in Netlify dashboard
//      (or in a local .env file for testing with `netlify dev`)
//      Test key starts with sk_test_...
//      Live key starts with sk_live_...
//
//   2. Test locally:
//      npm install        (installs stripe package)
//      netlify dev        (starts local server at localhost:8888)
//
// ─────────────────────────────────────────────────────────────────────────────

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Stripe Price IDs — keyed by "Color|Size"
const PRICE_IDS = {
  'White|S':             'price_1TGnDfEPNaqEvCxlalLJHD45',
  'White|M':             'price_1TGnDhEPNaqEvCxl1YO2nCSF',
  'White|L':             'price_1TGnDjEPNaqEvCxlqyxNw5jo',
  'White|XL':            'price_1TGnDkEPNaqEvCxlRrWkaUEU',
  'White|XXL':           'price_1TGnDmEPNaqEvCxlfQLofK2S',
  'White|XXXL':          'price_1TGnDoEPNaqEvCxllNxPOK61',
  'Spearmint|S':         'price_1TGnDpEPNaqEvCxlhYu4Qaaj',
  'Spearmint|M':         'price_1TGnDrEPNaqEvCxlCwiAxfZy',
  'Spearmint|L':         'price_1TGnDsEPNaqEvCxl2OaPrnOa',
  'Spearmint|XL':        'price_1TGnDvEPNaqEvCxlN2dVEpyH',
  'Spearmint|XXL':       'price_1TGnDxEPNaqEvCxlAsR2DjNV',
  'Spearmint|XXXL':      'price_1TGnDyEPNaqEvCxl42JzlNaj',
  'Sky Blue|S':          'price_1TGnE0EPNaqEvCxlaqZlX6fx',
  'Sky Blue|M':          'price_1TGnE1EPNaqEvCxl4OzIZibK',
  'Sky Blue|L':          'price_1TGnE3EPNaqEvCxls4QPeKqh',
  'Sky Blue|XL':         'price_1TGnE5EPNaqEvCxlRUwRkOdG',
  'Sky Blue|XXL':        'price_1TGnE6EPNaqEvCxlro1fFSfT',
  'Sky Blue|XXXL':       'price_1TGnE8EPNaqEvCxlvczrJgrL',
  'Vintage Gold|S':      'price_1TGnE9EPNaqEvCxlI91cFRBt',
  'Vintage Gold|M':      'price_1TGnEBEPNaqEvCxlRsFv7b0Y',
  'Vintage Gold|L':      'price_1TGnEDEPNaqEvCxlEnc0GUeo',
  'Vintage Gold|XL':     'price_1TGnEEEPNaqEvCxldCd4sPrB',
  'Vintage Gold|XXL':    'price_1TGnEGEPNaqEvCxl5D0trvnM',
  'Vintage Gold|XXXL':   'price_1TGnEHEPNaqEvCxlRVFYtk2V',
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { cart, delivery, contact, promoCode } = body;

  // Basic validation
  if (!cart || cart.length === 0) {
    return { statusCode: 400, body: 'Cart is empty' };
  }
  if (!contact?.email || !contact?.name) {
    return { statusCode: 400, body: 'Name and email are required' };
  }

  // Build Stripe line items using Price IDs (keyed by color + size)
  const lineItems = cart.map(item => {
    const key = `${item.color}|${item.size}`;
    const priceId = PRICE_IDS[key];
    if (!priceId) throw new Error(`No price found for: ${key}`);
    return {
      price: priceId,
      quantity: item.qty,
    };
  });

  // Sales tax — 8.6% on shirt subtotal only (not shipping)
  const TAX_RATE = 0.086;
  const shirtSubtotalCents = cart.reduce((sum, item) => sum + (item.price * 100) * item.qty, 0);
  const taxCents = Math.round(shirtSubtotalCents * TAX_RATE);
  lineItems.push({
    price_data: {
      currency: 'usd',
      product_data: { name: 'Sales Tax (8.6%)' },
      unit_amount: taxCents,
    },
    quantity: 1,
  });

  // Shipping line item — uses price_data since shipping is calculated dynamically
  if (delivery === 'shipping') {
    const totalShirts = cart.reduce((sum, item) => sum + item.qty, 0);
    const shippingCents = totalShirts > 0
      ? Math.round((10 + (totalShirts - 1) * 2.5) * 100)
      : 0;
    if (shippingCents > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping',
            description: '$10 first shirt + $2.50 each additional',
          },
          unit_amount: shippingCents,
        },
        quantity: 1,
      });
    }
  }

  // Store order details in session metadata so the webhook can record them
  const metadata = {
    customer_name: contact.name,
    phone: contact.phone || '',
    delivery: delivery,
    items: JSON.stringify(cart),  // e.g. [{"color":"White","size":"M","qty":1,"price":25}]
  };
  if (delivery === 'shipping') {
    metadata.ship_address = contact.address || '';
    metadata.ship_city    = contact.city    || '';
    metadata.ship_zip     = contact.zip     || '';
  }

  // Determine the base URL — works locally (netlify dev) and in production
  const baseUrl = process.env.URL || 'http://localhost:8888';

  const PROMO_CODE_MAP = {
    'EASTER20': 'promo_1TN3pOE9eSiPExOK2I7NmRm8',
  };

  const sessionParams = {
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    customer_email: contact.email,
    success_url: `${baseUrl}/tshirts.html?order=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${baseUrl}/tshirts.html`,
    metadata,
  };

  if (promoCode && PROMO_CODE_MAP[promoCode.toUpperCase()]) {
    sessionParams.discounts = [{ promotion_code: PROMO_CODE_MAP[promoCode.toUpperCase()] }];
  }

  let session;
  try {
    session = await stripe.checkout.sessions.create(sessionParams);
  } catch (err) {
    console.error('Stripe error:', err.message);
    return { statusCode: 500, body: `Stripe error: ${err.message}` };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: session.url }),
  };
};
