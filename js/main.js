// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  initMobileMode();
  initHeaderScrollState();
  initMobileNav();
  initBusinessAccordion();
  initBasesMapSwitcher();
  initLangSelector();
  initMobileLangSelector();
  initStatCounter();
  
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
  
  // Check if video is already loaded or has sufficient data
  const isVideoReady = () => {
    // readyState values:
    // 0 = HAVE_NOTHING
    // 1 = HAVE_METADATA
    // 2 = HAVE_CURRENT_DATA
    // 3 = HAVE_FUTURE_DATA
    // 4 = HAVE_ENOUGH_DATA
    return heroVideo.readyState >= 3 || 
           (heroVideo.buffered && heroVideo.buffered.length > 0 && 
            heroVideo.buffered.end(0) > 2); // At least 2 seconds buffered
  };
  
  if (isVideoReady()) {
    initScrollAnimations();
    return;
  }
  
  // Track loading progress
  let isInitialized = false;
  const loadStartTime = Date.now();
  const maxWaitTime = 2000; // 2 seconds maximum wait - reduced for faster text appearance
  const minBufferTime = 0.5; // Reduced to 0.5 seconds
  
  const checkVideoProgress = () => {
    if (isInitialized) return;
    
    // Check buffer progress
    if (heroVideo.buffered && heroVideo.buffered.length > 0) {
      const bufferedSeconds = heroVideo.buffered.end(0);
      const duration = heroVideo.duration || 1;
      const bufferedPercent = (bufferedSeconds / duration) * 100;
      
      // Start animations if:
      // 1. Have at least minBufferTime seconds buffered, OR
      // 2. Have buffered more than 50% of the video, OR
      // 3. Been waiting more than maxWaitTime
      if (bufferedSeconds >= minBufferTime || bufferedPercent > 50) {
        initScrollAnimations();
        isInitialized = true;
        return;
      }
    }
    
    // Check timeout
    if (Date.now() - loadStartTime >= maxWaitTime) {
      initScrollAnimations();
      isInitialized = true;
      return;
    }
    
    // Continue checking
    requestAnimationFrame(checkVideoProgress);
  };
  
  const handleVideoEvent = () => {
    if (!isInitialized) {
      initScrollAnimations();
      isInitialized = true;
      cleanup();
    }
  };
  
  const cleanup = () => {
    heroVideo.removeEventListener('loadeddata', handleVideoEvent);
    heroVideo.removeEventListener('canplaythrough', handleVideoEvent);
    heroVideo.removeEventListener('progress', checkVideoProgress);
  };
  
  // Start monitoring video progress
  heroVideo.addEventListener('progress', checkVideoProgress);
  
  // Also listen for standard video events as backup
  heroVideo.addEventListener('loadeddata', handleVideoEvent);
  heroVideo.addEventListener('canplaythrough', handleVideoEvent);
  
  // Start checking immediately
  checkVideoProgress();
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
    title: 'Europe',
    image: 'assets/images/card-europe.png',
    stats: [
      { label: 'Sales & Service', value: '1' },
  
    ]
  },
  2: {
	  
	      title: 'China',
    image: 'assets/images/card-china.png',
    stats: [
      { label: 'Sales & Service', value: '15' },
      { label: 'R&D', value: '1' },
      { label: 'Manufacturing', value: '9' }

    ]
  },
  3: {
	  
	      title: 'Taiwan',
    image: 'assets/images/card-taiwan.png',
    stats: [
      { label: 'Sales & Service', value: '3' },
      { label: 'R&D', value: '1' },
      { label: 'Manufacturing', value: '3' }
    ]

  },
  4: {
    title: 'Southeast Asia',
    image: 'assets/images/card-southeast-asia.png',
    stats: [
      { label: 'Sales & Service', value: '2' },

    ]
  },
  5: {
	      title: 'Americas',
    image: 'assets/images/card-americas.png',
    stats: [
      { label: 'Sales & Service', value: '1' },
      { label: 'R&D', value: '1' },
      { label: 'Manufacturing', value: '1' }
 
    ]
  },
  6: {
	      title: 'Korea',
    image: 'assets/images/card-korea.png',
    stats: [
      { label: 'Sales & Service', value: '8' },
      { label: 'R&D', value: '1' },
      { label: 'Manufacturing', value: '2' }

    ]
  },
  7: {
   title: 'Japan',
    image: 'assets/images/card-japan.png',
    stats: [
      { label: 'Sales & Service', value: '35' },
      { label: 'R&D', value: '4' },
      { label: 'Manufacturing', value: '11' }
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
  var cardNext = document.getElementById('bases-info-card-next');
  var cardMobile = document.getElementById('bases-info-card-mobile');
  var cardMobileNext = document.getElementById('bases-info-card-mobile-next');
  var cardWrapper = card ? card.parentElement : null;
  var cardWrapperMobile = cardMobile ? cardMobile.parentElement : null;
  var title = card ? card.querySelector('.bases-info-card__title') : null;
  var image = card ? card.querySelector('.bases-info-card__image') : null;
  var statsList = card ? card.querySelector('.bases-info-card__stats') : null;
  var titleNext = cardNext ? cardNext.querySelector('.bases-info-card__title') : null;
  var imageNext = cardNext ? cardNext.querySelector('.bases-info-card__image') : null;
  var statsListNext = cardNext ? cardNext.querySelector('.bases-info-card__stats') : null;
  var titleMobile = cardMobile ? cardMobile.querySelector('.bases-info-card__title') : null;
  var imageMobile = cardMobile ? cardMobile.querySelector('.bases-info-card__image') : null;
  var statsListMobile = cardMobile ? cardMobile.querySelector('.bases-info-card__stats') : null;
  var titleMobileNext = cardMobileNext ? cardMobileNext.querySelector('.bases-info-card__title') : null;
  var imageMobileNext = cardMobileNext ? cardMobileNext.querySelector('.bases-info-card__image') : null;
  var statsListMobileNext = cardMobileNext ? cardMobileNext.querySelector('.bases-info-card__stats') : null;
  var dots = Array.from(document.querySelectorAll('.bases-dot'));
  var prevBtns = Array.from(document.querySelectorAll('.bases-nav-btn--prev'));
  var nextBtns = Array.from(document.querySelectorAll('.bases-nav-btn--next'));
  var isAnimating = false;
  var debugReport = function() {};

  if (!section || !card || !cardNext || !cardWrapper || !title || !image || !statsList || !dots.length) return;

  cardNext.style.pointerEvents = 'none';
  if (cardMobileNext) cardMobileNext.style.pointerEvents = 'none';

  var activeDotEl = dots.find(function(dot) {
    return dot.classList.contains('is-active');
  });
  var activeDot = activeDotEl ? Number(activeDotEl.dataset.dot) : 1;
  var totalDots = Array.from(new Set(dots.map(function(dot) {
    return Number(dot.dataset.dot);
  }))).length;
  var animationToken = 0;
  var transitionDurationMs = 580;
  var transitionTiming = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
  var mobileModeQuery = window.matchMedia('(max-width: 768px)');
  var viewportSyncTimer = 0;
  // #region debug-point A:init-state
  debugReport('A', 'initial-state', {
    activeDot: activeDot,
    totalDots: totalDots,
    domActiveDots: dots.filter(function(dot){ return dot.classList.contains('is-active'); }).map(function(dot){ return Number(dot.dataset.dot); }),
    desktopTitle: title ? title.textContent : null,
    mobileTitle: titleMobile ? titleMobile.textContent : null
  });
  // #endregion
  
  // Preload all card images to prevent delay during switch
  var loadedImages = {};
  function preloadImages() {
    for (var key in BASES_DOT_DATA) {
      var img = new Image();
      img.src = BASES_DOT_DATA[key].image;
      loadedImages[BASES_DOT_DATA[key].image] = img;
    }
  }
  preloadImages();

  function attachImageDebug(imageEl, label) {
    if (!imageEl || imageEl.dataset.debugBound === '1') return;
    imageEl.dataset.debugBound = '1';

    imageEl.addEventListener('load', function() {
      // #region debug-point F:image-load
      debugReport('F', 'image-load', {
        label: label,
        src: imageEl.currentSrc || imageEl.src,
        complete: imageEl.complete,
        naturalWidth: imageEl.naturalWidth,
        naturalHeight: imageEl.naturalHeight
      });
      // #endregion
    });
  }

  [
    { el: image, label: 'desktop-current' },
    { el: imageNext, label: 'desktop-next' },
    { el: imageMobile, label: 'mobile-current' },
    { el: imageMobileNext, label: 'mobile-next' }
  ].forEach(function(entry) {
    attachImageDebug(entry.el, entry.label);
  });

  function createCardPair(wrapper, currentCardEl, bufferCardEl, currentTitleEl, currentImageEl, currentStatsEl, bufferTitleEl, bufferImageEl, bufferStatsEl) {
    var stageEl = wrapper ? wrapper.closest('.bases-card-nav-container') : null;
    return {
      stageEl: stageEl || (wrapper ? wrapper.parentElement : null),
      wrapper: wrapper,
      currentCardEl: currentCardEl,
      bufferCardEl: bufferCardEl,
      currentTitleEl: currentTitleEl,
      currentImageEl: currentImageEl,
      currentStatsEl: currentStatsEl,
      bufferTitleEl: bufferTitleEl,
      bufferImageEl: bufferImageEl,
      bufferStatsEl: bufferStatsEl
    };
  }

  function setPairLayer(pair) {
    if (!pair || !pair.currentCardEl || !pair.bufferCardEl) return;
    pair.currentCardEl.style.zIndex = '2';
    pair.currentCardEl.style.pointerEvents = 'auto';
    pair.currentCardEl.style.visibility = 'visible';
    pair.bufferCardEl.style.zIndex = '1';
    pair.bufferCardEl.style.pointerEvents = 'none';
    pair.bufferCardEl.style.visibility = 'hidden';
  }

  function setPairSliding(pair, sliding) {
    if (!pair || !pair.wrapper) return;
    pair.wrapper.classList.toggle('is-sliding', !!sliding);
  }

  function measureCardHeight(cardEl) {
    if (!cardEl) return 0;
    var previousVisibility = cardEl.style.visibility;
    var previousPointerEvents = cardEl.style.pointerEvents;
    cardEl.style.visibility = 'hidden';
    cardEl.style.pointerEvents = 'none';
    var height = cardEl.getBoundingClientRect().height;
    cardEl.style.visibility = previousVisibility;
    cardEl.style.pointerEvents = previousPointerEvents;
    return height;
  }

  function getPairStageMinHeight(pair) {
    if (!pair || !pair.stageEl) return 0;
    if (!pair.stageEl.classList || !pair.stageEl.classList.contains('bases-card-nav-container')) {
      return 0;
    }
    var minHeight = window.getComputedStyle(pair.stageEl).minHeight;
    var parsedHeight = parseFloat(minHeight);
    return Number.isFinite(parsedHeight) ? parsedHeight : 0;
  }

  function getPairStageHeight(pair, contentHeight) {
    return Math.max(contentHeight || 0, getPairStageMinHeight(pair));
  }

  function shouldCenterPairInStage(pair) {
    return !!(pair &&
      pair.stageEl &&
      pair.stageEl.classList &&
      pair.stageEl.classList.contains('bases-card-nav-container') &&
      mobileModeQuery.matches);
  }

  function syncPairWrapperHeight(pair, height, animateHeight) {
    if (!pair || !pair.wrapper) return;
    pair.wrapper.style.transition = animateHeight ? ('height ' + (transitionDurationMs / 1000) + 's ' + transitionTiming) : 'none';
    pair.wrapper.style.height = Math.max(height || 0, 0) + 'px';
  }

  function centerCardInStage(pair, cardEl) {
    if (!pair || !pair.wrapper || !cardEl) return;
    if (!shouldCenterPairInStage(pair)) {
      cardEl.style.top = '0';
      return;
    }
    var stageHeight = pair.wrapper.getBoundingClientRect().height;
    var cardHeight = measureCardHeight(cardEl);
    var topOffset = Math.max((stageHeight - cardHeight) / 2, 0);
    cardEl.style.top = topOffset + 'px';
  }

  function swapCardPair(pair) {
    var currentCardEl = pair.currentCardEl;
    var currentTitleEl = pair.currentTitleEl;
    var currentImageEl = pair.currentImageEl;
    var currentStatsEl = pair.currentStatsEl;

    pair.currentCardEl = pair.bufferCardEl;
    pair.currentTitleEl = pair.bufferTitleEl;
    pair.currentImageEl = pair.bufferImageEl;
    pair.currentStatsEl = pair.bufferStatsEl;

    pair.bufferCardEl = currentCardEl;
    pair.bufferTitleEl = currentTitleEl;
    pair.bufferImageEl = currentImageEl;
    pair.bufferStatsEl = currentStatsEl;
  }

  var desktopPair = createCardPair(cardWrapper, card, cardNext, title, image, statsList, titleNext, imageNext, statsListNext);
  var mobilePair = createCardPair(cardWrapperMobile, cardMobile, cardMobileNext, titleMobile, imageMobile, statsListMobile, titleMobileNext, imageMobileNext, statsListMobileNext);
  setPairLayer(desktopPair);
  setPairLayer(mobilePair);
  syncPairWrapperHeight(desktopPair, getPairStageHeight(desktopPair, measureCardHeight(desktopPair.currentCardEl)), false);
  syncPairWrapperHeight(mobilePair, getPairStageHeight(mobilePair, measureCardHeight(mobilePair.currentCardEl)), false);
  centerCardInStage(desktopPair, desktopPair.currentCardEl);
  centerCardInStage(desktopPair, desktopPair.bufferCardEl);
  centerCardInStage(mobilePair, mobilePair.currentCardEl);
  centerCardInStage(mobilePair, mobilePair.bufferCardEl);

  function syncActiveDotForViewport(reason) {
    clearTimeout(viewportSyncTimer);
    viewportSyncTimer = setTimeout(function() {
      if (isAnimating) return;
      setPairSliding(desktopPair, false);
      setPairSliding(mobilePair, false);
      setPairLayer(desktopPair);
      setPairLayer(mobilePair);
      renderDot(activeDot, false).then(function() {
        syncPairWrapperHeight(desktopPair, getPairStageHeight(desktopPair, measureCardHeight(desktopPair.currentCardEl)), false);
        syncPairWrapperHeight(mobilePair, getPairStageHeight(mobilePair, measureCardHeight(mobilePair.currentCardEl)), false);
        centerCardInStage(desktopPair, desktopPair.currentCardEl);
        centerCardInStage(desktopPair, desktopPair.bufferCardEl);
        centerCardInStage(mobilePair, mobilePair.currentCardEl);
        centerCardInStage(mobilePair, mobilePair.bufferCardEl);
        // #region debug-point G:viewport-mode-sync
        debugReport('G', 'viewport-mode-sync', {
          reason: reason,
          activeDot: activeDot,
          isMobile: mobileModeQuery.matches
        });
        // #endregion
      });
    }, 60);
  }

  function getEntryTransform(dir, gap) {
    if (dir === 'left') {
      return 'translateX(calc(-100% - ' + gap + 'px))';
    }

    return 'translateX(calc(100% + ' + gap + 'px))';
  }

  function getExitTransform(dir, gap) {
    if (dir === 'left') {
      return 'translateX(calc(100% + ' + gap + 'px))';
    }

    return 'translateX(calc(-100% - ' + gap + 'px))';
  }

  function getAdjacentDotId(dotId, dir) {
    if (dir === 'left') {
      return (dotId - 2 + totalDots) % totalDots + 1;
    }

    return (dotId % totalDots) + 1;
  }

  function resolveDirection(current, target, direction) {
    if (direction === 'left' || direction === 'right') {
      return direction;
    }

    var forwardSteps = (target - current + totalDots) % totalDots;
    var backwardSteps = (current - target + totalDots) % totalDots;

    return forwardSteps <= backwardSteps ? 'right' : 'left';
  }

  function waitForTransformEnd(el, fallbackMs) {
    return new Promise(function(resolve) {
      var finished = false;
      var timer = setTimeout(done, fallbackMs);

      function done() {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        el.removeEventListener('transitionend', onEnd);
        resolve();
      }

      function onEnd(event) {
        if (event.target === el && event.propertyName === 'transform') {
          done();
        }
      }

      el.addEventListener('transitionend', onEnd);
    });
  }

  function isPairVisible(wrapper, cardEl) {
    if (!wrapper || !cardEl) return false;

    var wrapperRect = wrapper.getBoundingClientRect();
    var wrapperStyle = window.getComputedStyle(wrapper);
    var cardStyle = window.getComputedStyle(cardEl);

    return wrapperRect.width > 0 &&
      wrapperRect.height > 0 &&
      wrapperStyle.display !== 'none' &&
      cardStyle.display !== 'none' &&
      cardEl.offsetParent !== null;
  }

  function renderDot(dotId, animate, direction) {
    var data = BASES_DOT_DATA[dotId];
    if (!data) return Promise.resolve();

    var dir = direction || 'right';
    var desktopGap = 24;
    var mobileGap = 16;
    var stagedDotId = getAdjacentDotId(dotId, 'right');
    var stagedData = BASES_DOT_DATA[stagedDotId] || data;

    function buildStatsHtml(d) {
      return d.stats.map(function(item) {
        return '<li><span>' + item.label + ':</span> <strong>' + item.value + '</strong></li>';
      }).join('');
    }

    function fillCard(titleEl, imageEl, statsEl, d) {
      // #region debug-point F:image-assign
      debugReport('F', 'image-assign', {
        targetTitle: d.title,
        previousSrc: imageEl ? (imageEl.currentSrc || imageEl.src) : null,
        nextSrc: d.image,
        completeBeforeAssign: imageEl ? imageEl.complete : null,
        naturalWidthBeforeAssign: imageEl ? imageEl.naturalWidth : null
      });
      // #endregion
      titleEl.textContent = d.title;
      imageEl.src = d.image;
      statsEl.innerHTML = buildStatsHtml(d);
    }

    function slidePair(pair, gap, pairAnimate) {
      if (!pair || !pair.wrapper || !pair.currentCardEl || !pair.bufferCardEl) return Promise.resolve();
      var w = pair.wrapper;
      var card1 = pair.currentCardEl;
      var card2 = pair.bufferCardEl;
      var t1 = pair.currentTitleEl;
      var i1 = pair.currentImageEl;
      var s1 = pair.currentStatsEl;
      var t2 = pair.bufferTitleEl;
      var i2 = pair.bufferImageEl;
      var s2 = pair.bufferStatsEl;
      // #region debug-point B:slide-pair-entry
      debugReport('B', 'slide-pair-entry', {
        animate: pairAnimate,
        dir: dir,
        dotId: dotId,
        gap: gap,
        visible: isPairVisible(w, card1),
        card1Transform: card1.style.transform || '',
        card2Transform: card2.style.transform || ''
      });
      // #endregion

      if (!pairAnimate) {
        fillCard(t1, i1, s1, data);
        fillCard(t2, i2, s2, stagedData);
        card1.style.transition = '';
        card1.style.transform = '';
        card2.style.transition = 'none';
        card2.style.transform = 'translateX(calc(100% + ' + gap + 'px))';
        setPairSliding(pair, false);
        setPairLayer(pair);
        syncPairWrapperHeight(pair, getPairStageHeight(pair, measureCardHeight(pair.currentCardEl)), false);
        centerCardInStage(pair, card1);
        centerCardInStage(pair, card2);
        // #region debug-point B:slide-pair-no-animate
        debugReport('B', 'slide-pair-no-animate-applied', {
          dotId: dotId,
          dir: dir,
          card1Transform: card1.style.transform || '',
          card2Transform: card2.style.transform || ''
        });
        // #endregion
        return Promise.resolve();
      }

      fillCard(t2, i2, s2, data);
      card1.style.transition = 'none';
      card2.style.transition = 'none';
      card1.style.zIndex = '1';
      card1.style.pointerEvents = 'none';
      card1.style.visibility = 'visible';
      card2.style.zIndex = '2';
      card2.style.pointerEvents = 'auto';
      card2.style.visibility = 'visible';
      setPairSliding(pair, true);
      card1.style.transform = 'translateX(0)';
      card2.style.transform = getEntryTransform(dir, gap);
      syncPairWrapperHeight(pair, getPairStageHeight(pair, Math.max(measureCardHeight(card1), measureCardHeight(card2))), true);
      centerCardInStage(pair, card1);
      centerCardInStage(pair, card2);

      if (dir === 'right') {
        // #region debug-point C:right-before-raf
        debugReport('C', 'right-before-raf', {
          dotId: dotId,
          activeDot: activeDot,
          card1Transform: card1.style.transform || '',
          card2Transform: card2.style.transform || ''
        });
        // #endregion
      } else {
        // #region debug-point D:left-before-raf
        debugReport('D', 'left-before-raf', {
          dotId: dotId,
          activeDot: activeDot,
          card1Transform: card1.style.transform || '',
          card2Transform: card2.style.transform || ''
        });
        // #endregion
      }

      void card2.offsetWidth;

      return new Promise(function(resolve) {
        requestAnimationFrame(function() {
          card1.style.transition = 'transform ' + (transitionDurationMs / 1000) + 's ' + transitionTiming;
          card2.style.transition = 'transform ' + (transitionDurationMs / 1000) + 's ' + transitionTiming;
          card1.style.transform = getExitTransform(dir, gap);
          card2.style.transform = 'translateX(0)';

          if (dir === 'right') {
            // #region debug-point C:right-after-raf
            debugReport('C', 'right-after-raf', {
              dotId: dotId,
              transition: window.getComputedStyle(card2).transition,
              card1Transform: card1.style.transform || '',
              card2Transform: card2.style.transform || ''
            });
            // #endregion
          } else {
            // #region debug-point D:left-after-raf
            debugReport('D', 'left-after-raf', {
              dotId: dotId,
              transition: window.getComputedStyle(card2).transition,
              card1Transform: card1.style.transform || '',
              card2Transform: card2.style.transform || ''
            });
            // #endregion
          }

          waitForTransformEnd(card2, transitionDurationMs + 180).then(function() {
            swapCardPair(pair);
            setPairLayer(pair);
            setPairSliding(pair, false);

            pair.currentCardEl.style.transition = '';
            pair.currentCardEl.style.transform = '';

            fillCard(pair.bufferTitleEl, pair.bufferImageEl, pair.bufferStatsEl, stagedData);
            pair.bufferCardEl.style.transition = 'none';
            pair.bufferCardEl.style.transform = 'translateX(calc(100% + ' + gap + 'px))';
            syncPairWrapperHeight(pair, getPairStageHeight(pair, measureCardHeight(pair.currentCardEl)), false);
            centerCardInStage(pair, pair.currentCardEl);
            centerCardInStage(pair, pair.bufferCardEl);
            setPairLayer(pair);

            if (dir === 'right') {
              // #region debug-point C:right-complete
              debugReport('C', 'right-complete', {
                dotId: dotId,
                nextId: stagedDotId,
                activeDot: activeDot,
                isAnimating: isAnimating,
                card1Transform: card1.style.transform || '',
                card2Transform: card2.style.transform || ''
              });
              // #endregion
            } else {
              // #region debug-point D:left-complete
              debugReport('D', 'left-complete', {
                dotId: dotId,
                prevId: getAdjacentDotId(dotId, 'left'),
                activeDot: activeDot,
                isAnimating: isAnimating,
                card1Transform: card1.style.transform || '',
                card2Transform: card2.style.transform || ''
              });
              // #endregion
            }

            resolve();
          });
        });
      });
    }

    var desktopVisible = isPairVisible(cardWrapper, card);
    var mobileVisible = isPairVisible(cardWrapperMobile, cardMobile);

    return Promise.all([
      slidePair(desktopPair, desktopGap, animate && desktopVisible),
      slidePair(mobilePair, mobileGap, animate && mobileVisible)
    ]);
  }

  window.addEventListener('resize', function() {
    syncPairWrapperHeight(desktopPair, getPairStageHeight(desktopPair, measureCardHeight(desktopPair.currentCardEl)), false);
    syncPairWrapperHeight(mobilePair, getPairStageHeight(mobilePair, measureCardHeight(mobilePair.currentCardEl)), false);
    centerCardInStage(desktopPair, desktopPair.currentCardEl);
    centerCardInStage(desktopPair, desktopPair.bufferCardEl);
    centerCardInStage(mobilePair, mobilePair.currentCardEl);
    centerCardInStage(mobilePair, mobilePair.bufferCardEl);
  });

  if (typeof mobileModeQuery.addEventListener === 'function') {
    mobileModeQuery.addEventListener('change', function(event) {
      syncActiveDotForViewport(event.matches ? 'enter-mobile' : 'enter-desktop');
    });
  } else if (typeof mobileModeQuery.addListener === 'function') {
    mobileModeQuery.addListener(function(event) {
      syncActiveDotForViewport(event.matches ? 'enter-mobile' : 'enter-desktop');
    });
  }

  function setActiveDot(dotId) {
    dots.forEach(function (dot) {
      var isActive = Number(dot.dataset.dot) === dotId;
      dot.classList.toggle('is-active', isActive);
    });
  }

  function activateDot(dotId, animate, direction) {
    // 如果已经是当前点，就不执行
    if (dotId === activeDot) {
      // #region debug-point E:activate-skip-same
      debugReport('E', 'activate-skip-same', {
        dotId: dotId,
        activeDot: activeDot,
        isAnimating: isAnimating
      });
      // #endregion
      return;
    }
    
    // 如果正在动画中，忽略点击
    if (isAnimating) {
      // #region debug-point E:activate-skip-animating
      debugReport('E', 'activate-skip-animating', {
        dotId: dotId,
        activeDot: activeDot,
        isAnimating: isAnimating,
        direction: direction || null
      });
      // #endregion
      return;
    }

    direction = resolveDirection(activeDot, dotId, direction);

    // 设置动画状态
    isAnimating = animate !== false;
    var transitionId = ++animationToken;
    // #region debug-point E:activate-commit
    debugReport('E', 'activate-commit', {
      previousActiveDot: activeDot,
      nextActiveDot: dotId,
      animate: animate !== false,
      direction: direction,
      isAnimating: isAnimating
    });
    // #endregion

    activeDot = dotId;
    setActiveDot(dotId);
    renderDot(dotId, animate !== false, direction).then(function() {
      if (transitionId !== animationToken) return;
      isAnimating = false;
      // #region debug-point E:activate-finished
      debugReport('E', 'activate-finished', {
        activeDot: activeDot,
        direction: direction,
        isAnimating: isAnimating
      });
      // #endregion
    });
  }

  function goToPrev() {
    var newDot = activeDot - 1;
    if (newDot < 1) newDot = totalDots;
    activateDot(newDot, true, 'left');
  }

  function goToNext() {
    var newDot = activeDot + 1;
    if (newDot > totalDots) newDot = 1;
    activateDot(newDot, true, 'right');
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var dotId = Number(dot.dataset.dot);
      // #region debug-point E:dot-click
      debugReport('E', 'dot-click', {
        trigger: 'dot',
        dotId: dotId,
        activeDot: activeDot,
        isAnimating: isAnimating
      });
      // #endregion
      activateDot(dotId, true);
    });
  });

  prevBtns.forEach(function (btn) {
    btn.addEventListener('click', function() {
      // #region debug-point E:prev-click
      debugReport('E', 'prev-click', {
        trigger: 'prev',
        activeDot: activeDot,
        isAnimating: isAnimating
      });
      // #endregion
      goToPrev();
    });
  });

  nextBtns.forEach(function (btn) {
    btn.addEventListener('click', function() {
      // #region debug-point E:next-click
      debugReport('E', 'next-click', {
        trigger: 'next',
        activeDot: activeDot,
        isAnimating: isAnimating
      });
      // #endregion
      goToNext();
    });
  });

  setActiveDot(activeDot);
  renderDot(activeDot, false).then(function() {
    section.setAttribute('data-bases-ready', 'true');
  });
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

function initStatCounter() {
  const statValues = document.querySelectorAll('.stat-value');
  if (!statValues.length) return;

  const duration = 1500;

  const animateCounter = (element, targetValue) => {
    const startValue = 0;
    const startTime = performance.now();
    
    const formatNumber = (num) => {
      const originalText = element.dataset.originalText || element.textContent;
      if (originalText.includes('B')) {
        return num.toFixed(1) + 'B';
      } else if (originalText.includes(',')) {
        return Math.round(num).toLocaleString();
      }
      return Math.round(num).toString();
    };

    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentValue = startValue + (targetValue - startValue) * progress;
      
      element.textContent = formatNumber(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        const text = entry.target.textContent;
        entry.target.dataset.originalText = text;
        let numValue = parseFloat(text.replace(/[^0-9.]/g, ''));
        animateCounter(entry.target, numValue);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });

  statValues.forEach(value => {
    observer.observe(value);
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

function initStatCounter() {
  const statValues = document.querySelectorAll('.stat-value');
  if (!statValues.length) return;

  const duration = 1500;

  const animateCounter = (element, targetValue) => {
    const startValue = 0;
    const startTime = performance.now();
    
    const formatNumber = (num) => {
      const originalText = element.dataset.originalText || element.textContent;
      if (originalText.includes('B')) {
        return num.toFixed(1) + 'B';
      } else if (originalText.includes(',')) {
        return Math.round(num).toLocaleString();
      }
      return Math.round(num).toString();
    };

    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentValue = startValue + (targetValue - startValue) * progress;
      
      element.textContent = formatNumber(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        const text = entry.target.textContent;
        entry.target.dataset.originalText = text;
        let numValue = parseFloat(text.replace(/[^0-9.]/g, ''));
        animateCounter(entry.target, numValue);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });

  statValues.forEach(value => {
    observer.observe(value);
  });
}
