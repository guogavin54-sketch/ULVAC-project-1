(function() {
  'use strict';

  function initLatestNewsAccordion() {
    var items = document.querySelectorAll('.latest-news-item');
    if (!items.length) return;

    var setOpen = function(item, isOpen) {
      var toggle = item.querySelector('.latest-news-toggle');
      var panel = item.querySelector('.latest-news-panel');
      if (!toggle || !panel) return;

      if (isOpen) {
        // prepare to open
        panel.hidden = false;
        item.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        
        // Use scrollHeight for max-height
        panel.style.maxHeight = panel.scrollHeight + 50 + 'px';
      } else {
        // prepare to close
        // Temporarily set explicit height before transitioning to 0
        panel.style.maxHeight = panel.scrollHeight + 50 + 'px';
        
        // Force reflow
        void panel.offsetHeight;
        
        item.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null; // revert to CSS 0
      }
    };

    items.forEach(function(item) {
      var panel = item.querySelector('.latest-news-panel');
      if (panel) {
        panel.hidden = false;
        panel.removeAttribute('hidden');
      }
      setOpen(item, false);
    });

    items.forEach(function(item) {
      var toggle = item.querySelector('.latest-news-toggle');
      var panel = item.querySelector('.latest-news-panel');
      if (!toggle || !panel) return;

      // When transition ends, if it's open, remove max-height so it can respond to window resize
      panel.addEventListener('transitionend', function(e) {
        if (e.propertyName === 'max-height' && item.classList.contains('is-open')) {
          panel.style.maxHeight = 'none';
        }
      });

      toggle.addEventListener('click', function() {
        var shouldOpen = !item.classList.contains('is-open');

        if (shouldOpen) {
          // Close others
          items.forEach(function(otherItem) {
            if (otherItem !== item && otherItem.classList.contains('is-open')) {
              setOpen(otherItem, false);
            }
          });
        }

        setOpen(item, shouldOpen);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initLatestNewsAccordion();
  });
})();