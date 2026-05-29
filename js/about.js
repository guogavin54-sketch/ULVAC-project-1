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
    var expandIcon = document.querySelector('.top-message-toggle-icon');
    var text2 = document.querySelector('.top-message-toggle-text');
    
    if (!showMoreBtn || !textEl) return;

    showMoreBtn.addEventListener('click', function() {
      var isExpanded = textEl.classList.toggle('expanded');
      
      if (expandIcon) {
        expandIcon.classList.toggle('rotated', isExpanded);
      }
      
      if (text2) {
        text2.textContent = isExpanded ? 'Show Less' : 'Show More';
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

  function initScrollAnimations() {
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
    initScrollAnimations();
  });
})();
