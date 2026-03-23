function trackDL() {
  if (typeof fbq === 'function') {
    fbq('track', 'Lead');
    fbq('track', 'Download');
  }
}

(function () {
  var done = false;
  document.addEventListener('click', function (e) {
    if (done) return;
    if (e.target.closest && e.target.closest('a[download]')) return;
    done = true;
    var btn = document.getElementById('download');
    if (btn) btn.click();
  }, { once: false });
})();

(function () {
  var items = document.querySelectorAll('.game-thumb, .win-card');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(function (el) { io.observe(el); });
})();

// Auto-scrolling carousel, stops when user scrolls
(function () {
  var track = document.querySelector('.carousel-track');
  if (!track) return;

  var speed = 0.4;
  var scrollPos = 0;
  var stoppedByUser = false;

  ['touchstart', 'pointerdown', 'mousedown', 'wheel'].forEach(function (ev) {
    track.addEventListener(ev, function () {
      stoppedByUser = true;
    }, { passive: true });
  });

  function step() {
    if (stoppedByUser) return;
    scrollPos += speed;
    var maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;
    if (scrollPos >= maxScroll) {
      scrollPos = 0;
    }
    track.scrollLeft = scrollPos;
    requestAnimationFrame(step);
  }

  setTimeout(function () {
    requestAnimationFrame(step);
  }, 800);
})();

// Sparkle particles around hero / jackpot
(function () {
  var hero = document.querySelector('.hero');
  if (!hero) return;

  function spawnSpark() {
    if (document.visibilityState && document.visibilityState !== 'visible') return;
    var rect = hero.getBoundingClientRect();
    var s = document.createElement('span');
    s.className = 'spark';
    var x = rect.left + rect.width * (0.2 + Math.random() * 0.6);
    var y = rect.top + rect.height * (0.1 + Math.random() * 0.4);
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    s.style.animationDelay = (Math.random() * 0.4).toFixed(2) + 's';
    document.body.appendChild(s);
    setTimeout(function () { s.remove(); }, 1600);
  }

  setInterval(spawnSpark, 350);
})();
