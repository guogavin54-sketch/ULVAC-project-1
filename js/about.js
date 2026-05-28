(function() {
  'use strict';

  function initAboutTabs() {
    var tabs = document.querySelectorAll('.tab .text2, .tab .text3');
    if (!tabs.length) return;

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var currentActive = document.querySelector('.tab .text2');
        if (currentActive) {
          currentActive.classList.remove('text2');
          currentActive.classList.add('text3');
        }
        
        this.classList.remove('text3');
        this.classList.add('text2');
        
        var tabName = this.textContent.trim();
        console.log('Tab switched to:', tabName);
      });
    });
  }

  function initShowMoreButton() {
    var showMoreBtn = document.querySelector('.buttonShow');
    var textEl = document.querySelector('.backIn1952UlvacWasSt');
    var expandIcon = document.querySelector('.expandMore');
    var text2 = document.querySelector('.buttonShow .text2');
    
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
    var infoCards = document.querySelectorAll('.buttonCard');
    if (!infoCards.length) return;

    infoCards.forEach(function(card) {
      card.addEventListener('click', function() {
        var title = this.querySelector('.managementStructure');
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
