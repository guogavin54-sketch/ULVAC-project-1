# Responsive Font Scale Report

## Breakpoint Rules
- `>= 1920px`: keep 1920 design font size as the exact base value.
- `1280px - 1919px`: desktop fluid scale using root typography tokens.
- `769px - 1279px`: continue shrinking with the same token system to prevent oversized type on compact desktop/tablet.
- `<= 768px`: switch to mobile typography rules in `mobile.css`.

## Viewport Verification

### 1920x1080
- Body class: `(empty)`
| Item | Selector | Font Size | Line Height |
| --- | --- | --- | --- |
| Header Global | `.global-header .logo-text` | 18px | 27px |
| Hero H1 | `.hero-content h1` | 64px | 83.0016px |
| Hero Description | `.hero-description` | 18px | 27px |
| Hero Button | `.btn-hero-white span` | 16px | 24px |
| Business Title | `.business-header h2` | 54px | 70.0002px |
| Business Card Title | `.business-card h3` | 22px | 29.0004px |
| Profile Title | `.profile-container h2` | 54px | 70.0002px |
| Profile Value | `.stat-value` | 36px | 39.9996px |
| News Title | `.news-container h2` | 54px | 70.0002px |
| News Card Title | `.news-card.large h3` | 18px | 27px |
| Value Report Title | `.report-text h2` | 54px | 70.0002px |
| Footer Link | `.footer-nav-group a` | 16px | 22px |

### 1440x900
- Body class: `(empty)`
| Item | Selector | Font Size | Line Height |
| --- | --- | --- | --- |
| Header Global | `.global-header .logo-text` | 17.0625px | 25.5938px |
| Hero H1 | `.hero-content h1` | 56.5333px | 73.3181px |
| Hero Description | `.hero-description` | 17.0625px | 25.5938px |
| Hero Button | `.btn-hero-white span` | 15.1667px | 22.75px |
| Business Title | `.business-header h2` | 47.7px | 61.8335px |
| Business Card Title | `.business-card h3` | 20.8542px | 27.49px |
| Profile Title | `.profile-container h2` | 47.7px | 61.8335px |
| Profile Value | `.stat-value` | 31.8px | 35.333px |
| News Title | `.news-container h2` | 47.7px | 61.8335px |
| News Card Title | `.news-card.large h3` | 17.0625px | 25.5938px |
| Value Report Title | `.report-text h2` | 47.7px | 61.8335px |
| Footer Link | `.footer-nav-group a` | 15.1667px | 20.8542px |

### 1280x800
- Body class: `(empty)`
| Item | Selector | Font Size | Line Height |
| --- | --- | --- | --- |
| Header Global | `.global-header .logo-text` | 16.75px | 25.125px |
| Hero H1 | `.hero-content h1` | 54.0444px | 70.0902px |
| Hero Description | `.hero-description` | 16.75px | 25.125px |
| Hero Button | `.btn-hero-white span` | 14.8889px | 22.3333px |
| Business Title | `.business-header h2` | 45.6px | 59.1113px |
| Business Card Title | `.business-card h3` | 20.4722px | 26.9865px |
| Profile Title | `.profile-container h2` | 45.6px | 59.1113px |
| Profile Value | `.stat-value` | 30.4px | 33.7774px |
| News Title | `.news-container h2` | 45.6px | 59.1113px |
| News Card Title | `.news-card.large h3` | 16.75px | 25.125px |
| Value Report Title | `.report-text h2` | 45.6px | 59.1113px |
| Footer Link | `.footer-nav-group a` | 14.8889px | 20.4722px |

### 1024x768
- Body class: `(empty)`
| Item | Selector | Font Size | Line Height |
| --- | --- | --- | --- |
| Header Global | `.global-header .logo-text` | 16.25px | 24.375px |
| Hero H1 | `.hero-content h1` | 50.0622px | 64.9257px |
| Hero Description | `.hero-description` | 16.25px | 24.375px |
| Hero Button | `.btn-hero-white span` | 14.4444px | 21.6667px |
| Business Title | `.business-header h2` | 42.24px | 54.7557px |
| Business Card Title | `.business-card h3` | 19.8611px | 26.1809px |
| Profile Title | `.profile-container h2` | 42.24px | 54.7557px |
| Profile Value | `.stat-value` | 28.16px | 31.2886px |
| News Title | `.news-container h2` | 42.24px | 54.7557px |
| News Card Title | `.news-card.large h3` | 16.25px | 24.375px |
| Value Report Title | `.report-text h2` | 42.24px | 54.7557px |
| Footer Link | `.footer-nav-group a` | 14.4444px | 19.8611px |

### 768x1024
- Body class: `is-mobile`
| Item | Selector | Font Size | Line Height |
| --- | --- | --- | --- |
| Header Global | `.global-header .logo-text` | 14px | 22px |
| Hero H1 | `.hero-content h1` | 34px | 44px |
| Hero Description | `.hero-description` | 16px | 24px |
| Hero Button | `.btn-hero-white span` | 15px | 23px |
| Business Title | `.business-mobile-title` | 28px | 36px |
| Business Card Title | `.business-accordion-label` | 18px | 27px |
| Profile Title | `.profile-container h2` | 28px | 36px |
| Profile Value | `.stat-value` | 28px | 28px |
| News Title | `.news-container h2` | 28px | 36px |
| News Card Title | `.news-card.large h3` | 16px | 24px |
| Value Report Title | `.report-text h2` | 32px | 42px |
| Footer Link | `.footer-nav-group a` | 16px | 22px |
