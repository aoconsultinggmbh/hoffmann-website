/* Praxis Dr. Hoffmann – schlankes Verhalten ohne Abhängigkeiten */
(function () {
  'use strict';
  const d = document, b = d.body;
  const header = d.querySelector('.site-header');
  const burger = d.querySelector('.burger');
  const nav = d.querySelector('.nav');
  const mqDesktop = window.matchMedia('(min-width: 1141px)');

  /* Header-Schatten beim Scrollen */
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobiles Menü */
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') !== 'true';
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      b.classList.toggle('nav-open', open);
    });
    d.addEventListener('keydown', e => { if (e.key === 'Escape' && b.classList.contains('nav-open')) burger.click(); });
  }

  /* Untermenüs: Hover auf Desktop, Klick überall, Tastatur-freundlich */
  const items = Array.from(d.querySelectorAll('.nav-item.has-sub'));
  const closeAll = except => items.forEach(it => { if (it !== except) { it.classList.remove('is-open'); it.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false'); } });
  items.forEach(it => {
    const btn = it.querySelector('.nav-toggle');
    let t;
    btn.addEventListener('click', () => { const open = !it.classList.contains('is-open'); closeAll(it); it.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); });
    it.addEventListener('mouseenter', () => { if (!mqDesktop.matches) return; clearTimeout(t); closeAll(it); it.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); });
    it.addEventListener('mouseleave', () => { if (!mqDesktop.matches) return; t = setTimeout(() => { it.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }, 160); });
    it.addEventListener('focusout', e => { if (!it.contains(e.relatedTarget)) { it.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); } });
  });
  d.addEventListener('click', e => { if (!e.target.closest('.nav-item.has-sub')) closeAll(null); });
  d.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(null); });

  /* Sanftes Einblenden */
  const reveals = d.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(el => io.observe(el));
  } else { reveals.forEach(el => el.classList.add('is-visible')); }

  /* Geöffnet / geschlossen – Zeit in Berlin */
  const status = d.querySelectorAll('[data-hours-status]');
  if (status.length) {
    const table = d.querySelector('[data-hours]');
    const rows = table ? Array.from(table.querySelectorAll('tr[data-dow]')) : [];
    const now = new Date();
    const berlin = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
    const dow = berlin.getDay(); const mins = berlin.getHours() * 60 + berlin.getMinutes();
    const parse = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
    const spans = {};
    rows.forEach(r => {
      r.classList.toggle('is-today', Number(r.dataset.dow) === dow);
      const txt = r.querySelector('td').textContent;
      spans[r.dataset.dow] = Array.from(txt.matchAll(/(\d{2}:\d{2})–(\d{2}:\d{2})/g)).map(m => [parse(m[1]), parse(m[2])]);
    });
    const today = spans[dow] || [];
    const open = today.find(([a, z]) => mins >= a && mins < z);
    let text, cls;
    const fmt = m => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
    if (open) { text = 'Jetzt geöffnet · bis ' + fmt(open[1]) + ' Uhr'; cls = 'is-open'; }
    else {
      const next = today.find(([a]) => mins < a);
      if (next) { text = 'Derzeit geschlossen · öffnet heute um ' + fmt(next[0]) + ' Uhr'; }
      else {
        const names = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
        let nd = (dow + 1) % 7, guard = 0;
        while (!(spans[nd] && spans[nd].length) && guard++ < 7) nd = (nd + 1) % 7;
        text = spans[nd] && spans[nd].length ? 'Derzeit geschlossen · öffnet ' + (nd === (dow + 1) % 7 ? 'morgen' : 'am ' + names[nd]) + ' um ' + fmt(spans[nd][0][0]) + ' Uhr' : 'Derzeit geschlossen';
      }
      cls = 'is-closed';
    }
    status.forEach(s => { s.textContent = text; s.classList.add(cls); });
  }

  /* Google Maps erst nach Einwilligung laden (Zwei-Klick) */
  const maps = d.querySelectorAll('[data-gmap]');
  const loadMap = box => {
    if (box.classList.contains('is-loaded')) return;
    const f = d.createElement('iframe');
    f.src = box.dataset.src; f.title = 'Google Maps: Lage der Praxis Am Stadtweg 48, Rangsdorf';
    f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'; f.allowFullscreen = true;
    box.appendChild(f); box.classList.add('is-loaded');
  };
  let mapConsent = false; try { mapConsent = localStorage.getItem('gmap-consent') === '1'; } catch (e) {}
  maps.forEach(box => {
    if (mapConsent) loadMap(box);
    box.querySelector('[data-gmap-load]')?.addEventListener('click', () => { try { localStorage.setItem('gmap-consent', '1'); } catch (e) {} maps.forEach(loadMap); });
  });

  /* Video: erst auf Klick laden */
  d.querySelectorAll('.video').forEach(box => {
    const v = box.querySelector('video'); const play = box.querySelector('.video-play');
    if (!v || !play) return;
    play.addEventListener('click', e => { e.preventDefault(); v.setAttribute('controls', ''); v.play().then(() => box.setAttribute('data-playing', '')).catch(() => {}); });
    v.addEventListener('ended', () => box.removeAttribute('data-playing'));
  });

  /* Unter-Navigation markiert den sichtbaren Abschnitt */
  const subnav = d.querySelector('.subnav');
  if (subnav && 'IntersectionObserver' in window) {
    const links = Array.from(subnav.querySelectorAll('a[href^="#"]'));
    const targets = links.map(a => d.querySelector(a.getAttribute('href'))).filter(Boolean);
    const io2 = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { links.forEach(l => l.classList.toggle('is-current', l.getAttribute('href') === '#' + en.target.id)); } });
    }, { rootMargin: '-40% 0px -55% 0px' });
    targets.forEach(t => io2.observe(t));
  }
})();
