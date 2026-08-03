# /assets/images

Drop real photos here using these exact filenames and the hero will pick them up automatically:

- `hero-main.jpg` — the large dominant photo panel (pizza/burger plated shot)
- `hero-secondary.jpg` — the smaller offset photo peeking behind it (restaurant atmosphere)

Recommended: real, natural, warm food/restaurant photography (not glossy stock) — `hero-main.jpg` at roughly 1400×1600px or larger (portrait), `hero-secondary.jpg` at roughly 900×600px. Compress to under 300KB each (JPEG quality ~75-80) for fast mobile loading.

Part 2 (Signature Menu, Food Story, Featured Offer) adds these placeholders:

- `menu-placeholder.jpg` — used as the round thumbnail on every menu card (roughly 200×200px, square crop works best)
- `story-fresh.jpg`, `story-generous.jpg`, `story-moments.jpg` — the three Food Story pillar photos (roughly 900×700px, landscape)
- `offer-main.jpg` — the large photo in the Featured Offer / Buy 1 Get 1 section (roughly 1200×1400px, portrait)

Until real photos are added, these areas show the same warm gradient placeholder used elsewhere on the site, so the layout looks intentional either way.

More images (locations photos, gallery shots) will be added here as Parts 3–4 are built.

## Part 5 — full image pass

Every image path referenced by the site now has a matching file in this folder, so there
are no broken images anywhere on the site. Each file is currently a styled placeholder
(a warm gradient with the espresso/gold brand palette and a text label) — swap any file
for a real photo using the exact same filename and it updates automatically everywhere,
no code changes needed.

Menu cards now use category-relevant images instead of one generic thumbnail:

- `pizza-main.jpg` — all Pizza tab items
- `burger-main.jpg` — all Burgers tab items, plus burger deals
- `shawarma.jpg` — shawarma items
- `roll-paratha.jpg` — all roll paratha items
- `crispy-chicken.jpg` — Crispy Chicken group
- `fries.jpg` — Fries group
- `hot-wings.jpg` — 5 Hot Wings
- `nuggets.jpg` — 5 Nuggets, 10 Chicken Hot Shots
- `menu-placeholder.jpg` — fallback only, not currently used by any item

Gallery images already cover the "restaurant exterior / interior / outdoor dining / food
prep / delivery / family dining" shot list under their existing names:
`gallery-exterior.jpg`, `gallery-dining.jpg`, `gallery-outdoor-seating.jpg`,
`gallery-pizza-prep.jpg`, `gallery-takeaway.jpg`, `gallery-family-meal.jpg`,
`gallery-burgers.jpg`, `gallery-crispy-chicken.jpg`, `gallery-night.jpg`.

For real photography, replace files one at a time — no need to touch `index.html` or
`js/script.js`.
