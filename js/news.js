(function() {
  'use strict';

  function initLatestNewsAccordion() {
    var items = document.querySelectorAll('.latest-news-item');
    if (!items.length) return;

    var setOpen = function(item, isOpen) {
      var toggle = item.querySelector('.latest-news-toggle');
      var panel = item.querySelector('.latest-news-panel');
      if (!toggle || !panel) return;

      item.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      panel.hidden = !isOpen;
    };

    items.forEach(function(item) {
      setOpen(item, false);
    });

    items.forEach(function(item) {
      var toggle = item.querySelector('.latest-news-toggle');
      if (!toggle) return;

      toggle.addEventListener('click', function() {
        var shouldOpen = !item.classList.contains('is-open');

        items.forEach(function(otherItem) {
          setOpen(otherItem, false);
        });

        setOpen(item, shouldOpen);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initLatestNewsAccordion();
  });
})();
