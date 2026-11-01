# Francisca Boateng — Premium Website

## What changed
- Rebuilt visual system around burgundy, banana-gold and pure white.
- New responsive desktop/tablet/mobile navigation.
- Homepage rewritten around Francisca's current positioning: CEO, InnoSlamm; governance and operations leader; Director of Operations, Slamm Technologies US & Ghana; keynote speaker; executive coach; CISA candidate; ISC2 Inclusion Impact Award winner.
- Odo's Closet is a separate ecommerce experience with persistent bag and dedicated checkout.
- Stripe and PayPal are only attached to Odo's Closet.
- Added Stripe session verification and PayPal capture endpoints.
- Added optional Instagram API feed for @odoskloset. When configured, live Instagram media replaces the local fallback imagery on the shop page.
- Restored the original professional booking page from the source project instead of replacing its booking logic with store checkout.

## Required environment variables
Copy `.env.example` and add real values in the deployment environment.

## Important store note
The included catalogue prices are starter values inherited from the first build. Replace `api/catalog.js` and matching display prices in `shop.html`/`js/premium.js` with the approved Odo's Closet inventory before accepting live orders.

## Instagram media
Direct public scraping of Instagram is not used. Configure the official Instagram API token and user ID in the environment. The page falls back to the Odo media already in this project if the feed is unavailable.

## Booking
`booking.html` keeps the original service-booking logic from the supplied source project. Odo's Closet checkout does not redirect to that booking flow.


## Home deep-fix (v3)
- Uses the supplied ISC2 award portrait as the homepage hero.
- Removes the long homepage role line and CISA credential block.
- Adds a restrained typewriter treatment to the hero statement.
- Tightens the three capability cards to remove dead white space.
- Keeps “Executive presence.” as the section heading.
- Rebuilds recognition cards with responsive image-ready media slots.
- Moves “Current conversations” off the homepage into Journal.
- Adds subtle, accessible section reveal transitions across pages.


## Odo's Kloset catalogue update
The shop now uses 19 distinct looks selected from the supplied Odo's Kloset image archive. Repeated photos of the same outfit were not treated as separate products. Product images are optimized to WebP for faster mobile loading.

Current retail pricing is set in USD, from $148 to $235, with the same values mirrored in:
- `js/premium.js`
- `api/catalog.js`

Update both files together if final retail prices change before launch.


V5 updates:
- award cards now use uploaded portraits
- speaking, impact, journal, media, shop and booking content simplified
- booking page rebuilt for responsiveness and aligned design language
- reviews submitted on booking page append to the sliding testimonials locally in the browser
- Odo’s Kloset hero now uses a slide carousel

V6 final responsive fixes
- Reduced oversized page-hero and section-heading typography across desktop, tablet and mobile.
- Corrected Odo's Kloset hero alignment so content no longer drops to the bottom of the carousel row.
- Improved award portrait framing and card responsiveness.
- Improved speaking/editorial image framing across breakpoints.
- Added intermediate laptop navigation fitting rules.
- Preserved V5 content, shop catalogue, cart, Stripe, PayPal and booking routes.
- Validated local HTML/CSS/JS/media references: no missing local asset paths detected.
