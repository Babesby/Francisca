# Francisca Boateng — Premium Website Refresh

## What changed
- Rebuilt the visual system around burgundy, banana-gold and pure white.
- Replaced inconsistent desktop/mobile navs with one responsive system.
- Rewrote key public-facing copy to be direct, human and businesslike.
- Added current recognition: 2026 WomenTech Global Awards nomination, 2026 SIA Women in Security Forum Power 100, and 2024 ISC2 Inclusion Impact Award.
- Added a dedicated Odo's Closet storefront with bag/cart, localStorage persistence, Stripe Checkout endpoint and PayPal order endpoint.
- Built Odo's Closet product imagery from the Odo clothing media already supplied in the project, avoiding generic stock fashion imagery.
- Consolidated footer/social links and clarified the relationship between Francisca's personal brand, Odo's Closet, SLAMM LLC and SLAMM Foundation.

## Ecommerce setup
1. Copy `.env.example` to your deployment environment variables.
2. Add `STRIPE_SECRET_KEY`, `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `SITE_URL` and the final store currency.
3. Replace starter display prices in `js/premium.js` and matching server-side amounts in `api/catalog.js` with Odo's final prices before live payments.
4. The API folder is Vercel-compatible. Install dependencies (`npm install`) during deployment.
5. PayPal defaults to the live API. For sandbox testing set `PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com`.

## Important production note
The current custom-order form uses `mailto:` because the uploaded project did not include a mail/CRM backend. It can later be connected to Resend, Formspree, HubSpot, etc.
