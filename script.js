/* =====================================================================
   NAMRITA SINGH — PORTFOLIO SCRIPT
   Features:
   1.  Lenis smooth scrolling
   2.  Navigation (scroll state, mobile drawer, active highlighting)
   3.  SQL terminal typewriter animation (hero signature element)
   4.  Scroll-reveal animations via IntersectionObserver
   5.  Skill bar animations
   6.  Education CGPA bar animations
   7.  Counting-number animations
   8.  Skills radar chart — custom SVG drawn in JavaScript
   9.  Career Gantt chart — custom SVG drawn in JavaScript
   10. Contact form handler
   ===================================================================== */

'use strict';


/* ─────────────────────────────────────────────
   1. LENIS SMOOTH SCROLL
───────────────────────────────────────────── */
let lenis = null;
try {
  lenis = new Lenis({
    duration:        1.2,
    easing:          t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth:          true,
    smoothTouch:     false,
    touchMultiplier: 2,
  });

  (function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  })(performance.now());

} catch (e) {
  console.warn('Lenis not available — using native scroll.');
}

/* Smooth anchor scrolling */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: -76, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


/* ─────────────────────────────────────────────
   2. NAVIGATION
───────────────────────────────────────────── */
const siteNav   = document.getElementById('siteNav');
const navToggle = document.getElementById('navToggle');
const navDrawer = document.getElementById('navDrawer');
const navLinks  = document.querySelectorAll('.nav-link[data-section]');
let   drawerOpen = false;

/* Scrolled state */
window.addEventListener('scroll', () => {
  siteNav.classList.toggle('is-scrolled', window.scrollY > 55);
}, { passive: true });

/* Hamburger */
navToggle.addEventListener('click', () => {
  drawerOpen = !drawerOpen;
  navToggle.classList.toggle('is-open',  drawerOpen);
  navDrawer.classList.toggle('is-open',  drawerOpen);
  navToggle.setAttribute('aria-expanded', drawerOpen);
  navDrawer.setAttribute('aria-hidden',  !drawerOpen);
  if (lenis) drawerOpen ? lenis.stop() : lenis.start();
});

document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', () => {
    drawerOpen = false;
    navToggle.classList.remove('is-open');
    navDrawer.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navDrawer.setAttribute('aria-hidden', 'true');
    if (lenis) lenis.start();
  });
});

/* Active link highlighting */
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('is-active', link.dataset.section === id);
      });
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('section[id]').forEach(s => sectionObs.observe(s));


/* ─────────────────────────────────────────────
   3. SQL TERMINAL TYPEWRITER
   The hero's signature element: the profile is
   "queried" as a SQL result set, directly
   referencing Namrita's primary skill.
───────────────────────────────────────────── */
const tCode    = document.getElementById('tCode');
const tResults = document.getElementById('tResults');
const tRows    = document.querySelectorAll('.t-row');

const sqlQuery =
`SELECT  name, role, experience, status
FROM    candidates
WHERE   expertise IN ('SQL', 'Power BI', 'Python')
  AND   cgpa >= 9.0
  AND   status = 'available';`;

let charIdx = 0;
const cursor = tCode ? tCode.querySelector('.t-cursor') : null;

function typeNextChar() {
  if (!tCode || !cursor) return;
  if (charIdx < sqlQuery.length) {
    tCode.insertBefore(document.createTextNode(sqlQuery[charIdx]), cursor);
    charIdx++;
    /* Slightly longer pause at newlines for dramatic effect */
    const ch    = sqlQuery[charIdx - 1];
    const delay = ch === '\n' ? 110 : 38 + Math.random() * 28;
    setTimeout(typeNextChar, delay);
  } else {
    cursor.remove();
    setTimeout(revealResults, 520);
  }
}

function revealResults() {
  if (!tResults) return;
  tResults.style.display = 'block';
  tRows.forEach((row, i) => {
    setTimeout(() => row.classList.add('is-visible'), i * 210 + 60);
  });
}

/* Start after hero entrance animations settle */
setTimeout(typeNextChar, 1250);


/* ─────────────────────────────────────────────
   4. SCROLL REVEAL
   Observes [data-reveal] elements and adds
   .is-visible when they enter the viewport.
   Each element type defines its own initial
   transform in CSS for directional variety.
───────────────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObs.unobserve(entry.target);
    }
  });
}, {
  threshold:  0.12,
  rootMargin: '0px 0px -36px 0px',
});

document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));


/* ─────────────────────────────────────────────
   5. SKILL BAR ANIMATIONS
   Bars animate width when the Skills section
   enters the viewport.
───────────────────────────────────────────── */
const skillsSection = document.getElementById('skills');

const skillBarObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('.sbar-fill').forEach(fill => {
      const pct = fill.dataset.pct;
      setTimeout(() => { fill.style.width = pct + '%'; }, 180);
    });
    skillBarObs.disconnect();
  }
}, { threshold: 0.25 });

if (skillsSection) skillBarObs.observe(skillsSection);


/* ─────────────────────────────────────────────
   6. EDUCATION CGPA BAR ANIMATIONS
───────────────────────────────────────────── */
const eduBarObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.edu-bar-fill');
      if (fill) setTimeout(() => { fill.style.width = fill.dataset.pct + '%'; }, 280);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.edu-item').forEach(item => eduBarObs.observe(item));


/* ─────────────────────────────────────────────
   7. COUNTING-NUMBER ANIMATIONS
───────────────────────────────────────────── */
function countUp(el, target, suffix, duration = 1350) {
  const start = performance.now();
  const run   = now => {
    const p    = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3); /* ease-out cubic */
    el.textContent = Math.floor(target * ease) + suffix;
    if (p < 1) requestAnimationFrame(run);
    else el.textContent = target + suffix; /* exact final value */
  };
  requestAnimationFrame(run);
}

const metricObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const count  = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      countUp(el, count, suffix);
      metricObs.unobserve(el);
    }
  });
}, { threshold: 0.7 });

document.querySelectorAll('[data-count]').forEach(el => metricObs.observe(el));


/* ─────────────────────────────────────────────
   8. SKILLS RADAR CHART
   Custom SVG hexagonal radar chart built
   purely in JavaScript — no charting library.
   Six axes representing Namrita's core
   analytical domains.
───────────────────────────────────────────── */
function buildRadar() {
  const svg = document.getElementById('skillRadar');
  if (!svg) return;

  const NS   = 'http://www.w3.org/2000/svg';
  const CX   = 200, CY = 200, R = 145;
  const LVLS = 4; /* concentric grid rings */

  /* Axes — label + proficiency value (0–1) */
  const axes = [
    { label: 'Data Viz',  v: 0.90 },
    { label: 'Power BI',  v: 0.88 },
    { label: 'SQL',       v: 0.85 },
    { label: 'Python',    v: 0.80 },
    { label: 'Azure',     v: 0.75 },
    { label: 'Statistics',v: 0.92 },
  ];
  const N    = axes.length;
  const step = (Math.PI * 2) / N;

  /* Convert polar → Cartesian */
  function pt(index, radius) {
    const angle = index * step - Math.PI / 2;
    return {
      x: +(CX + radius * Math.cos(angle)).toFixed(2),
      y: +(CY + radius * Math.sin(angle)).toFixed(2),
    };
  }

  function makePoly(pts, stroke, fill, fillOpacity, strokeW = 1) {
    const el = document.createElementNS(NS, 'polygon');
    el.setAttribute('points',         pts.map(p => `${p.x},${p.y}`).join(' '));
    el.setAttribute('stroke',         stroke);
    el.setAttribute('stroke-width',   strokeW);
    el.setAttribute('fill',           fill);
    el.setAttribute('fill-opacity',   fillOpacity);
    return el;
  }

  /* ── Grid rings ── */
  for (let l = 1; l <= LVLS; l++) {
    const r   = (R / LVLS) * l;
    const pts = Array.from({ length: N }, (_, i) => pt(i, r));
    svg.appendChild(makePoly(pts, 'rgba(247,244,238,.09)', 'none', 0));
  }

  /* ── Axis lines ── */
  axes.forEach((_, i) => {
    const outer = pt(i, R);
    const line  = document.createElementNS(NS, 'line');
    ['x1','y1','x2','y2'].forEach((attr, j) => {
      line.setAttribute(attr, j < 2 ? [CX, CY][j] : [outer.x, outer.y][j - 2]);
    });
    line.setAttribute('stroke',       'rgba(247,244,238,.11)');
    line.setAttribute('stroke-width', '1');
    svg.appendChild(line);
  });

  /* ── Data polygon ── */
  const dataPts  = axes.map((ax, i) => pt(i, R * ax.v));
  const dataArea = makePoly(dataPts, '#3B6FA0', '#3B6FA0', 0.17, 2);

  /* Stroke-draw animation via dashoffset trick */
  const PERIM = 1200; /* safely larger than any perimeter */
  dataArea.style.strokeDasharray  = PERIM;
  dataArea.style.strokeDashoffset = PERIM;
  dataArea.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.25,0.46,0.45,0.94) .2s';
  svg.appendChild(dataArea);

  /* ── Data-point dots ── */
  const dotGroup = document.createElementNS(NS, 'g');
  axes.forEach((ax, i) => {
    const p   = pt(i, R * ax.v);
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('cx',           p.x);
    dot.setAttribute('cy',           p.y);
    dot.setAttribute('r',            '4.5');
    dot.setAttribute('fill',         '#3B6FA0');
    dot.setAttribute('stroke',       'rgba(247,244,238,.55)');
    dot.setAttribute('stroke-width', '1.5');
    dot.style.opacity    = '0';
    dot.style.transition = `opacity .4s ease ${.55 + i * .08}s`;
    dotGroup.appendChild(dot);
  });
  svg.appendChild(dotGroup);

  /* ── Labels ── */
  axes.forEach((ax, i) => {
    const p = pt(i, R + 26);
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x',                  p.x);
    t.setAttribute('y',                  p.y);
    t.setAttribute('text-anchor',        'middle');
    t.setAttribute('dominant-baseline',  'middle');
    t.setAttribute('fill',               'rgba(247,244,238,.42)');
    t.setAttribute('font-family',        'IBM Plex Mono, monospace');
    t.setAttribute('font-size',          '10');
    t.setAttribute('letter-spacing',     '0.5');
    t.textContent = ax.label.toUpperCase();
    svg.appendChild(t);
  });

  /* ── Animate on scroll ── */
  const radarObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      dataArea.style.strokeDashoffset = '0';
      dotGroup.querySelectorAll('circle').forEach(c => { c.style.opacity = '1'; });
      radarObs.disconnect();
    }
  }, { threshold: 0.3 });

  radarObs.observe(svg);
}


/* ─────────────────────────────────────────────
   9. CAREER GANTT CHART
   Renders a Gantt-style horizontal bar chart
   showing all four Cognizant roles on a
   shared time axis. Bars animate in on scroll.
───────────────────────────────────────────── */
function buildGantt() {
  const container = document.getElementById('ganttChart');
  if (!container) return;

  const NS = 'http://www.w3.org/2000/svg';

  /* Role data — ISO date strings for precision */
  const roles = [
    { title: 'Programmer Trainee',      from: '2022-07', to: '2023-03', color: '#7A9BB8' },
    { title: 'System Engineer',         from: '2023-03', to: '2023-07', color: '#5B8DB5' },
    { title: 'Senior Systems Engineer', from: '2023-07', to: '2024-10', color: '#3B6FA0' },
    { title: 'Junior Software Engineer',from: '2024-10', to: null,      color: '#1E4D75' },
  ];

  /* Convert YYYY-MM to fractional year for positioning */
  function frac(str) {
    const [y, m] = str.split('-').map(Number);
    return y + (m - 1) / 12;
  }

  const now    = new Date();
  const nowF   = now.getFullYear() + now.getMonth() / 12;
  const minF   = frac('2022-07');
  const maxF   = nowF;
  const span   = maxF - minF;

  /* SVG coordinate space */
  const W  = 800, barH = 27, gap = 11, padTop = 6, labH = 26;
  const H  = roles.length * (barH + gap) + padTop + labH;

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('width', '100%');
  svg.setAttribute('preserveAspectRatio', 'xMinYMid meet');
  svg.style.display  = 'block';
  svg.style.overflow = 'visible';

  function xOf(f) { return +( ((f - minF) / span) * (W - 4) + 2 ).toFixed(1); }

  /* ── Year grid lines ── */
  [2023, 2024, 2025, 2026].forEach(yr => {
    const f = frac(`${yr}-01`);
    if (f < minF || f > maxF) return;
    const x = xOf(f);

    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', x); line.setAttribute('y1', padTop);
    line.setAttribute('x2', x); line.setAttribute('y2', H - labH);
    line.setAttribute('stroke',           'rgba(29,39,51,.10)');
    line.setAttribute('stroke-width',     '1');
    line.setAttribute('stroke-dasharray', '3,3');
    svg.appendChild(line);

    const lbl = document.createElementNS(NS, 'text');
    lbl.setAttribute('x',               x);
    lbl.setAttribute('y',               H - 7);
    lbl.setAttribute('text-anchor',     'middle');
    lbl.setAttribute('fill',            'rgba(29,39,51,.28)');
    lbl.setAttribute('font-family',     'IBM Plex Mono, monospace');
    lbl.setAttribute('font-size',       '9');
    lbl.textContent = yr;
    svg.appendChild(lbl);
  });

  /* ── Role bars ── */
  roles.forEach((role, i) => {
    const x1 = xOf(frac(role.from));
    const x2 = xOf(role.to ? frac(role.to) : nowF);
    const bW  = +(x2 - x1).toFixed(1);
    const y   = padTop + i * (barH + gap);

    /* Ghost track */
    const track = document.createElementNS(NS, 'rect');
    track.setAttribute('x',            x1);
    track.setAttribute('y',            y);
    track.setAttribute('width',        bW);
    track.setAttribute('height',       barH);
    track.setAttribute('rx',           '3');
    track.setAttribute('fill',         role.color);
    track.setAttribute('fill-opacity', '.12');
    svg.appendChild(track);

    /* Animated fill */
    const fill = document.createElementNS(NS, 'rect');
    fill.setAttribute('x',            x1);
    fill.setAttribute('y',            y);
    fill.setAttribute('width',        '0'); /* starts at 0 */
    fill.setAttribute('height',       barH);
    fill.setAttribute('rx',           '3');
    fill.setAttribute('fill',         role.color);
    fill.setAttribute('fill-opacity', '.78');
    fill.setAttribute('data-tw',      bW);  /* target width */
    svg.appendChild(fill);

    /* Role label inside the bar */
    const lbl = document.createElementNS(NS, 'text');
    lbl.setAttribute('x',             x1 + 9);
    lbl.setAttribute('y',             y + barH / 2 + 4);
    lbl.setAttribute('fill',          role.to ? 'rgba(29,39,51,.7)' : 'rgba(29,39,51,.88)');
    lbl.setAttribute('font-family',   'IBM Plex Mono, monospace');
    lbl.setAttribute('font-size',     '9.5');
    lbl.setAttribute('letter-spacing','0.3');
    lbl.textContent = role.title.toUpperCase();
    svg.appendChild(lbl);

    /* "NOW" indicator dot on the current role */
    if (!role.to) {
      const dot = document.createElementNS(NS, 'circle');
      dot.setAttribute('cx',           x2);
      dot.setAttribute('cy',           y + barH / 2);
      dot.setAttribute('r',            '5');
      dot.setAttribute('fill',         '#3B6FA0');
      dot.setAttribute('fill-opacity', '0.9');
      svg.appendChild(dot);
    }
  });

  container.appendChild(svg);

  /* ── Animate bars on scroll ── */
  const ganttObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      svg.querySelectorAll('rect[data-tw]').forEach((fill, i) => {
        setTimeout(() => {
          fill.style.transition = 'width 1.1s cubic-bezier(0.25,0.46,0.45,0.94)';
          fill.setAttribute('width', fill.getAttribute('data-tw'));
        }, i * 185 + 80);
      });
      ganttObs.disconnect();
    }
  }, { threshold: 0.25 });

  ganttObs.observe(container);
}


/* ─────────────────────────────────────────────
   10. CONTACT FORM HANDLER
   Replace the body of this function with a
   real submission (Formspree, EmailJS, etc.)
───────────────────────────────────────────── */
const formBtn = document.getElementById('formBtn');
if (formBtn) {
  formBtn.addEventListener('click', () => {
    const name  = (document.getElementById('fName')  || {}).value?.trim();
    const email = (document.getElementById('fEmail') || {}).value?.trim();
    const msg   = (document.getElementById('fMsg')   || {}).value?.trim();

    if (!name || !email || !msg) {
      const orig = formBtn.textContent;
      formBtn.textContent = 'Please fill all fields';
      setTimeout(() => { formBtn.textContent = orig; }, 2200);
      return;
    }

    /*
      REPLACE: Send to your backend here.
      Example (Formspree):
        const res = await fetch('https://formspree.io/f/YOUR_ID', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message: msg }),
        });
    */

    /* Placeholder success UI */
    const orig = formBtn.textContent;
    formBtn.textContent      = 'Message sent ✓';
    formBtn.style.background = '#3D9970';
    setTimeout(() => {
      formBtn.textContent      = orig;
      formBtn.style.background = '';
      ['fName','fEmail','fMsg'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
    }, 3000);
  });
}


/* ─────────────────────────────────────────────
   INIT — run chart builders on DOM ready
───────────────────────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init(); /* Already loaded */
}

function init() {
  buildRadar();
  buildGantt();
}
