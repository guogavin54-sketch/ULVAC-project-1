// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  initMobileMode();

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add class to trigger animation
        entry.target.classList.add('is-visible');
        // Unobserve after animating once to keep it static
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements with the animate-on-scroll class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));

  // Check for prefers-reduced-motion to disable observer if necessary
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery.matches) {
    animatedElements.forEach(el => {
      el.classList.add('is-visible');
      observer.unobserve(el);
    });
  }

  // Header sticky effect (optional, based on design it might just sit on top of the hero)
  const header = document.querySelector('.global-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = 'var(--shadow-sm)';
      header.style.transition = 'box-shadow 0.3s ease';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  initMobileNav();
  initBusinessAccordion();
  initBasesMapSwitcher();
});

const BASES_REGION_DATA = {
  japan: {
    title: 'Japan',
    image: 'assets/images/Images_map.png',
    alt: 'Japan region overview',
    stats: [
      { label: 'Sales & Service', value: '35' },
      { label: 'R&D', value: '4' },
      { label: 'Manufacturing', value: '11' }
    ]
  },
  asia: {
    title: 'Asia',
    image: 'assets/images/Images_map.png',
    alt: 'Asia region overview',
    stats: [
      { label: 'Sales & Service', value: '18' },
      { label: 'R&D', value: '3' },
      { label: 'Manufacturing', value: '6' }
    ]
  },
  europe: {
    title: 'Europe',
    image: 'assets/images/Images_map.png',
    alt: 'Europe region overview',
    stats: [
      { label: 'Sales & Service', value: '12' },
      { label: 'R&D', value: '2' },
      { label: 'Manufacturing', value: '3' }
    ]
  },
  'north-america': {
    title: 'North America',
    image: 'assets/images/Images_map.png',
    alt: 'North America region overview',
    stats: [
      { label: 'Sales & Service', value: '14' },
      { label: 'R&D', value: '2' },
      { label: 'Manufacturing', value: '2' }
    ]
  },
  'south-east-asia': {
    title: 'South East Asia',
    image: 'assets/images/Images_map.png',
    alt: 'South East Asia region overview',
    stats: [
      { label: 'Sales & Service', value: '10' },
      { label: 'R&D', value: '1' },
      { label: 'Manufacturing', value: '5' }
    ]
  }
};

function initMobileMode() {
  const body = document.body;
  const mobileQuery = window.matchMedia('(max-width: 768px)');
  const applyMode = (event) => {
    const matches = typeof event.matches === 'boolean' ? event.matches : mobileQuery.matches;
    body.classList.toggle('is-mobile', matches);
  };

  applyMode(mobileQuery);

  if (typeof mobileQuery.addEventListener === 'function') {
    mobileQuery.addEventListener('change', applyMode);
  } else if (typeof mobileQuery.addListener === 'function') {
    mobileQuery.addListener(applyMode);
  }
}

function initMobileNav() {
  const body = document.body;
  const toggle = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const sideNav = document.querySelector('.mobile-side-nav');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const navLinks = document.querySelectorAll('.mobile-nav-list a');

  if (!toggle || !overlay || !sideNav || !closeBtn) return;

  const openMenu = () => {
    body.classList.add('mobile-nav-open');
    toggle.classList.add('is-active');
    toggle.setAttribute('aria-expanded', 'true');
    overlay.classList.add('is-open');
    sideNav.classList.add('is-open');
    sideNav.setAttribute('aria-hidden', 'false');
  };

  const closeMenu = () => {
    body.classList.remove('mobile-nav-open');
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('is-open');
    sideNav.classList.remove('is-open');
    sideNav.setAttribute('aria-hidden', 'true');
  };

  toggle.addEventListener('click', () => {
    if (sideNav.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sideNav.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

function initBusinessAccordion() {
  const triggers = document.querySelectorAll('.business-accordion-trigger');
  if (!triggers.length) return;

  const setItemState = (item, panel, trigger, isOpen) => {
    item.classList.toggle('is-open', isOpen);
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    panel.style.maxHeight = isOpen ? `${panel.scrollHeight}px` : '0px';
  };

  triggers.forEach(trigger => {
    const item = trigger.closest('.business-accordion-item');
    const panelId = trigger.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;

    if (!item || !panel) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    setItemState(item, panel, trigger, isMobile);

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      setItemState(item, panel, trigger, !isOpen);
    });
  });

  window.addEventListener('resize', () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    document.querySelectorAll('.business-accordion-item').forEach(item => {
      const trigger = item.querySelector('.business-accordion-trigger');
      const panelId = trigger ? trigger.getAttribute('aria-controls') : null;
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!trigger || !panel) return;

      if (!isMobile) {
        setItemState(item, panel, trigger, false);
        return;
      }

      if (item.classList.contains('is-open')) {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });
}

function initBasesMapSwitcher() {
  const section = document.querySelector('.bases-section');
  const stage = section ? section.querySelector('.bases-map-stage') : null;
  const visual = section ? section.querySelector('.bases-map-visual') : null;
  const card = document.getElementById('bases-region-card');
  const title = card ? card.querySelector('.bases-region-title') : null;
  const image = card ? card.querySelector('.bases-region-card-image') : null;
  const statsList = card ? card.querySelector('.bases-region-stats') : null;
  const hotspots = Array.from(document.querySelectorAll('.bases-hotspot'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!section || !stage || !visual || !card || !title || !image || !statsList || !hotspots.length) return;

  let activeRegion = card.dataset.activeRegion || hotspots[0].dataset.region;
  let switchTimer = null;
  let resizeFrame = null;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const positionHotspots = () => {
    const visualRect = visual.getBoundingClientRect();
    if (!visualRect.width || !visualRect.height) return;

    hotspots.forEach((hotspot) => {
      const x = Number(hotspot.dataset.x || 0);
      const y = Number(hotspot.dataset.y || 0);

      hotspot.style.left = `${x * visualRect.width}px`;
      hotspot.style.top = `${y * visualRect.height}px`;
    });
  };

  const positionCard = (regionId = activeRegion) => {
    const activeHotspot = hotspots.find((hotspot) => hotspot.dataset.region === regionId);
    if (!activeHotspot) return;

    const stageRect = stage.getBoundingClientRect();
    const hotspotRect = activeHotspot.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const horizontalPadding = isMobile ? 8 : 16;
    const verticalPadding = isMobile ? 8 : 16;
    const offset = isMobile ? 12 : 18;
    const hotspotCenterX = hotspotRect.left + (hotspotRect.width / 2);
    const hotspotBottomY = hotspotRect.bottom;
    const hotspotTopY = hotspotRect.top;
    const maxLeft = Math.max(horizontalPadding, stageRect.width - cardRect.width - horizontalPadding);
    const maxTop = Math.max(verticalPadding, stageRect.height - cardRect.height - verticalPadding);

    let left = hotspotCenterX - stageRect.left - (cardRect.width / 2);
    let top = hotspotBottomY - stageRect.top + offset;
    let placement = 'bottom';

    if (top > maxTop) {
      top = hotspotTopY - stageRect.top - cardRect.height - offset;
      placement = 'top';
    }

    left = clamp(left, horizontalPadding, maxLeft);
    top = clamp(top, verticalPadding, maxTop);

    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
    card.dataset.cardPlacement = placement;
  };

  const syncLayout = () => {
    positionHotspots();
    positionCard(activeRegion);
  };

  const syncLayoutSoon = () => {
    if (resizeFrame) {
      window.cancelAnimationFrame(resizeFrame);
    }

    resizeFrame = window.requestAnimationFrame(syncLayout);
  };

  const renderRegion = (regionId) => {
    const region = BASES_REGION_DATA[regionId];
    if (!region) return;

    title.textContent = region.title;
    image.src = region.image;
    image.alt = region.alt;
    statsList.innerHTML = region.stats
      .map((item) => `<li><span>${item.label}:</span> <strong>${item.value}</strong></li>`)
      .join('');
    card.dataset.activeRegion = regionId;
    syncLayoutSoon();
  };

  const setActiveHotspot = (regionId) => {
    hotspots.forEach((hotspot) => {
      const isActive = hotspot.dataset.region === regionId;
      hotspot.classList.toggle('is-active', isActive);
      hotspot.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      hotspot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  const activateRegion = (regionId) => {
    if (!BASES_REGION_DATA[regionId]) return;

    if (regionId === activeRegion) {
      positionCard(regionId);
      return;
    }

    activeRegion = regionId;
    setActiveHotspot(regionId);

    if (switchTimer) {
      window.clearTimeout(switchTimer);
    }

    if (prefersReducedMotion) {
      renderRegion(regionId);
      return;
    }

    card.classList.add('is-switching');
    switchTimer = window.setTimeout(() => {
      renderRegion(regionId);
      card.classList.remove('is-switching');
    }, 170);
  };

  const moveFocus = (currentIndex, direction) => {
    const nextIndex = (currentIndex + direction + hotspots.length) % hotspots.length;
    hotspots[nextIndex].focus();
    activateRegion(hotspots[nextIndex].dataset.region);
  };

  hotspots.forEach((hotspot, index) => {
    hotspot.addEventListener('click', () => {
      activateRegion(hotspot.dataset.region);
    });

    hotspot.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        moveFocus(index, 1);
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        moveFocus(index, -1);
      }

      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        activateRegion(hotspot.dataset.region);
      }
    });
  });

  renderRegion(activeRegion);
  setActiveHotspot(activeRegion);

  if (image.complete) {
    syncLayoutSoon();
  } else {
    image.addEventListener('load', syncLayoutSoon, { once: true });
  }

  window.addEventListener('resize', syncLayoutSoon);

  if (typeof ResizeObserver === 'function') {
    const resizeObserver = new ResizeObserver(syncLayoutSoon);
    resizeObserver.observe(visual);
    resizeObserver.observe(stage);
  }
}
