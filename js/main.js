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
});

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
