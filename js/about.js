(function() {
  'use strict';

  function initAboutTabs() {
    var tabs = document.querySelectorAll('.tab .tab-nav-item');
    if (!tabs.length) return;

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var tabName = this.textContent.trim();
        console.log('Tab switched to:', tabName);
      });
    });
  }

  function initShowMoreButton() {
    var showMoreBtn = document.querySelector('.top-message-toggle');
    var textEl = document.querySelector('.top-message-body');
    var expandedSource = document.querySelector('.top-message-body-source');
    var expandIcon = document.querySelector('.top-message-toggle-icon');
    var text2 = document.querySelector('.top-message-toggle-text');
    
    if (!showMoreBtn || !textEl) return;

    var currentLang = typeof getCurrentLang === 'function' ? getCurrentLang() : (window.location.pathname.includes('/jp/') ? 'ja' : 'en');
    var moreLabel = currentLang === 'ja' ? '続きを読む' : 'Show More';
    var lessLabel = currentLang === 'ja' ? '閉じる' : 'Show Less';

    var collapsedText = textEl.getAttribute('data-collapsed-text') || textEl.textContent.trim();
    var expandedHtml = expandedSource ? expandedSource.innerHTML : '';

    var renderCollapsed = function() {
      textEl.innerHTML = '<p class="top-message-body-paragraph">' + collapsedText + '</p>';
      textEl.classList.remove('expanded');
      if (expandIcon) {
        expandIcon.classList.remove('rotated');
      }
      if (text2) {
        text2.textContent = moreLabel;
      }
    };

    var renderExpanded = function() {
      if (expandedHtml) {
        textEl.innerHTML = expandedHtml;
      }
      textEl.classList.add('expanded');
      if (expandIcon) {
        expandIcon.classList.add('rotated');
      }
      if (text2) {
        text2.textContent = lessLabel;
      }
    };

    renderCollapsed();

    showMoreBtn.addEventListener('click', function() {
      var isExpanded = textEl.classList.contains('expanded');
      if (isExpanded) {
        renderCollapsed();
      } else {
        renderExpanded();
      }
    });
  }

  function initInfoCards() {
    var infoCards = document.querySelectorAll('.more-info-card');
    if (!infoCards.length) return;

    infoCards.forEach(function(card) {
      card.addEventListener('click', function() {
        var title = this.querySelector('.more-info-card-title');
        if (title) {
          console.log('Card clicked:', title.textContent.trim());
        }
      });
    });
  }

  function initGroupRegionNav() {
    var navLinks = document.querySelectorAll('.group-region-nav__link');
    var sections = document.querySelectorAll('.group-region-section[id]');
    if (!navLinks.length || !sections.length) return;

    var getScrollOffset = function() {
      return window.innerWidth <= 991 ? 116 : 148;
    };

    var setActiveLink = function(targetId) {
      navLinks.forEach(function(link) {
        var isActive = link.getAttribute('href') === '#' + targetId;
        link.classList.toggle('is-active', isActive);
      });
    };

    navLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        var href = link.getAttribute('href');
        var target = href ? document.querySelector(href) : null;
        if (!target) return;

        event.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - getScrollOffset();
        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
        setActiveLink(target.id);
      });
    });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      }, {
        root: null,
        rootMargin: '-35% 0px -45% 0px',
        threshold: 0
      });

      sections.forEach(function(section) {
        observer.observe(section);
      });
    }
  }

  function initGroupCompaniesAccordion() {
    var sections = document.querySelectorAll('.group-region-section');
    if (!sections.length) return;

    var mobileQuery = window.matchMedia('(max-width: 991px)');

    var setSectionState = function(section, isOpen) {
      var toggle = section.querySelector('.group-region-toggle');
      var panel = section.querySelector('.group-region-panel');
      if (!toggle || !panel) return;

      section.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      if (mobileQuery.matches) {
        panel.hidden = !isOpen;
        panel.style.maxHeight = '';
      } else {
        panel.hidden = false;
        panel.style.maxHeight = 'none';
      }
    };

    var syncMode = function() {
      sections.forEach(function(section) {
        if (mobileQuery.matches) {
          setSectionState(section, section.classList.contains('is-open'));
        } else {
          section.classList.remove('is-open');
          setSectionState(section, true);
        }
      });
    };

    sections.forEach(function(section) {
      var toggle = section.querySelector('.group-region-toggle');
      if (!toggle) return;

      section.classList.remove('is-open');
      var panel = section.querySelector('.group-region-panel');
      if (panel) panel.hidden = true;
      setSectionState(section, false);

      toggle.addEventListener('click', function() {
        if (!mobileQuery.matches) return;
        var isOpen = section.classList.contains('is-open');
        setSectionState(section, !isOpen);
      });
    });

    syncMode();

    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', syncMode);
    } else if (typeof mobileQuery.addListener === 'function') {
      mobileQuery.addListener(syncMode);
    }
  }

  function initCompanyHistory() {
    var desktopList = document.getElementById('desktop-history-list');
    var mobileList = document.getElementById('mobile-history-list');
    var desktopImg = document.getElementById('desktop-history-img');
    var mobileImg = document.getElementById('mobile-history-img');
    var desktopNote = document.getElementById('desktop-history-note');
    var mobileNote = document.getElementById('mobile-history-note');
    var historySection = document.querySelector('.section-company-history');
    var mobileHistory = document.querySelector('.company-history-mobile');
    var MOBILE_HISTORY_STICKY_TOP = 136;
    var MOBILE_LOCK_TRIGGER_OFFSET = -20;
    var lastTouchY = null;

    if (!desktopList || !mobileList || !desktopImg || !mobileImg || !historySection || !mobileHistory) return;

    var ASSETS_PATH = window.location.pathname.includes('/jp/') ? '../assets/images/' : 'assets/images/';
    var isJa = window.location.pathname.includes('/jp/');
    var tr = function(enText, jaText) {
      return isJa ? jaText : enText;
    };

    var IMAGES = {
      img1952: ASSETS_PATH + '1952.jpg',
      img1955: ASSETS_PATH + '1955.png',
      img1968: ASSETS_PATH + '1968.png',
      img1986: ASSETS_PATH + '1986.jpg',
      img1990: ASSETS_PATH + '1990.png',
      img1992: ASSETS_PATH + '1992.jpg',
      img2004: ASSETS_PATH + '2004.png',
      img2004b: ASSETS_PATH + '2004_2.png',
      img2011: ASSETS_PATH + '2011.png',
      img2024: ASSETS_PATH + '2024.png',
      imgFallback: ASSETS_PATH + 'ulvac-logo-1.png'
    };

    var timelineData = [
      { year: '1952', text: tr('Founded Japan Vacuum Engineering Co., Ltd.', '日本真空技術株式会社設立'), image: IMAGES.img1952, hasDedicatedImage: true },
      { year: '1952', text: tr('Received first order for vacuum evaporation equipment for coating automobile parts from HAKKOSHA (currently ICHIKOH INDUSTRIES).', '白光舎（現 市光工業（株））から自動車部品のメッキ用真空蒸着装置を初受注'), image: IMAGES.img1952, hasDedicatedImage: true },
      { year: '1955', text: tr('Opened the Omori Plant in Tokyo to start manufacturing equipment in Japan.', '東京都に大森工場を開設、国産装置の製造に着手'), image: IMAGES.img1955, hasDedicatedImage: true },
      { year: '1959', text: tr('Opened the Yokohama Plant.', '横浜工場開設'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '1960', text: tr('Developed large-scale vacuum equipment for heavy industries, such as vacuum melting furnaces and vacuum distillation equipment.', '真空溶解炉や真空蒸留装置など重厚長大産業向け大型真空装置を次々と開発'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '1963', text: tr('Adopted “ULVAC” as the official trademark.', 'ULVACを商標として制定'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '1964', text: tr('Established the first overseas subsidiary in Hong Kong.', '初の海外法人を香港に設立'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '1968', text: tr('Head Office/Plant completed in Chigasaki, Kanagawa Prefecture.', '神奈川県茅ヶ崎市に本社・工場竣工'), image: IMAGES.img1968, hasDedicatedImage: true },
      { year: '1969', text: tr('Changed the English corporate name to ULVAC CORPORATION.', '英文社名をULVAC CORPORATIONに改称'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '1972', text: tr('Opened the Institute for Super Materials as ULVAC’s first research facility.', 'アルバック初の研究機関として超材料研究所を開設'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '1973', text: tr('Developed the world’s first transparent conductive film deposition equipment for LCD calculator displays.', '世界初となる液晶表示電卓用液晶ディスプレイ透明導電膜成膜装置を開発'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '1975', text: tr('Established a subsidiary in North America as a base for exports to the U.S.', '対米輸出の拠点として北米に現地法人を設立'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '1975', text: tr('Received order from IBM for “SYSTEM 731,” the world’s first computer-controlled, fully automatic vacuum evaporation equipment.', 'IBMより世界初全自動真空蒸着装置「システム731」受注'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '1982', text: tr('Established a subsidiary in Taiwan.', '台湾に現地法人を設立'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '1983', text: tr('Opened the Beijing Office in China.', '中国に北京事務所を開設'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '1986', text: tr('Launched “MCH Series,” the world’s first multi-chamber sputtering system, gaining high acclaim from many semiconductor manufacturers.', '世界初のマルチチャンバ型スパッタリング装置「MCHシリーズ」が多くの半導体メーカーから好評を博す'), image: IMAGES.img1986, hasDedicatedImage: true },
      { year: '1987', text: tr('Established ULVAC GmbH in West Germany to enhance services in Europe.', '欧州地区のサービス体制強化のため、西独にULVAC GmbHを設立'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '1988', text: tr('Introduced “SHD Series” sputtering system for manufacturing hard disks which became a global success.', 'ハードディスク向け製造装置「SHDシリーズ」が世界的にヒット'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '1990', text: tr('Opened the Fuji Susono Plant in Shizuoka Prefecture, as a plant dedicated to semiconductor production equipment.', '半導体製造装置の専門工場として静岡県に富士裾野工場を開設'), image: IMAGES.img1990, hasDedicatedImage: true },
      { year: '1992', text: tr('Launched “SMD Series” deposition system for LCD production, laying the foundation for the Flat Panel Display (FPD) business.', 'FPD事業の礎を築いたLCD用枚葉式成膜装置「SMDシリーズ」をリリース'), image: IMAGES.img1992, hasDedicatedImage: true },
      { year: '1995', text: tr('Established a vacuum pump production base in China and a sales/service base in South Korea.', '中国に真空ポンプの生産拠点、韓国に販売・サービス拠点を設立'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '2001', text: tr('Changed the company name to ULVAC, Inc.', '社名を株式会社アルバック（英文名：ULVAC, Inc.）に変更'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '2003', text: tr('Established a full-scale production and service base in China.', '中国における本格的生産とサービス拠点を設立'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '2004', text: tr('Listed stock on the First Section of the Tokyo Stock Exchange.', '東京証券取引所市場第一部上場'), image: IMAGES.img2004, hasDedicatedImage: true },
      { year: '2004', text: tr('Established a production base for full-scale vacuum equipment in Suzhou, China.', '中国蘇州に本格的な真空装置の生産拠点を設立'), image: IMAGES.img2004b, hasDedicatedImage: true },
      { year: '2011', text: tr('Established the Korea Institute for Super Materials in South Korea.', '韓国に韓国超材料研究所を設立'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '2018', text: tr('Opened the Joint Research Laboratory for Future Technology at The University of Osaka.', '大阪大学内にアルバック未来技術協働研究所を開設'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '2021', text: tr('Opened the ULVAC Advanced Technology Collaborative Research Cluster at Tokyo Institute of Technology (currently Institute of Science Tokyo).', '東京工業大学（現 東京科学大学）にアルバック先進技術協働研究拠点を開設'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '2022', text: tr('Transitioned to the Prime Market of The Tokyo Stock Exchange following market restructuring.', '東京証券取引所の市場第一部からプライム市場に移行'), image: IMAGES.imgFallback, hasDedicatedImage: false },
      { year: '2024', text: tr('Established Technology Center PYEONGTAEK in South Korea.', '韓国にTechnology Center PYEONGTAEKを設立'), image: IMAGES.img2024, hasDedicatedImage: true }
    ];
    var mobileLockEndIndex = (function() {
      for (var i = timelineData.length - 1; i >= 0; i -= 1) {
        if (timelineData[i].year === '2021') return i;
      }
      return timelineData.length - 1;
    })();

    var activeIndex = 0;

    function dotSVG(isActive) {
      var fill = isActive ? '#1C7DCD' : 'white';
      var r = isActive ? '5.5' : '6.5';
      var strokeWidth = isActive ? '3' : '1';
      return '<svg fill="none" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" fill="' + fill + '" r="' + r + '" stroke="#1C7DCD" stroke-width="' + strokeWidth + '"/></svg>';
    }

    function buildItem(item, index, prefix) {
      var isActive = index === activeIndex;
      var div = document.createElement('div');
      div.className = 'timeline-item company-history-timeline-item' + (isActive ? ' active' : '');
      div.id = prefix + '-item-' + index;
      div.setAttribute('role', 'button');
      div.setAttribute('tabindex', '0');
      div.innerHTML =
        '<div class="bar-vertical company-history-bar">' +
          '<div class="bar-line company-history-bar-line ' + (index === 0 ? 'no-line' : '') + '"></div>' +
          '<div class="bar-dot company-history-dot">' + dotSVG(isActive) + '</div>' +
          '<div class="bar-line company-history-bar-line"></div>' +
        '</div>' +
        '<div class="item-text company-history-item-text">' +
          '<p class="item-year company-history-year" style="color:' + (isActive ? '#1a1a1a' : '#949494') + '">' + item.year + '</p>' +
          '<p class="item-desc company-history-desc" style="color:' + (isActive ? '#666' : '#949494') + '">' + item.text + '</p>' +
        '</div>';

      div.addEventListener('click', function() {
        setActive(index);
      });

      div.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setActive(index);
        }
      });

      return div;
    }

    function renderList(container, prefix) {
      container.innerHTML = '';
      timelineData.forEach(function(item, index) {
        container.appendChild(buildItem(item, index, prefix));
      });
    }

    function transitionHistoryImage(img, newSrc) {
      if (!img || img.getAttribute('src') === newSrc) return;

      if (img.dataset.transitioning === 'true') {
        img.dataset.pendingSrc = newSrc;
        return;
      }

      var parent = img.parentElement;
      if (!parent) {
        img.setAttribute('src', newSrc);
        return;
      }

      img.dataset.transitioning = 'true';

      var preload = new Image();
      preload.decoding = 'async';

      preload.onload = function() {
        var staleOverlay = parent.querySelector('.timeline-img--overlay');
        if (staleOverlay) {
          staleOverlay.remove();
        }

        var overlay = img.cloneNode(true);
        overlay.removeAttribute('id');
        overlay.classList.add('timeline-img--overlay');
        parent.appendChild(overlay);

        img.setAttribute('src', newSrc);
        img.classList.remove('is-switching-in', 'is-active');
        img.classList.add('is-switching-in');

        window.requestAnimationFrame(function() {
          overlay.classList.add('is-switching-out');
          img.classList.add('is-active');
        });

        window.setTimeout(function() {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }

          img.classList.remove('is-switching-in', 'is-active');
          img.dataset.transitioning = 'false';

          if (img.dataset.pendingSrc && img.dataset.pendingSrc !== img.getAttribute('src')) {
            var pendingSrc = img.dataset.pendingSrc;
            delete img.dataset.pendingSrc;
            transitionHistoryImage(img, pendingSrc);
            return;
          }

          delete img.dataset.pendingSrc;
        }, 340);
      };

      preload.onerror = function() {
        img.setAttribute('src', newSrc);
        img.classList.remove('is-switching-in', 'is-active');
        img.dataset.transitioning = 'false';
        delete img.dataset.pendingSrc;
      };

      preload.src = newSrc;
    }

    function setActive(index) {
      if (index < 0 || index >= timelineData.length || index === activeIndex) return;

      ['desktop', 'mobile'].forEach(function(prefix) {
        var oldItem = document.getElementById(prefix + '-item-' + activeIndex);
        if (!oldItem) return;
        oldItem.classList.remove('active');
        var oldYear = oldItem.querySelector('.item-year');
        var oldDesc = oldItem.querySelector('.item-desc');
        var oldDot = oldItem.querySelector('.bar-dot');
        if (oldYear) oldYear.style.color = '#949494';
        if (oldDesc) oldDesc.style.color = '#949494';
        if (oldDot) oldDot.innerHTML = dotSVG(false);
      });

      activeIndex = index;

      ['desktop', 'mobile'].forEach(function(prefix) {
        var nextItem = document.getElementById(prefix + '-item-' + activeIndex);
        if (!nextItem) return;
        nextItem.classList.add('active');
        var nextYear = nextItem.querySelector('.item-year');
        var nextDesc = nextItem.querySelector('.item-desc');
        var nextDot = nextItem.querySelector('.bar-dot');
        if (nextYear) nextYear.style.color = '#1a1a1a';
        if (nextDesc) nextDesc.style.color = '#666';
        if (nextDot) nextDot.innerHTML = dotSVG(true);
      });

      var desktopStatus = document.getElementById('desktop-history-status');
      var mobileStatus = document.getElementById('mobile-history-status');
      
      if (desktopStatus) desktopStatus.textContent = timelineData[activeIndex].year;
      if (mobileStatus) mobileStatus.textContent = timelineData[activeIndex].year;

      var newSrc = timelineData[activeIndex].image;
      [desktopImg, mobileImg].forEach(function(img) {
        transitionHistoryImage(img, newSrc);
      });
    }

    function syncHistoryImageMeta(item) {
      if (!item) return;
      var desktopImg = document.getElementById('desktop-history-img');
      var mobileImg = document.getElementById('mobile-history-img');
      if (desktopImg && item.image) {
        desktopImg.setAttribute('data-year', item.year);
        desktopImg.setAttribute('alt', item.text);
      }
      if (mobileImg && item.image) {
        mobileImg.setAttribute('data-year', item.year);
        mobileImg.setAttribute('alt', item.text);
      }
    }

    function makeScrollHandler(listEl, useCenter) {
      return function() {
        var listRect = listEl.getBoundingClientRect();
        var anchor = useCenter ? listRect.top + (listRect.height / 2) : listRect.top;
        var best = 0;
        var bestDist = Infinity;
        var prefix = useCenter ? 'desktop' : 'mobile';

        timelineData.forEach(function(_, index) {
          var item = document.getElementById(prefix + '-item-' + index);
          if (!item) return;
          var rect = item.getBoundingClientRect();
          var point = useCenter ? rect.top + (rect.height / 2) : rect.top;
          var dist = Math.abs(point - anchor);
          if (dist < bestDist) {
            bestDist = dist;
            best = index;
          }
        });

        setActive(best);
      };
    }

    function isMobileViewport() {
      return window.innerWidth <= 991;
    }

    function getMobileLockLimit() {
      var targetItem = document.getElementById('mobile-item-' + mobileLockEndIndex);
      var maxScrollableTop = Math.max(0, mobileList.scrollHeight - mobileList.clientHeight);

      if (!targetItem) return maxScrollableTop;

      return Math.max(
        0,
        Math.min(targetItem.offsetTop, maxScrollableTop)
      );
    }

    function shouldCaptureMobileTimelineScroll(deltaY) {
      if (!isMobileViewport() || !deltaY) return false;

      var mobileHistoryRect = mobileHistory.getBoundingClientRect();
      var lockStartLine = MOBILE_HISTORY_STICKY_TOP + MOBILE_LOCK_TRIGGER_OFFSET;
      var lockLimit = getMobileLockLimit();
      var currentTop = mobileList.scrollTop;

      if (mobileHistoryRect.top > lockStartLine) {
        return false;
      }

      if (deltaY > 0) {
        return currentTop < lockLimit - 1;
      }

      return currentTop > 1 && mobileHistoryRect.bottom > MOBILE_HISTORY_STICKY_TOP;
    }

    function applyMobileTimelineScroll(deltaY) {
      var lockLimit = getMobileLockLimit();
      var nextTop = mobileList.scrollTop + deltaY;

      if (deltaY > 0) {
        nextTop = Math.min(nextTop, lockLimit);
      } else {
        nextTop = Math.max(nextTop, 0);
      }

      mobileList.scrollTop = nextTop;
    }

    function onMobileWheel(event) {
      if (!shouldCaptureMobileTimelineScroll(event.deltaY)) return;

      event.preventDefault();
      applyMobileTimelineScroll(event.deltaY);
    }

    function onMobileTouchStart(event) {
      if (!isMobileViewport() || !event.touches.length) return;
      lastTouchY = event.touches[0].clientY;
    }

    function onMobileTouchMove(event) {
      if (!isMobileViewport() || !event.touches.length || lastTouchY === null) return;

      var currentTouchY = event.touches[0].clientY;
      var deltaY = lastTouchY - currentTouchY;

      if (!shouldCaptureMobileTimelineScroll(deltaY)) {
        lastTouchY = currentTouchY;
        return;
      }

      event.preventDefault();
      applyMobileTimelineScroll(deltaY);
      lastTouchY = currentTouchY;
    }

    function resetMobileTouchState() {
      lastTouchY = null;
    }

    renderList(desktopList, 'desktop');
    renderList(mobileList, 'mobile');

    var onDesktopScroll = makeScrollHandler(desktopList, true);
    var onMobileScroll = makeScrollHandler(mobileList, false);

    desktopList.addEventListener('scroll', onDesktopScroll, { passive: true });
    mobileList.addEventListener('scroll', onMobileScroll, { passive: true });
    window.addEventListener('wheel', onMobileWheel, { passive: false });
    window.addEventListener('touchstart', onMobileTouchStart, { passive: true });
    window.addEventListener('touchmove', onMobileTouchMove, { passive: false });
    window.addEventListener('touchend', resetMobileTouchState, { passive: true });
    window.addEventListener('touchcancel', resetMobileTouchState, { passive: true });

    syncHistoryImageMeta(timelineData[activeIndex]);
    window.setTimeout(onDesktopScroll, 100);
    window.setTimeout(onMobileScroll, 100);
  }

  function initScrollAnimations() {
    if (typeof window.initScrollAnimations === 'function' && window.initScrollAnimations !== initScrollAnimations) {
      window.initScrollAnimations();
      return;
    }

    var animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      animateElements.forEach(function(el) {
        observer.observe(el);
      });
    } else {
      animateElements.forEach(function(el) {
        el.classList.add('is-visible');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    initAboutTabs();
    initShowMoreButton();
    initInfoCards();
    initGroupRegionNav();
    initGroupCompaniesAccordion();
    initCompanyHistory();
    initScrollAnimations();
  });
})();
