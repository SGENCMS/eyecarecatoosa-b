/* site.js — Eyecare of Catoosa Hills ("Aperture" redesign). No dependencies, no third-party calls. */
(function () {
  'use strict';
  var d = document;
  // Where this build lives. Resolved from this script's own URL, so the site works at a domain
  // root, in a subdirectory, or from a file path — nothing about the host is assumed.
  var me = d.currentScript || d.querySelector('script[src$="site.js"]');
  var ROOT = new URL('../', me ? me.src : location.href);

  /* header shadow */
  var header = d.querySelector('[data-header]');
  var onScroll = function () { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* desktop menus: click/keyboard; hover handled in CSS */
  var items = [].slice.call(d.querySelectorAll('[data-menu]'));
  function closeAll(except) {
    items.forEach(function (it) { if (it !== except) { it.classList.remove('is-open'); var b = it.querySelector('.nav__trigger'); if (b) b.setAttribute('aria-expanded', 'false'); } });
  }
  items.forEach(function (it) {
    var btn = it.querySelector('.nav__trigger');
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      it.classList.remove('is-dismissed');
      var open = !it.classList.contains('is-open');
      closeAll(it);
      it.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    it.addEventListener('mouseleave', function () { it.classList.remove('is-open', 'is-dismissed'); btn.setAttribute('aria-expanded', 'false'); btn.blur && null; });
    // keyboard: a panel closes when focus moves on past it, so it never covers what is focused next
    it.addEventListener('focusout', function (e) { if (!e.relatedTarget || !it.contains(e.relatedTarget)) { it.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); } });
  });
  d.addEventListener('click', function (e) { if (!e.target.closest('[data-menu]')) closeAll(); });
  d.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = d.querySelector('[data-menu].is-open');
    // a panel shown by hover is dismissed too, until the pointer leaves it (WCAG 1.4.13)
    var hovered = d.querySelector('[data-menu]:hover');
    if (hovered) hovered.classList.add('is-dismissed');
    closeAll();
    if (open) open.querySelector('.nav__trigger').focus({ preventScroll: true });
    closeDrawer();
  });

  /* drawer */
  var drawer = d.querySelector('[data-drawer]');
  var opener = d.querySelector('[data-drawer-open]');
  var lastFocus = null;
  function openDrawer() {
    if (!drawer) return;
    lastFocus = d.activeElement;
    drawer.hidden = false; drawer.classList.add('is-open');
    d.body.style.overflow = 'hidden';
    if (opener) opener.setAttribute('aria-expanded', 'true');
    var f = drawer.querySelector('a,button'); if (f) f.focus({ preventScroll: true });
  }
  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('is-open'); drawer.hidden = true;
    d.body.style.overflow = '';
    if (opener) opener.setAttribute('aria-expanded', 'false');
    if (lastFocus) lastFocus.focus({ preventScroll: true }); // the control is in the sticky header: never scroll to it
  }
  if (opener) opener.addEventListener('click', openDrawer);
  [].forEach.call(d.querySelectorAll('[data-drawer-close]'), function (b) { b.addEventListener('click', closeDrawer); });
  if (drawer) drawer.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var f = [].slice.call(drawer.querySelectorAll('a[href],button,summary')).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* reveal on scroll */
  var rev = [].slice.call(d.querySelectorAll('[data-reveal]'));
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    d.documentElement.classList.add('reveal-ready');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rev.forEach(function (el) { io.observe(el); });
  } else rev.forEach(function (el) { el.classList.add('is-in'); });

  /* video loops (lib.mjs loop()): decorative, silent and not interactive — no controls, no pause or
     play button, nothing a click, tap, key or the browser's own video menu can pause (a design
     decision, 2026-09-30). A loop plays only while it is on screen and motion is welcome — never under
     prefers-reduced-motion or Save-Data, re-checked live — so otherwise its poster is the picture. It
     uses the smallest rendition that covers its box. */
  var calm = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var loops = [].map.call(d.querySelectorAll('[data-loop]'), function (box) {
    var srcs = box.getAttribute('data-loop').split(',').map(function (x) { var i = x.indexOf(':'); return { w: +x.slice(0, i), u: x.slice(i + 1) }; }).sort(function (a, b) { return a.w - b.w; });
    var video = null, host = null, onScreen = false, refused = false, undone = [], retry = 0;
    function pick() {
      var need = box.getBoundingClientRect().width * Math.min(window.devicePixelRatio || 1, 2);
      for (var i = 0; i < srcs.length; i++) if (srcs[i].w >= need) return srcs[i].u;
      return srcs[srcs.length - 1].u;
    }
    function wanted() { return onScreen && !refused && !d.hidden && !calm.matches && !saveData; }
    function ensure() {
      if (video) return video;
      video = d.createElement('video');
      video.muted = true; video.defaultMuted = true; video.loop = true; video.playsInline = true; video.controls = false;
      video.disablePictureInPicture = true; video.disableRemotePlayback = true;
      ['muted', 'playsinline', 'disablepictureinpicture', 'disableremoteplayback'].forEach(function (a) { video.setAttribute(a, ''); });
      video.setAttribute('controlslist', 'nodownload nofullscreen noremoteplayback noplaybackrate');
      video.setAttribute('aria-hidden', 'true'); video.setAttribute('tabindex', '-1');
      ['display:block', 'width:100%', 'height:100%', 'object-fit:cover', 'pointer-events:none', 'user-select:none', '-webkit-user-select:none', '-webkit-touch-callout:none']
        .forEach(function (x) { var i = x.indexOf(':'); video.style.setProperty(x.slice(0, i), x.slice(i + 1)); });
      video.preload = 'auto';
      video.src = new URL(pick(), ROOT).href;
      video.addEventListener('playing', function () { box.classList.add('is-playing'); });
      // Firefox's right-click menu reaches a video under other elements and can pause it, change its
      // speed, show its controls, stop its looping or open it picture-in-picture (whose window has a
      // pause button); all of it is put back. A pause this script did not make is undone at once. When
      // pauses keep coming (more than 10 in 10 s — Pause pressed again and again, or a browser that
      // pauses by itself) the undo waits, doubling up to 2 s: the loop always comes back, and the two
      // never fight in a tight loop.
      video.addEventListener('pause', function () {
        if (retry || !wanted()) return;
        var now = Date.now();
        undone = undone.filter(function (t) { return now - t < 10000; });
        undone.push(now);
        var over = undone.length - 10;
        retry = setTimeout(function () { retry = 0; play(); }, over > 0 ? Math.min(2000, 125 * Math.pow(2, over - 1)) : 0);
      });
      video.addEventListener('ratechange', function () { if (video.playbackRate !== 1) video.playbackRate = 1; });
      if (window.MutationObserver) new MutationObserver(function () {
        if (video.controls) video.controls = false;
        if (!video.loop) video.loop = true;
      }).observe(video, { attributes: true, attributeFilter: ['controls', 'loop'] });
      // inside a shadow root, so a "picture-in-picture the video on this page" shortcut cannot find it
      host = d.createElement('span');
      host.className = 'loop__video';
      host.setAttribute('aria-hidden', 'true');
      (host.attachShadow ? host.attachShadow({ mode: 'open' }) : host).appendChild(video);
      box.appendChild(host);
      return video;
    }
    function play() {
      if (!wanted()) return;
      var p = ensure().play();
      if (p && p.catch) p.catch(function (err) { if (err && err.name === 'NotAllowedError') { refused = true; release(); } });
    }
    function stop() { if (video) video.pause(); box.classList.remove('is-playing'); }
    // the device refuses to play video by itself (iOS Low Power Mode, a browser setting): the poster
    // stays the picture for the rest of the visit, and the video is let go so nothing more downloads
    function release() {
      stop();
      if (!video) return;
      video.removeAttribute('src'); video.load();
      if (host.parentNode) host.parentNode.removeChild(host);
      video = host = null;
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { onScreen = e.isIntersecting; if (onScreen) play(); else if (video) video.pause(); });
      }, { rootMargin: '160px 0px' }).observe(box);
    } else { onScreen = true; play(); }
    return { play: play, stop: stop };
  });
  function playAll() { loops.forEach(function (l) { l.play(); }); }
  // reduced motion switched on mid-visit stops every loop at once (the poster returns); off, they resume
  var onCalm = function () { if (calm.matches) loops.forEach(function (l) { l.stop(); }); else playAll(); };
  if (calm.addEventListener) calm.addEventListener('change', onCalm); else if (calm.addListener) calm.addListener(onCalm);
  // back from another tab, a frozen tab or the back/forward cache: loops on screen carry on. Chrome
  // resumes its own players first — a play() in that same moment can leave one stuck on a frame — so wait.
  function wake() { setTimeout(playAll, 250); }
  d.addEventListener('visibilitychange', function () { if (!d.hidden) wake(); });
  window.addEventListener('pageshow', wake);

  /* table of contents: built from the page's own section headings, then kept in sync */
  var tocBox = d.querySelector('[data-toc]');
  if (tocBox) {
    var hs = [].slice.call(d.querySelectorAll('.prose h2[id]')).slice(0, 10);
    if (hs.length >= 3) {
      var ul = tocBox.querySelector('ul');
      hs.forEach(function (h) { var li = d.createElement('li'), a = d.createElement('a'); a.href = '#' + h.id; a.textContent = h.textContent.trim(); li.appendChild(a); ul.appendChild(li); });
      tocBox.hidden = false;
    }
  }
  var toc = [].slice.call(d.querySelectorAll('.toc a'));
  if (toc.length && 'IntersectionObserver' in window) {
    var map = {};
    toc.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var tio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { toc.forEach(function (a) { a.classList.remove('is-active'); }); var a = map[e.target.id]; if (a) a.classList.add('is-active'); } });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { var h = d.getElementById(id); if (h) tio.observe(h); });
  }

  /* today's hours */
  var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];
  [].forEach.call(d.querySelectorAll('tr[data-day="' + day + '"]'), function (tr) { tr.classList.add('is-today'); });

  /* forms: nothing is sent until the practice connects an endpoint (see docs/DEPLOY.md) */
  // Submit buttons ship disabled so nothing can post without this script; enable them now.
  [].forEach.call(d.querySelectorAll('[data-js-enable]'), function (b) { b.disabled = false; });
  [].forEach.call(d.querySelectorAll('form.vf'), function (f) {
    if (f.getAttribute('data-endpoint')) { var off = f.parentNode && f.parentNode.querySelector('[data-form-offline]'); if (off) off.remove(); }
    // a field marked invalid is cleared as soon as it is corrected
    f.addEventListener('input', function (e) { var c = e.target; if (c.getAttribute && c.getAttribute('aria-invalid') === 'true' && c.checkValidity()) c.removeAttribute('aria-invalid'); });
    f.addEventListener('change', function (e) { var c = e.target; if (c.name) [].forEach.call(f.querySelectorAll('[name="' + c.name + '"]'), function (x) { if (x.checkValidity()) x.removeAttribute('aria-invalid'); }); });
    f.addEventListener('submit', function (e) {
      var endpoint = f.getAttribute('data-endpoint');
      if (!f.checkValidity()) {
        e.preventDefault();
        // every invalid control is marked (announced and outlined), and the first one is brought to
        // the middle of the screen with its label, not under the sticky header
        var bad = [].filter.call(f.elements, function (x) { return x.willValidate && !x.checkValidity(); });
        bad.forEach(function (x) { x.setAttribute('aria-invalid', 'true'); });
        var first = bad[0], field = first && first.closest('.field');
        if (field && field.scrollIntoView) field.scrollIntoView({ block: 'center' });
        if (first) first.focus({ preventScroll: true });
        f.reportValidity();
        return;
      }
      if (endpoint) { f.setAttribute('action', endpoint); return; }
      e.preventDefault();
      var s = f.querySelector('[data-form-status]');
      if (s) {
        s.textContent = 'Online submission is not available yet. Please call us at ';
        var tel = d.createElement('a'); tel.href = 'tel:9182663937'; tel.textContent = '(918) 266-3937'; s.appendChild(tel);
        s.appendChild(d.createTextNode(' to complete this request.'));
        s.classList.add('is-shown'); s.focus && s.setAttribute('tabindex', '-1'); s.focus && s.focus();
      }
    });
  });

  /* site search (reads search-index.json next to this build) */
  var out = d.querySelector('[data-search-results]');
  if (out) {
    var q = (new URLSearchParams(location.search).get('q') || '').trim();
    var input = d.querySelector('[data-search-input]');
    if (input) input.value = q;
    var status = d.querySelector('[data-search-status]');
    if (!q) { status.textContent = 'Type a word or two above to search the site.'; return; }
    fetch(new URL('search-index.json', ROOT)).then(function (r) { return r.json(); }).then(function (idx) {
      var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      var hits = idx.map(function (p) {
        var hay = (p.t + ' ' + p.d + ' ' + p.x).toLowerCase(), score = 0;
        terms.forEach(function (t) { if (p.t.toLowerCase().indexOf(t) > -1) score += 5; if (hay.indexOf(t) > -1) score += 1; });
        return { p: p, s: terms.every(function (t) { return hay.indexOf(t) > -1; }) ? score : 0 };
      }).filter(function (h) { return h.s > 0; }).sort(function (a, b) { return b.s - a.s; });
      var total = hits.length, CAP = 60;
      hits = hits.slice(0, CAP);
      status.textContent = (total > CAP ? 'Showing ' + CAP + ' of ' + total + ' results' : total + ' result' + (total === 1 ? '' : 's')) + ' for “' + q + '”';
      out.innerHTML = '';
      hits.forEach(function (h) {
        var li = d.createElement('li'), a = d.createElement('a'), s = d.createElement('strong'), sp = d.createElement('span');
        a.href = new URL(h.p.u.replace(/^\//, ''), ROOT).href;
        s.textContent = h.p.t; sp.textContent = h.p.d;
        a.appendChild(s); a.appendChild(sp); li.appendChild(a); out.appendChild(li);
      });
    }).catch(function () { status.textContent = 'Search is unavailable right now.'; });
  }
})();
