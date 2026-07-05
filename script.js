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

"use strict";

function createElement(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.className) el.className = options.className;
  if (options.text) el.textContent = options.text;
  if (options.html) el.innerHTML = options.html;
  if (options.attrs) {
    Object.entries(options.attrs).forEach(([name, value]) => {
      if (value === true) {
        el.setAttribute(name, "");
      } else if (value !== false && value != null) {
        el.setAttribute(name, value);
      }
    });
  }
  return el;
}

function setText(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
}

function setHtml(id, html) {
  const element = document.getElementById(id);
  if (element) element.innerHTML = html;
}

function buildNav() {
  if (!window.siteContent?.nav) return;
  const navLinks = document.getElementById("navLinks");
  const navDrawer = document.getElementById("navDrawer");
  if (!navLinks || !navDrawer) return;

  window.siteContent.nav.forEach((item) => {
    const link = createElement("a", {
      className: `nav-link${item.classes ? ` ${item.classes}` : ""}`,
      attrs: { href: `#${item.section}`, "data-section": item.section },
      text: item.text,
    });

    navLinks.appendChild(link);

    const drawerLink = createElement("a", {
      className: "drawer-link",
      attrs: { href: `#${item.section}` },
      text: item.text,
    });
    navDrawer.appendChild(drawerLink);
  });
}

function buildHero() {
  if (!window.siteContent?.hero) return;

  setText("heroStatus", window.siteContent.hero.status);
  setText("heroNameSolid", window.siteContent.hero.name.first);
  setText("heroNameOutline", window.siteContent.hero.name.last);
  setText("heroSub", window.siteContent.hero.subtitle);

  const rowsContainer = document.getElementById("tRowsContainer");
  if (rowsContainer) {
    rowsContainer.innerHTML = "";
    window.siteContent.hero.terminal.rows.forEach((row) => {
      const rowEl = createElement("div", { className: "t-row" });
      rowEl.innerHTML = `
        <span class="t-key">${row.key}</span>
        <span class="t-arr" aria-hidden="true">→</span>
        <span class="t-val${row.active ? " t-val--active" : ""}">${row.active ? `<span class="t-active-dot" aria-hidden="true"></span>${row.value}` : row.value}</span>
      `;
      rowsContainer.appendChild(rowEl);
    });
  }

  setText("tMeta", window.siteContent.hero.terminal.meta);

  const heroCtas = document.getElementById("heroCtas");
  if (heroCtas) {
    heroCtas.innerHTML = "";
    window.siteContent.hero.ctas.forEach((cta) => {
      const attrs = { href: cta.href };
      if (cta.download) attrs.download = true;
      const button = createElement("a", {
        className: cta.classes,
        attrs,
        text: cta.text,
      });
      heroCtas.appendChild(button);
    });
  }
}

function buildAbout() {
  if (!window.siteContent?.about) return;

  setText("aboutEyebrow", window.siteContent.about.eyebrow);
  setHtml("aboutHeading", window.siteContent.about.heading);

  const aboutBio = document.getElementById("aboutBio");
  if (aboutBio) {
    aboutBio.innerHTML = "";
    window.siteContent.about.bio.forEach((paragraph, index) => {
      const p = createElement("p", {
        className: `about-bio${index === 0 ? " about-bio--lead" : ""}`,
        text: paragraph,
      });
      aboutBio.appendChild(p);
    });
  }

  const aboutMetrics = document.getElementById("aboutMetrics");
  if (aboutMetrics) {
    aboutMetrics.innerHTML = "";
    window.siteContent.about.metrics.forEach((metric) => {
      const metricEl = createElement("div", { className: "metric" });
      const num = createElement("span", {
        className: "metric-num",
        text: "",
        attrs: { "data-count": metric.count, "data-suffix": metric.suffix },
      });
      metricEl.appendChild(num);
      metricEl.appendChild(
        createElement("span", { className: "metric-lbl", text: metric.label }),
      );
      aboutMetrics.appendChild(metricEl);
    });
  }

  // (Removed about pills and small contact list per project simplification.)

  const profilePhoto = document.getElementById("profilePhoto");
  if (profilePhoto && window.siteContent.about.photo) {
    profilePhoto.src = window.siteContent.about.photo.src;
    profilePhoto.alt = window.siteContent.about.photo.alt || "";
  }
}

function buildSkills() {
  if (!window.siteContent?.skills) return;
  setText("skillRadar", "");
  const skillCats = document.getElementById("skillCats");
  if (!skillCats) return;

  skillCats.innerHTML = "";
  window.siteContent.skills.categories.forEach((category) => {
    const cat = createElement("div", {
      className: "skill-cat",
      attrs: { "data-reveal": true },
    });
    cat.appendChild(
      createElement("h3", { className: "cat-name", text: category.name }),
    );

    const tagGroup = createElement("div", { className: "cat-tags" });
    category.tags.forEach((tag) => {
      tagGroup.appendChild(
        createElement("span", {
          className: `stag${tag.level === "hi" ? " stag--hi" : ""}`,
          text: tag.text,
        }),
      );
    });
    cat.appendChild(tagGroup);

    const track = createElement("div", { className: "sbar-track" });
    track.appendChild(
      createElement("div", {
        className: "sbar-fill",
        attrs: { "data-pct": String(category.pct) },
      }),
    );
    cat.appendChild(track);
    skillCats.appendChild(cat);
  });
}

function buildExperience() {
  if (!window.siteContent?.experience) return;

  setText("ganttLabel", window.siteContent.experience.ganttLabel);
  const expList = document.getElementById("expList");
  if (!expList) return;

  expList.innerHTML = "";
  window.siteContent.experience.roles.forEach((role) => {
    const item = createElement("article", {
      className: `exp-item${role.current ? " exp-item--current" : ""}`,
      attrs: { "data-reveal": true },
    });

    item.innerHTML = `
      <div class="exp-meta">
        <time class="exp-date">${role.date}</time>
        <span class="exp-loc">${role.location}</span>
      </div>
      <div class="exp-content">
        <h3 class="exp-role">${role.title}</h3>
        <p class="exp-co">${role.company}</p>
        <p class="exp-desc">${role.desc}</p>
      </div>
    `;

    const pillGroup = createElement("div", {
      className: "pill-group pill-group--sm",
    });
    role.tags.forEach((tag) =>
      pillGroup.appendChild(
        createElement("span", { className: "pill", text: tag }),
      ),
    );
    item.querySelector(".exp-content").appendChild(pillGroup);

    expList.appendChild(item);
  });
}

function buildProjectThumb(card) {
  const thumb = createElement("div", {
    className: `proj-thumb proj-thumb--${card.type}`,
  });
  const inner = createElement("div", { className: "proj-thumb-ph" });

  if (card.image) {
    inner.classList.add("proj-thumb-ph--image");
    inner.appendChild(
      createElement("img", {
        attrs: {
          src: card.image.src,
          alt: card.image.alt || card.title,
          loading: "lazy",
        },
      }),
    );
  } else if (card.type === "sql") {
    inner.appendChild(
      createElement("span", { className: "proj-ph-label", text: card.badge }),
    );
    const bars = createElement("div", {
      className: "proj-mini-bars",
      attrs: { "aria-hidden": "true" },
    });
    [55, 82, 42, 95, 67, 78].forEach((height) => {
      bars.appendChild(
        createElement("div", { attrs: { style: `--h:${height}%` } }),
      );
    });
    inner.appendChild(bars);
  } else if (card.type === "bi") {
    inner.appendChild(
      createElement("span", { className: "proj-ph-label", text: card.badge }),
    );
    inner.appendChild(
      createElement("div", {
        className: "proj-mini-donut",
        attrs: { "aria-hidden": "true" },
      }),
    );
  } else if (card.type === "py") {
    inner.appendChild(
      createElement("span", { className: "proj-ph-label", text: card.badge }),
    );
    const svg = createElement("svg", {
      className: "proj-mini-line",
      attrs: { viewBox: "0 0 180 58", "aria-hidden": "true" },
    });
    svg.innerHTML = `
      <polyline points="0,50 28,38 56,22 84,30 112,10 140,16 168,4"
        fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" />
      <circle cx="168" cy="4" r="4" fill="currentColor" />
    `;
    inner.appendChild(svg);
  } else {
    inner.appendChild(
      createElement("span", { className: "proj-ph-label", text: card.badge }),
    );
  }

  thumb.appendChild(inner);
  thumb.appendChild(
    createElement("span", { className: "proj-badge", text: card.badge }),
  );
  return thumb;
}

function buildProjects() {
  if (!window.siteContent?.projects) return;

  const projGrid = document.getElementById("projGrid");
  if (!projGrid) return;

  projGrid.innerHTML = "";
  window.siteContent.projects.cards.forEach((card) => {
    const article = createElement("article", {
      className: `proj-card${card.type === "academic" ? " proj-card--academic" : ""}`,
      attrs: { "data-reveal": true },
    });

    if (card.type !== "academic") {
      article.appendChild(buildProjectThumb(card));
    }

    const body = createElement("div", {
      className: `proj-body${card.type === "academic" ? " proj-body--academic" : ""}`,
    });

    if (card.type === "academic") {
      body.appendChild(
        createElement("span", {
          className: "proj-badge proj-badge--inline",
          text: card.badge,
        }),
      );
    }

    body.appendChild(
      createElement("h3", { className: "proj-title", text: card.title }),
    );
    body.appendChild(
      createElement("p", { className: "proj-desc", text: card.desc }),
    );

    if (card.tags?.length) {
      const pillGroup = createElement("div", {
        className: "pill-group pill-group--sm",
      });
      card.tags.forEach((tag) =>
        pillGroup.appendChild(
          createElement("span", { className: "pill", text: tag }),
        ),
      );
      body.appendChild(pillGroup);
    }

    if (card.href) {
      const link = createElement("a", {
        className: "proj-link",
        attrs: {
          href: card.href,
          target: "_blank",
          rel: "noopener noreferrer",
        },
        text: `${card.linkText} `,
      });
      link.appendChild(
        createElement("span", { className: "proj-arr", text: "→" }),
      );
      body.appendChild(link);
    }

    article.appendChild(body);
    projGrid.appendChild(article);
  });
}

function buildEducation() {
  if (!window.siteContent?.education) return;

  const eduList = document.getElementById("eduList");
  if (eduList) {
    eduList.innerHTML = "";
    window.siteContent.education.entries.forEach((entry) => {
      const item = createElement("div", {
        className: "edu-item",
        attrs: { "data-reveal": true },
      });
      item.innerHTML = `
        <div class="edu-l">
          <time class="edu-year">${entry.year}</time>
        </div>
        <div class="edu-r">
          <h3 class="edu-degree">${entry.degree}</h3>
          <p class="edu-school">${entry.school}</p>
          <div class="edu-bar-wrap">
            <div class="edu-bar"><div class="edu-bar-fill" data-pct="${entry.pct}"></div></div>
            <span class="edu-score">${entry.score}</span>
          </div>
        </div>
      `;
      eduList.appendChild(item);
    });
  }

  const certList = document.getElementById("certList");
  if (certList) {
    certList.innerHTML = "";
    window.siteContent.education.certifications.forEach((cert) => {
      const item = createElement("div", {
        className: "cert-item",
        attrs: { "data-reveal": true },
      });
      item.innerHTML = `
        <span class="cert-icon" aria-hidden="true">◇</span>
        <div class="cert-info">
          <span class="cert-name">${cert.name}</span>
          <span class="cert-by">${cert.by}</span>
        </div>
        <span class="cert-badge">${cert.badge}</span>
      `;
      certList.appendChild(item);
    });
  }
}

function buildContact() {
  if (!window.siteContent?.contact) return;

  setText("contactEyebrow", window.siteContent.contact.eyebrow);
  setHtml("contactHeading", window.siteContent.contact.heading);
  setText("contactSub", window.siteContent.contact.subtext);

  const contactLinks = document.getElementById("contactLinks");
  if (contactLinks) {
    contactLinks.innerHTML = "";
    window.siteContent.contact.links.forEach((link) => {
      const attrs = { href: link.href };
      if (link.external) {
        attrs.target = "_blank";
        attrs.rel = "noopener noreferrer";
      }

      const anchor = createElement("a", { className: "clink", attrs });
      let iconHtml = "";
      if (link.type === "email") iconHtml = "✉";
      else if (link.type === "phone") iconHtml = "☎";
      else if (link.type === "linkedin") iconHtml = "in";
      else if (link.type === "github")
        iconHtml =
          '<svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>';
      const icon = createElement("span", {
        className:
          link.type === "github" ? "clink-icon clink-icon--svg" : "clink-icon",
        html: iconHtml,
        attrs: { "aria-hidden": "true" },
      });
      anchor.appendChild(icon);

      const body = createElement("span", { className: "clink-body" });
      body.appendChild(
        createElement("span", { className: "clink-label", text: link.label }),
      );
      body.appendChild(
        createElement("span", { className: "clink-val", text: link.value }),
      );
      anchor.appendChild(body);
      contactLinks.appendChild(anchor);
    });
  }

  const form = window.siteContent.contact.form;
  if (form) {
    const labelName = document.querySelector('label[for="fName"]');
    const labelEmail = document.querySelector('label[for="fEmail"]');
    const labelMsg = document.querySelector('label[for="fMsg"]');
    if (labelName) labelName.textContent = form.nameLabel;
    if (labelEmail) labelEmail.textContent = form.emailLabel;
    if (labelMsg) labelMsg.textContent = form.messageLabel;

    const inputName = document.getElementById("fName");
    const inputEmail = document.getElementById("fEmail");
    const inputMsg = document.getElementById("fMsg");
    if (inputName) inputName.placeholder = form.namePlaceholder;
    if (inputEmail) inputEmail.placeholder = form.emailPlaceholder;
    if (inputMsg) inputMsg.placeholder = form.messagePlaceholder;

    const button = document.getElementById("formBtn");
    if (button) button.textContent = form.buttonText;

    const note = document.querySelector(".cform-note");
    if (note) note.textContent = form.note;
  }
}

function buildFooter() {
  if (!window.siteContent?.footer) return;
  setText("footerName", window.siteContent.footer.name);
  setText("footerRole", window.siteContent.footer.role);
  setText("footerCopy", window.siteContent.footer.copyright);
}

function populateContent() {
  if (!window.siteContent) return;
  document.title = window.siteContent.meta.title;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      window.siteContent.meta.description,
    );
  }

  buildNav();
  buildHero();
  buildAbout();
  buildSkills();
  buildExperience();
  buildProjects();
  buildEducation();
  buildContact();
  buildFooter();
}

/* ─────────────────────────────────────────────
   1. LENIS SMOOTH SCROLL
───────────────────────────────────────────── */
let lenis = null;
try {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  (function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  })(performance.now());
} catch (e) {
  console.warn("Lenis not available — using native scroll.");
}

populateContent();

/* Smooth anchor scrolling */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: -76, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ─────────────────────────────────────────────
   2. NAVIGATION
───────────────────────────────────────────── */
const siteNav = document.getElementById("siteNav");
const navToggle = document.getElementById("navToggle");
const navDrawer = document.getElementById("navDrawer");
const navLinks = document.querySelectorAll(".nav-link[data-section]");
let drawerOpen = false;

/* Scrolled state */
window.addEventListener(
  "scroll",
  () => {
    siteNav.classList.toggle("is-scrolled", window.scrollY > 55);
  },
  { passive: true },
);

/* Hamburger */
navToggle.addEventListener("click", () => {
  drawerOpen = !drawerOpen;
  navToggle.classList.toggle("is-open", drawerOpen);
  navDrawer.classList.toggle("is-open", drawerOpen);
  navToggle.setAttribute("aria-expanded", drawerOpen);
  navDrawer.setAttribute("aria-hidden", !drawerOpen);
  if (lenis) drawerOpen ? lenis.stop() : lenis.start();
});

document.querySelectorAll(".drawer-link").forEach((link) => {
  link.addEventListener("click", () => {
    drawerOpen = false;
    navToggle.classList.remove("is-open");
    navDrawer.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navDrawer.setAttribute("aria-hidden", "true");
    if (lenis) lenis.start();
  });
});

/* Active link highlighting */
const sectionObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.dataset.section === id);
        });
      }
    });
  },
  { threshold: 0.4 },
);

document.querySelectorAll("section[id]").forEach((s) => sectionObs.observe(s));

/* ─────────────────────────────────────────────
   3. SQL TERMINAL TYPEWRITER
   The hero's signature element: the profile is
   "queried" as a SQL result set, directly
   referencing Namrita's primary skill.
───────────────────────────────────────────── */
const tCode = document.getElementById("tCode");
const tResults = document.getElementById("tResults");

const sqlQuery =
  window.siteContent?.hero?.terminal?.query ||
  `SELECT  name, role, experience, status
FROM    candidates
WHERE   expertise IN ('SQL', 'Power BI', 'Python')
  AND   cgpa >= 9.0
  AND   status = 'available';`;

let charIdx = 0;
const cursor = tCode ? tCode.querySelector(".t-cursor") : null;

function typeNextChar() {
  if (!tCode || !cursor) return;
  if (charIdx < sqlQuery.length) {
    tCode.insertBefore(document.createTextNode(sqlQuery[charIdx]), cursor);
    charIdx++;
    /* Slightly longer pause at newlines for dramatic effect */
    const ch = sqlQuery[charIdx - 1];
    const delay = ch === "\n" ? 110 : 38 + Math.random() * 28;
    setTimeout(typeNextChar, delay);
  } else {
    cursor.remove();
    setTimeout(revealResults, 520);
  }
}

function revealResults() {
  if (!tResults) return;
  tResults.style.display = "block";
  const rows = tResults.querySelectorAll(".t-row");
  rows.forEach((row, i) => {
    setTimeout(() => row.classList.add("is-visible"), i * 210 + 60);
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
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObs.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -36px 0px",
  },
);

document
  .querySelectorAll("[data-reveal]")
  .forEach((el) => revealObs.observe(el));

/* ─────────────────────────────────────────────
   5. SKILL BAR ANIMATIONS
   Bars animate width when the Skills section
   enters the viewport.
───────────────────────────────────────────── */
const skillsSection = document.getElementById("skills");

const skillBarObs = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll(".sbar-fill").forEach((fill) => {
        const pct = fill.dataset.pct;
        setTimeout(() => {
          fill.style.width = pct + "%";
        }, 180);
      });
      skillBarObs.disconnect();
    }
  },
  { threshold: 0.25 },
);

if (skillsSection) skillBarObs.observe(skillsSection);

/* ─────────────────────────────────────────────
   6. EDUCATION CGPA BAR ANIMATIONS
───────────────────────────────────────────── */
const eduBarObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector(".edu-bar-fill");
        if (fill)
          setTimeout(() => {
            fill.style.width = fill.dataset.pct + "%";
          }, 280);
      }
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll(".edu-item")
  .forEach((item) => eduBarObs.observe(item));

/* ─────────────────────────────────────────────
   7. COUNTING-NUMBER ANIMATIONS
───────────────────────────────────────────── */
function countUp(el, target, suffix, duration = 1350) {
  const start = performance.now();
  const run = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3); /* ease-out cubic */
    el.textContent = Math.floor(target * ease) + suffix;
    if (p < 1) requestAnimationFrame(run);
    else el.textContent = target + suffix; /* exact final value */
  };
  requestAnimationFrame(run);
}

const metricObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const count = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        countUp(el, count, suffix);
        metricObs.unobserve(el);
      }
    });
  },
  { threshold: 0.7 },
);

document
  .querySelectorAll("[data-count]")
  .forEach((el) => metricObs.observe(el));

/* ─────────────────────────────────────────────
   8. SKILLS RADAR CHART
   Custom SVG hexagonal radar chart built
   purely in JavaScript — no charting library.
   Six axes representing Namrita's core
   analytical domains.
───────────────────────────────────────────── */
function buildRadar() {
  const svg = document.getElementById("skillRadar");
  if (!svg) return;

  const NS = "http://www.w3.org/2000/svg";
  const CX = 200,
    CY = 200,
    R = 145;
  const LVLS = 4; /* concentric grid rings */

  /* Axes — label + proficiency value (0–1) */
  const axes = [
    { label: "Data Viz", v: 0.9 },
    { label: "Power BI", v: 0.88 },
    { label: "SQL", v: 0.85 },
    { label: "Python", v: 0.8 },
    { label: "Azure", v: 0.75 },
    { label: "Statistics", v: 0.92 },
  ];
  const N = axes.length;
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
    const el = document.createElementNS(NS, "polygon");
    el.setAttribute("points", pts.map((p) => `${p.x},${p.y}`).join(" "));
    el.setAttribute("stroke", stroke);
    el.setAttribute("stroke-width", strokeW);
    el.setAttribute("fill", fill);
    el.setAttribute("fill-opacity", fillOpacity);
    return el;
  }

  /* ── Grid rings ── */
  for (let l = 1; l <= LVLS; l++) {
    const r = (R / LVLS) * l;
    const pts = Array.from({ length: N }, (_, i) => pt(i, r));
    svg.appendChild(makePoly(pts, "rgba(247,244,238,.09)", "none", 0));
  }

  /* ── Axis lines ── */
  axes.forEach((_, i) => {
    const outer = pt(i, R);
    const line = document.createElementNS(NS, "line");
    ["x1", "y1", "x2", "y2"].forEach((attr, j) => {
      line.setAttribute(attr, j < 2 ? [CX, CY][j] : [outer.x, outer.y][j - 2]);
    });
    line.setAttribute("stroke", "rgba(247,244,238,.11)");
    line.setAttribute("stroke-width", "1");
    svg.appendChild(line);
  });

  /* ── Data polygon ── */
  const dataPts = axes.map((ax, i) => pt(i, R * ax.v));
  const dataArea = makePoly(dataPts, "#3B6FA0", "#3B6FA0", 0.17, 2);

  /* Stroke-draw animation via dashoffset trick */
  const PERIM = 1200; /* safely larger than any perimeter */
  dataArea.style.strokeDasharray = PERIM;
  dataArea.style.strokeDashoffset = PERIM;
  dataArea.style.transition =
    "stroke-dashoffset 1.8s cubic-bezier(0.25,0.46,0.45,0.94) .2s";
  svg.appendChild(dataArea);

  /* ── Data-point dots ── */
  const dotGroup = document.createElementNS(NS, "g");
  axes.forEach((ax, i) => {
    const p = pt(i, R * ax.v);
    const dot = document.createElementNS(NS, "circle");
    dot.setAttribute("cx", p.x);
    dot.setAttribute("cy", p.y);
    dot.setAttribute("r", "4.5");
    dot.setAttribute("fill", "#3B6FA0");
    dot.setAttribute("stroke", "rgba(247,244,238,.55)");
    dot.setAttribute("stroke-width", "1.5");
    dot.style.opacity = "0";
    dot.style.transition = `opacity .4s ease ${0.55 + i * 0.08}s`;
    dotGroup.appendChild(dot);
  });
  svg.appendChild(dotGroup);

  /* ── Labels ── */
  axes.forEach((ax, i) => {
    const p = pt(i, R + 26);
    const t = document.createElementNS(NS, "text");
    t.setAttribute("x", p.x);
    t.setAttribute("y", p.y);
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("dominant-baseline", "middle");
    t.setAttribute("fill", "rgba(247,244,238,.42)");
    t.setAttribute("font-family", "IBM Plex Mono, monospace");
    t.setAttribute("font-size", "10");
    t.setAttribute("letter-spacing", "0.5");
    t.textContent = ax.label.toUpperCase();
    svg.appendChild(t);
  });

  /* ── Animate on scroll ── */
  const radarObs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        dataArea.style.strokeDashoffset = "0";
        dotGroup.querySelectorAll("circle").forEach((c) => {
          c.style.opacity = "1";
        });
        radarObs.disconnect();
      }
    },
    { threshold: 0.3 },
  );

  radarObs.observe(svg);
}

/* ─────────────────────────────────────────────
   9. CAREER GANTT CHART
   Renders a Gantt-style horizontal bar chart
   showing all four Cognizant roles on a
   shared time axis. Bars animate in on scroll.
───────────────────────────────────────────── */
function buildGantt() {
  const container = document.getElementById("ganttChart");
  if (!container) return;

  const NS = "http://www.w3.org/2000/svg";

  /* Role data — ISO date strings for precision */
  const roles = [
    {
      title: "Programmer Trainee",
      from: "2022-07",
      to: "2023-03",
      color: "#7A9BB8",
    },
    {
      title: "System Engineer",
      from: "2023-03",
      to: "2023-07",
      color: "#5B8DB5",
    },
    {
      title: "Senior Systems Engineer",
      from: "2023-07",
      to: "2024-10",
      color: "#3B6FA0",
    },
    {
      title: "Junior Software Engineer",
      from: "2024-10",
      to: null,
      color: "#1E4D75",
    },
  ];

  /* Convert YYYY-MM to fractional year for positioning */
  function frac(str) {
    const [y, m] = str.split("-").map(Number);
    return y + (m - 1) / 12;
  }

  const now = new Date();
  const nowF = now.getFullYear() + now.getMonth() / 12;
  const minF = frac("2022-07");
  const maxF = nowF;
  const span = maxF - minF;

  /* SVG coordinate space */
  const W = 800,
    barH = 27,
    gap = 11,
    padTop = 6,
    labH = 26;
  const H = roles.length * (barH + gap) + padTop + labH;

  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("width", "100%");
  svg.setAttribute("preserveAspectRatio", "xMinYMid meet");
  svg.style.display = "block";
  svg.style.overflow = "visible";

  function xOf(f) {
    return +(((f - minF) / span) * (W - 4) + 2).toFixed(1);
  }

  /* ── Year grid lines ── */
  [2023, 2024, 2025, 2026].forEach((yr) => {
    const f = frac(`${yr}-01`);
    if (f < minF || f > maxF) return;
    const x = xOf(f);

    const line = document.createElementNS(NS, "line");
    line.setAttribute("x1", x);
    line.setAttribute("y1", padTop);
    line.setAttribute("x2", x);
    line.setAttribute("y2", H - labH);
    line.setAttribute("stroke", "rgba(29,39,51,.10)");
    line.setAttribute("stroke-width", "1");
    line.setAttribute("stroke-dasharray", "3,3");
    svg.appendChild(line);

    const lbl = document.createElementNS(NS, "text");
    lbl.setAttribute("x", x);
    lbl.setAttribute("y", H - 7);
    lbl.setAttribute("text-anchor", "middle");
    lbl.setAttribute("fill", "rgba(29,39,51,.28)");
    lbl.setAttribute("font-family", "IBM Plex Mono, monospace");
    lbl.setAttribute("font-size", "9");
    lbl.textContent = yr;
    svg.appendChild(lbl);
  });

  /* ── Role bars ── */
  roles.forEach((role, i) => {
    const x1 = xOf(frac(role.from));
    const x2 = xOf(role.to ? frac(role.to) : nowF);
    const bW = +(x2 - x1).toFixed(1);
    const y = padTop + i * (barH + gap);

    /* Ghost track */
    const track = document.createElementNS(NS, "rect");
    track.setAttribute("x", x1);
    track.setAttribute("y", y);
    track.setAttribute("width", bW);
    track.setAttribute("height", barH);
    track.setAttribute("rx", "3");
    track.setAttribute("fill", role.color);
    track.setAttribute("fill-opacity", ".12");
    svg.appendChild(track);

    /* Animated fill */
    const fill = document.createElementNS(NS, "rect");
    fill.setAttribute("x", x1);
    fill.setAttribute("y", y);
    fill.setAttribute("width", "0"); /* starts at 0 */
    fill.setAttribute("height", barH);
    fill.setAttribute("rx", "3");
    fill.setAttribute("fill", role.color);
    fill.setAttribute("fill-opacity", ".78");
    fill.setAttribute("data-tw", bW); /* target width */
    svg.appendChild(fill);

    /* Role label inside the bar */
    const lbl = document.createElementNS(NS, "text");
    lbl.setAttribute("x", x1 + 9);
    lbl.setAttribute("y", y + barH / 2 + 4);
    lbl.setAttribute(
      "fill",
      role.to ? "rgba(29,39,51,.7)" : "rgba(29,39,51,.88)",
    );
    lbl.setAttribute("font-family", "IBM Plex Mono, monospace");
    lbl.setAttribute("font-size", "9.5");
    lbl.setAttribute("letter-spacing", "0.3");
    lbl.textContent = role.title.toUpperCase();
    svg.appendChild(lbl);

    /* "NOW" indicator dot on the current role */
    if (!role.to) {
      const dot = document.createElementNS(NS, "circle");
      dot.setAttribute("cx", x2);
      dot.setAttribute("cy", y + barH / 2);
      dot.setAttribute("r", "5");
      dot.setAttribute("fill", "#3B6FA0");
      dot.setAttribute("fill-opacity", "0.9");
      svg.appendChild(dot);
    }
  });

  container.appendChild(svg);

  /* ── Animate bars on scroll ── */
  const ganttObs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        svg.querySelectorAll("rect[data-tw]").forEach((fill, i) => {
          setTimeout(
            () => {
              fill.style.transition =
                "width 1.1s cubic-bezier(0.25,0.46,0.45,0.94)";
              fill.setAttribute("width", fill.getAttribute("data-tw"));
            },
            i * 185 + 80,
          );
        });
        ganttObs.disconnect();
      }
    },
    { threshold: 0.25 },
  );

  ganttObs.observe(container);
}

/* ─────────────────────────────────────────────
   10. CONTACT FORM HANDLER
   Replace the body of this function with a
   real submission (Formspree, EmailJS, etc.)
───────────────────────────────────────────── */
const formBtn = document.getElementById("formBtn");
if (formBtn) {
  formBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const name = (document.getElementById("fName") || {}).value?.trim();
    const email = (document.getElementById("fEmail") || {}).value?.trim();
    const msg = (document.getElementById("fMsg") || {}).value?.trim();

    if (!name || !email || !msg) {
      const orig = formBtn.textContent;
      formBtn.textContent = "Please fill all fields";
      setTimeout(() => {
        formBtn.textContent = orig;
      }, 2200);
      return;
    }

    const orig = formBtn.textContent;
    formBtn.disabled = true;
    formBtn.textContent = "Sending…";

    try {
      const res = await fetch("https://formspree.io/f/mwvdynya", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, message: msg }),
      });

      if (res.ok) {
        formBtn.textContent = "Message sent ✓";
        formBtn.style.background = "#3D9970";
        setTimeout(() => {
          formBtn.textContent = orig;
          formBtn.style.background = "";
          formBtn.disabled = false;
          ["fName", "fEmail", "fMsg"].forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.value = "";
          });
        }, 3000);
      } else {
        // Try to read error info
        let errMsg = "Submission failed";
        try {
          const data = await res.json();
          if (data && data.error) errMsg = data.error;
        } catch (err) {}
        formBtn.textContent = errMsg;
        formBtn.style.background = "#D9534F";
        setTimeout(() => {
          formBtn.textContent = orig;
          formBtn.style.background = "";
          formBtn.disabled = false;
        }, 3200);
      }
    } catch (err) {
      formBtn.textContent = "Submission failed";
      formBtn.style.background = "#D9534F";
      setTimeout(() => {
        formBtn.textContent = orig;
        formBtn.style.background = "";
        formBtn.disabled = false;
      }, 3200);
    }
  });
}

/* ─────────────────────────────────────────────
   INIT — run chart builders on DOM ready
───────────────────────────────────────────── */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init(); /* Already loaded */
}

function init() {
  buildRadar();
  buildGantt();
}
