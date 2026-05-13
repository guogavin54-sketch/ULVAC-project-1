# Mobile Top Final

## Scope

- Added a dedicated mobile stylesheet in `css/mobile.css` for the `375px-768px` range.
- Kept the desktop DOM as the base and layered mobile-only structures into `index.html`.
- Implemented the mobile navigation drawer, overlay, and business accordion interactions in `js/main.js`.

## Delivered

- Mobile header aligned to the Figma export spacing with a white background, 44px menu trigger, and 105px logo.
- Mobile hero aligned to the `390 x 620` layout with centered copy, 34px title, 16px body text, and a 240px CTA button.
- Mobile business area rendered as an accordion with accurate 28px section title, 18px item titles, 15px body text, and expand/collapse behavior.
- Company Profile, Featured News, Value Report, and Footer received mobile-specific spacing and typography overrides.
- Mobile `ULVAC Main Bases` now falls back to the large `In Progress` placeholder presentation instead of the desktop card layout.

## Verification

- Generated screenshots:
  - `mobile_375x812_home.png`
  - `mobile_375x812_menu.png`
  - `mobile_375x812_accordion.png`
  - `mobile_390x844_home.png`
  - `mobile_390x844_menu.png`
  - `mobile_390x844_accordion.png`
  - `mobile_768x1024_home.png`
  - `mobile_768x1024_menu.png`
  - `mobile_768x1024_accordion.png`
- Validation script: `mobile_verify.js`
- Diagnostics checked for:
  - `css/mobile.css`
  - `mobile_verify.js`

## Notes

- The mobile business area defaults to the collapsed accordion state and expands through interaction, matching the fold/unfold requirement.
- The verification script disables motion during capture so layout review is stable and repeatable.
