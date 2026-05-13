# Responsive Font Scale Implementation

## Strategy

- Use `1920px` as the typography baseline.
- Keep desktop and mobile typography separated:
  - `style.css` handles desktop/tablet typography through fluid tokens.
  - `mobile.css` keeps the exact mobile typography values for `768px` and below.
- Split scaling into two groups so body text does not become too small while large headings can shrink more aggressively.

## Scale Functions

Defined in [tokens.css](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/css/tokens.css):

```css
--font-scale-body: clamp(0.875, calc(0.875 + 0.125 * ((100vw - 768px) / 1152)), 1);
--font-scale-display: clamp(0.72, calc(0.72 + 0.28 * ((100vw - 768px) / 1152)), 1);
```

## Breakpoints

- `>= 1920px`
  - `body` and `display` scale both equal `1`
  - Typography matches design base values
- `1280px - 1919px`
  - Fluid shrink on desktop without sudden jumps
- `769px - 1279px`
  - Continue shrinking to avoid oversized typography on compact desktop/tablet
- `<= 768px`
  - Switch to the dedicated mobile typography rules in [mobile.css](file:///c:/Users/gavin.guo/Desktop/ULVAC%20project/css/mobile.css)

## Token Mapping

- Body text tokens:
  - `--font-size-13-fluid`
  - `--font-size-15-fluid`
  - `--font-size-16-fluid`
  - `--font-size-18-fluid`
  - `--font-size-20-fluid`
  - `--font-size-22-fluid`
- Display text tokens:
  - `--font-size-36-fluid`
  - `--font-size-54-fluid`
  - `--font-size-64-fluid`
  - `--font-size-96-fluid`

## Applied Areas

- Header / nav
- Hero
- Business
- Company Profile
- Featured News
- Value Report
- Footer
