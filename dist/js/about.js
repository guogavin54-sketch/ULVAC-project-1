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

    var collapsedText = textEl.getAttribute('data-collapsed-text') || textEl.textContent.trim();
    var expandedHtml = expandedSource ? expandedSource.innerHTML : '';

    var renderCollapsed = function() {
      textEl.innerHTML = '<p class="top-message-body-paragraph">' + collapsedText + '</p>';
      textEl.classList.remove('expanded');
      if (expandIcon) {
        expandIcon.classList.remove('rotated');
      }
      if (text2) {
        text2.textContent = 'Show More';
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
        text2.textContent = 'Show Less';
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

    if (!desktopList || !mobileList || !desktopImg || !mobileImg) return;

    var IMAGES = {
      img1952: 'assets/images/1952.jpg',
      img1955: 'assets/images/1955.png',
      img1968: 'assets/images/1968.png',
      img1986: 'assets/images/1986.jpg',
      img1990: 'assets/images/1990.png',
      img1992: 'assets/images/1992.jpg',
      img2004: 'assets/images/2004.png',
      img2004b: 'assets/images/2004_2.png',
      img2011: 'assets/images/2011.png',
      img2024: 'assets/images/2024.png'
    };

    var timelineData = [
      { year: '1952', text: 'Founded Japan Vacuum Engineering Co., Ltd.', image: IMAGES.img1952 },
      { year: '1952', text: 'Received first order for vacuum evaporation equipment for coating automobile parts from ICHIKOH INDUSTRIES (formerly HAKKOSHA).', image: IMAGES.img1952 },
      { year: '1955', text: 'Opened the Omori Plant in Tokyo to start manufacturing equipment in Japan.', image: IMAGES.img1955 },
      { year: '1959', text: 'Opened the Yokohama Plant.', image: IMAGES.img1955 },
      { year: '1960', text: 'Developed large-scale vacuum equipment for heavy industries, such as vacuum melting furnaces and vacuum distillation equipment.', image: IMAGES.img1955 },
      { year: '1964', text: 'Established the first overseas subsidiary in Hong Kong.', image: IMAGES.img1955 },
      { year: '1968', text: 'Head Office/Plant completed in Chigasaki, Kanagawa Prefecture.', image: IMAGES.img1968 },
      { year: '1972', text: "Opened the Institute for Super Materials as ULVAC's first research facility.", image: IMAGES.img1968 },
      { year: '1975', text: 'Established a subsidiary in North America as a base for exports to the U.S.', image: IMAGES.img1968 },
      { year: '1975', text: 'Received order from IBM for "SYSTEM 731," the world\'s first computer-controlled, fully automatic vacuum evaporation equipment.', image: IMAGES.img1968 },
      { year: '1982', text: 'Established a subsidiary in Taiwan.', image: IMAGES.img1968 },
      { year: '1983', text: 'Opened the Beijing Office in China.', image: IMAGES.img1968 },
      { year: '1986', text: 'Launched "MCH Series," the world\'s first multi-chamber sputtering system, gaining high acclaim from many semiconductor manufacturers.', image: IMAGES.img1986 },
      { year: '1987', text: 'Established ULVAC GmbH in West Germany to enhance services in Europe.', image: IMAGES.img1986 },
      { year: '1988', text: 'Introduced "SHD Series" sputtering system for manufacturing hard disks which became a global success.', image: IMAGES.img1986 },
      { year: '1990', text: 'Opened the Fuji Susono Plant in Shizuoka Prefecture, as a plant dedicated to semiconductor production equipment.', image: IMAGES.img1990 },
      { year: '1992', text: 'Launched "SMD Series" deposition system for LCD production, laying the foundation for the Flat Panel Display (FPD) business.', image: IMAGES.img1992 },
      { year: '1995', text: 'Established a vacuum pump production base in China and a sales/service base in South Korea.', image: IMAGES.img1992 },
      { year: '2001', text: 'Changed the company name to ULVAC, Inc.', image: IMAGES.img1992 },
      { year: '2003', text: 'Established a full-scale production and service base in China.', image: IMAGES.img1992 },
      { year: '2004', text: 'Listed stock on the First Section of the Tokyo Stock Exchange.', image: IMAGES.img2004 },
      { year: '2004', text: 'Established a production base for full-scale vacuum equipment in Suzhou, China.', image: IMAGES.img2004b },
      { year: '2011', text: 'Established the Korea Institute for Super Materials in South Korea.', image: IMAGES.img2011 },
      { year: '2018', text: 'Opened the Joint Research Laboratory for Future Technology at The University of Osaka.', image: IMAGES.img2011 },
      { year: '2021', text: 'Opened the ULVAC Advanced Technology Collaborative Research Cluster at Tokyo Institute of Technology (currently Institute of Science Tokyo).', image: IMAGES.img2011 },
      { year: '2022', text: 'Transitioned to the Prime Market of The Tokyo Stock Exchange following market restructuring.', image: IMAGES.img2011 },
      { year: '2024', text: 'Established Technology Center PYEONGTAEK in South Korea.', image: IMAGES.img2024 },
      { year: '2024', text: 'Established Technology Center PYEONGTAEK in South Korea.', image: IMAGES.img2024 }
    ];

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

      var newSrc = timelineData[activeIndex].image;
      [desktopImg, mobileImg].forEach(function(img) {
        if (!img || img.getAttribute('src') === newSrc) return;
        img.style.opacity = '0';
        window.setTimeout(function() {
          img.setAttribute('src', newSrc);
          img.style.opacity = '1';
        }, 220);
      });
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

    renderList(desktopList, 'desktop');
    renderList(mobileList, 'mobile');

    var onDesktopScroll = makeScrollHandler(desktopList, true);
    var onMobileScroll = makeScrollHandler(mobileList, false);

    desktopList.addEventListener('scroll', onDesktopScroll, { passive: true });
    mobileList.addEventListener('scroll', onMobileScroll, { passive: true });

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
