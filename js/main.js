// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  initMobileMode();
  initHeaderScrollState();
  initMobileNav();
  initBusinessAccordion();
  initBasesMapSwitcher();
  initLangSelector();
  initMobileLangSelector();
  
  // Wait for video to load before initializing banner animations
  initAnimationsAfterVideoLoad();
});

function initAnimationsAfterVideoLoad() {
  const heroVideo = document.querySelector('.hero-video');
  
  // If no video found, initialize animations immediately
  if (!heroVideo) {
    initScrollAnimations();
    return;
  }
  
  // Check if video is already loaded
  if (heroVideo.readyState >= 3) { // HAVE_FUTURE_DATA or higher
    initScrollAnimations();
    return;
  }
  
  // Wait for video to be ready to play
  const loadTimeout = setTimeout(() => {
    // Fallback: initialize animations if video takes too long to load
    initScrollAnimations();
  }, 5000); // 5 second timeout
  
  const handleVideoReady = () => {
    clearTimeout(loadTimeout);
    initScrollAnimations();
    // Remove listeners after initialization
    heroVideo.removeEventListener('loadeddata', handleVideoReady);
    heroVideo.removeEventListener('canplaythrough', handleVideoReady);
  };
  
  // Listen for video load events
  heroVideo.addEventListener('loadeddata', handleVideoReady);
  heroVideo.addEventListener('canplaythrough', handleVideoReady);
}

function initScrollAnimations() {
  const animatedElements = Array.from(document.querySelectorAll('.animate-on-scroll'));
  if (!animatedElements.length) return;

  const markVisible = (element) => {
    element.classList.add('is-visible');
    if (element.classList.contains('text-spotlight')) {
      element.classList.add('is-visible');
    }
    element.querySelectorAll('.text-spotlight').forEach((child) => {
      child.classList.add('is-visible');
    });
  };

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileQuery = window.matchMedia('(max-width: 768px)');
  
  if (mediaQuery.matches || typeof IntersectionObserver !== 'function') {
    animatedElements.forEach((element) => {
      markVisible(element);
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: mobileQuery.matches ? '0px 0px -5% 0px' : '0px 0px -10% 0px',
    threshold: mobileQuery.matches ? 0.1 : 0.16
  };

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      markVisible(entry.target);
      currentObserver.unobserve(entry.target);
    });
  }, observerOptions);

  animatedElements.forEach((element) => observer.observe(element));
}

function initHeaderScrollState() {
  const header = document.querySelector('.global-header');
  if (!header) return;

  let frameId = null;
  const syncHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 36);
    frameId = null;
  };

  const requestSync = () => {
    if (frameId !== null) return;
    frameId = window.requestAnimationFrame(syncHeaderState);
  };

  syncHeaderState();
  window.addEventListener('scroll', requestSync, { passive: true });
}

var BASES_DOT_DATA = {
  1: {
    title: 'Japan',
    image: 'assets/images/card-japan.png',
    stats: [
      { label: 'Sales & Service', value: '35' },
      { label: 'R&D', value: '4' },
      { label: 'Manufacturing', value: '11' }
    ]
  },
  2: {
    title: 'Korea',
    image: 'assets/images/card-korea.png',
    stats: [
      { label: 'Sales & Service', value: '8' },
      { label: 'R&D', value: '2' },
      { label: 'Manufacturing', value: '3' }
    ]
  },
  3: {
    title: 'China',
    image: 'assets/images/card-china.png',
    stats: [
      { label: 'Sales & Service', value: '22' },
      { label: 'R&D', value: '5' },
      { label: 'Manufacturing', value: '8' }
    ]
  },
  4: {
    title: 'Southeast Asia',
    image: 'assets/images/card-southeast-asia.png',
    stats: [
      { label: 'Sales & Service', value: '10' },
      { label: 'R&D', value: '1' },
      { label: 'Manufacturing', value: '5' }
    ]
  },
  5: {
    title: 'Europe',
    image: 'assets/images/card-europe.png',
    stats: [
      { label: 'Sales & Service', value: '12' },
      { label: 'R&D', value: '2' },
      { label: 'Manufacturing', value: '3' }
    ]
  },
  6: {
    title: 'North America',
    image: 'assets/images/card-japan.png',
    stats: [
      { label: 'Sales & Service', value: '15' },
      { label: 'R&D', value: '3' },
      { label: 'Manufacturing', value: '4' }
    ]
  },
  7: {
    title: 'Oceania',
    image: 'assets/images/card-korea.png',
    stats: [
      { label: 'Sales & Service', value: '6' },
      { label: 'R&D', value: '1' },
      { label: 'Manufacturing', value: '2' }
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
    setItemState(item, panel, trigger, false);

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
  var section = document.querySelector('.bases-section');
  var card = document.getElementById('bases-info-card');
  var cardMobile = document.getElementById('bases-info-card-mobile');
  var title = card ? card.querySelector('.bases-info-card__title') : null;
  var image = card ? card.querySelector('.bases-info-card__image') : null;
  var statsList = card ? card.querySelector('.bases-info-card__stats') : null;
  var titleMobile = cardMobile ? cardMobile.querySelector('.bases-info-card__title') : null;
  var imageMobile = cardMobile ? cardMobile.querySelector('.bases-info-card__image') : null;
  var statsListMobile = cardMobile ? cardMobile.querySelector('.bases-info-card__stats') : null;
  var dots = Array.from(document.querySelectorAll('.bases-dot'));
  var prevBtns = Array.from(document.querySelectorAll('.bases-nav-btn--prev'));
  var nextBtns = Array.from(document.querySelectorAll('.bases-nav-btn--next'));

  if (!section || !card || !title || !image || !statsList || !dots.length) return;

  var activeDot = 3;
  var totalDots = 7; // 总是7个点，不管桌面端还是移动端

  function renderDot(dotId, animate) {
    var data = BASES_DOT_DATA[dotId];
    if (!data) return;

    function updateCard(cardEl, titleEl, imageEl, statsEl) {
      if (!cardEl || !titleEl || !imageEl || !statsEl) return;

      if (animate) {
        cardEl.style.opacity = '0';
        cardEl.style.transform = 'translateY(-10px)';
        
        setTimeout(function() {
          titleEl.textContent = data.title;
          imageEl.src = data.image;
          statsEl.innerHTML = data.stats
            .map(function (item) {
              return '<li><span>' + item.label + ':</span> <strong>' + item.value + '</strong></li>';
            })
            .join('');
          
          cardEl.style.opacity = '1';
          cardEl.style.transform = 'translateY(0)';
        }, 200);
      } else {
        titleEl.textContent = data.title;
        imageEl.src = data.image;
        statsEl.innerHTML = data.stats
          .map(function (item) {
            return '<li><span>' + item.label + ':</span> <strong>' + item.value + '</strong></li>';
          })
          .join('');
      }
    }

    updateCard(card, title, image, statsList);
    updateCard(cardMobile, titleMobile, imageMobile, statsListMobile);
  }

  function setActiveDot(dotId) {
    dots.forEach(function (dot) {
      var isActive = Number(dot.dataset.dot) === dotId;
      dot.classList.toggle('is-active', isActive);
    });
  }

  function activateDot(dotId, animate) {
    // 如果已经是当前点，就不执行
    if (dotId === activeDot) return;

    activeDot = dotId;
    setActiveDot(dotId);
    renderDot(dotId, animate !== false);
  }

  function goToPrev() {
    var newDot = activeDot - 1;
    if (newDot < 1) newDot = totalDots;
    activateDot(newDot);
  }

  function goToNext() {
    var newDot = activeDot + 1;
    if (newDot > totalDots) newDot = 1;
    activateDot(newDot);
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var dotId = Number(dot.dataset.dot);
      activateDot(dotId);
    });
  });

  prevBtns.forEach(function (btn) {
    btn.addEventListener('click', goToPrev);
  });

  nextBtns.forEach(function (btn) {
    btn.addEventListener('click', goToNext);
  });

  renderDot(activeDot, false);
  setActiveDot(activeDot);
}

function initLangSelector() {
  const selector = document.querySelector('.lang-selector');
  const dropdown = document.querySelector('.lang-dropdown');
  const options = document.querySelectorAll('.lang-option');
  const currentLangEl = document.querySelector('.current-lang');
  
  if (!selector || !dropdown || !options.length || !currentLangEl) return;

  const toggleDropdown = () => {
    const isOpen = selector.classList.contains('active');
    
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const openDropdown = () => {
    selector.classList.add('active');
    selector.setAttribute('aria-expanded', 'true');
    dropdown.removeAttribute('hidden');
  };

  const closeDropdown = () => {
    selector.classList.remove('active');
    selector.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('hidden', '');
  };

  const selectLang = (langCode, langText) => {
    currentLangEl.textContent = langText;
    
    options.forEach(opt => {
      opt.classList.toggle('active-lang', opt.dataset.lang === langCode);
    });
    
    closeDropdown();
    
    selector.focus();
  };

  selector.addEventListener('click', toggleDropdown);

  selector.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    } else if (e.key === 'Escape') {
      closeDropdown();
    }
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selectLang(option.dataset.lang, option.textContent);
    });
    
    option.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectLang(option.dataset.lang, option.textContent);
      } else if (e.key === 'Escape') {
        closeDropdown();
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!selector.contains(e.target)) {
      closeDropdown();
    }
  });
}

function initMobileLangSelector() {
  const selector = document.querySelector('.mobile-lang-selector');
  const dropdown = document.querySelector('.mobile-lang-dropdown');
  const options = document.querySelectorAll('.mobile-lang-option');
  const currentLangEl = document.querySelector('.mobile-lang-text');
  
  if (!selector || !dropdown || !options.length || !currentLangEl) return;

  const toggleDropdown = () => {
    const isOpen = selector.classList.contains('active');
    
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const openDropdown = () => {
    selector.classList.add('active');
    selector.setAttribute('aria-expanded', 'true');
    dropdown.removeAttribute('hidden');
  };

  const closeDropdown = () => {
    selector.classList.remove('active');
    selector.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('hidden', '');
  };

  const selectLang = (langCode, langText) => {
    currentLangEl.textContent = langText;
    
    options.forEach(opt => {
      opt.classList.toggle('active-lang', opt.dataset.lang === langCode);
    });
    
    closeDropdown();
    
    selector.focus();
  };

  selector.addEventListener('click', toggleDropdown);

  selector.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    } else if (e.key === 'Escape') {
      closeDropdown();
    }
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selectLang(option.dataset.lang, option.textContent);
    });
    
    option.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectLang(option.dataset.lang, option.textContent);
      } else if (e.key === 'Escape') {
        closeDropdown();
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!selector.contains(e.target)) {
      closeDropdown();
    }
  });
}
