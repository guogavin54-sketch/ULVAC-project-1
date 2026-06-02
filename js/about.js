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
    initScrollAnimations();
  });
})();
