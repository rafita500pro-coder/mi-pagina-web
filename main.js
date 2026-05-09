/* ============================================================
   STEPSTYLE — main.js
   Cursor, navbar, scroll, FAQ, contador, formulario,
   galería, dark mode, toast, menú móvil.
   ============================================================ */

'use strict';

/* ── Helpers ─────────────────────────────────────── */
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

/* ══════════════════════════════════════════════════
   1. CURSOR PERSONALIZADO
   ══════════════════════════════════════════════════ */
(function initCursor() {
  const dot  = $('#cursor-dot');
  const ring = $('#cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0, raf;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animate() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    raf = requestAnimationFrame(animate);
  }
  raf = requestAnimationFrame(animate);

  // Expandir en hover sobre elementos interactivos
  const hoverEls = 'a, button, .product-card, .category-tab, .price-card';
  $$(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('expanded'));
    el.addEventListener('mouseleave', () => ring.classList.remove('expanded'));
  });
})();

/* ══════════════════════════════════════════════════
   2. NAVBAR — scroll y menú móvil
   ══════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar   = $('#navbar');
  const menuBtn  = $('#menu-toggle');
  const mobileM  = $('#mobile-menu');
  const closeBtn = $('#menu-close');

  // Clase "scrolled"
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú hamburguesa
  const openMenu  = () => { mobileM.classList.add('open');  document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { mobileM.classList.remove('open'); document.body.style.overflow = ''; };

  menuBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);

  // Cerrar al hacer click en un link del menú móvil
  $$('.mobile-nav-link').forEach(l => l.addEventListener('click', closeMenu));

  // Cerrar presionando Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
})();

/* ══════════════════════════════════════════════════
   3. SCROLL REVEAL
   ══════════════════════════════════════════════════ */
(function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  $$('.reveal').forEach(el => io.observe(el));
})();

/* ══════════════════════════════════════════════════
   4. DARK MODE TOGGLE
   ══════════════════════════════════════════════════ */
(function initDarkMode() {
  const btn = $('#theme-toggle');
  const saved = localStorage.getItem('ss-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  btn?.addEventListener('click', () => {
    const curr = document.documentElement.getAttribute('data-theme');
    const next = curr === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ss-theme', next);
  });
})();

/* ══════════════════════════════════════════════════
   5. CONTADOR DE ESTADÍSTICAS
   ══════════════════════════════════════════════════ */
(function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  function animateCount(el) {
    const target  = parseInt(el.dataset.count, 10);
    const suffix  = el.dataset.suffix || '';
    const dur     = 1800;
    const start   = performance.now();

    function step(ts) {
      const pct  = Math.min((ts - start) / dur, 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      el.textContent = Math.round(target * ease) + suffix;
      if (pct < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
})();

/* ══════════════════════════════════════════════════
   6. FAQ ACORDEÓN
   ══════════════════════════════════════════════════ */
(function initFAQ() {
  $$('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Cerrar todos
      $$('.faq-item.open').forEach(op => {
        op.classList.remove('open');
        op.querySelector('.faq-answer').classList.remove('open');
      });

      // Abrir el actual si estaba cerrado
      if (!isOpen) {
        item.classList.add('open');
        answer.classList.add('open');
      }
    });
  });
})();

/* ══════════════════════════════════════════════════
   7. TABS DE PRODUCTOS
   ══════════════════════════════════════════════════ */
(function initProductTabs() {
  const tabs  = $$('.category-tab');
  const cards = $$('.product-card[data-category]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.category;
      cards.forEach(c => {
        const visible = cat === 'all' || c.dataset.category === cat;
        c.style.display = visible ? '' : 'none';
        if (visible) {
          c.style.animation = 'none';
          requestAnimationFrame(() => {
            c.style.animation = '';
            c.classList.remove('reveal');
            c.classList.add('reveal','visible');
          });
        }
      });
    });
  });
})();

/* ══════════════════════════════════════════════════
   8. FORMULARIO DE CONTACTO — validación
   ══════════════════════════════════════════════════ */
(function initForm() {
  const form = $('#contact-form');
  if (!form) return;

  const rules = {
    name:    { min: 2, msg: 'El nombre debe tener al menos 2 caracteres.' },
    email:   { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: 'Ingresa un correo electrónico válido.' },
    phone:   { pattern: /^\+?[\d\s\-()]{7,}$/, msg: 'Número de teléfono inválido.', optional: true },
    subject: { min: 1, msg: 'Selecciona un asunto.' },
    message: { min: 10, msg: 'El mensaje debe tener al menos 10 caracteres.' },
  };

  function validate(field) {
    const el  = form.elements[field];
    const err = form.querySelector(`[data-error="${field}"]`);
    if (!el || !err) return true;

    const r = rules[field];
    let valid = true;

    if (r.optional && !el.value.trim()) {
      // campo opcional vacío → ok
    } else if (r.pattern && !r.pattern.test(el.value.trim())) {
      valid = false;
    } else if (r.min && el.value.trim().length < r.min) {
      valid = false;
    }

    el.classList.toggle('error', !valid);
    err.textContent = valid ? '' : r.msg;
    err.classList.toggle('show', !valid);
    return valid;
  }

  // Validar en blur
  Object.keys(rules).forEach(f => {
    const el = form.elements[f];
    el?.addEventListener('blur', () => validate(f));
    el?.addEventListener('input', () => validate(f));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const allValid = Object.keys(rules).map(f => validate(f)).every(Boolean);
    if (!allValid) return;

    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando…';

    // Simulación de envío
    setTimeout(() => {
      showToast('¡Mensaje enviado! Te contactaremos pronto. ✓');
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Enviar mensaje';
    }, 1800);
  });
})();

/* ══════════════════════════════════════════════════
   9. TOAST NOTIFICATION
   ══════════════════════════════════════════════════ */
function showToast(msg, dur = 3200) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), dur);
}

/* ══════════════════════════════════════════════════
   10. BOTÓN "AÑADIR AL CARRITO" (demo)
   ══════════════════════════════════════════════════ */
(function initCart() {
  $$('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = btn.closest('.product-card')?.querySelector('.product-name')?.textContent || 'Producto';
      showToast(`${name} añadido al carrito ✓`);
    });
  });
})();

/* ══════════════════════════════════════════════════
   11. GALERÍA — LIGHTBOX SENCILLO
   ══════════════════════════════════════════════════ */
(function initLightbox() {
  const lb   = $('#lightbox');
  const lbImg = $('#lightbox-img');
  if (!lb) return;

  $$('.gallery-item[data-src]').forEach(item => {
    item.addEventListener('click', () => {
      lbImg.src = item.dataset.src;
      lb.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  lb.addEventListener('click', () => {
    lb.style.display = 'none';
    document.body.style.overflow = '';
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lb.style.display === 'flex') {
      lb.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
})();

/* ══════════════════════════════════════════════════
   12. HERO PARALLAX SUTIL
   ══════════════════════════════════════════════════ */
(function initParallax() {
  const hero = $('#hero');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const img = hero.querySelector('.hero-parallax-img');
    if (img) img.style.transform = `translateY(${y * 0.15}px)`;
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════
   13. SMOOTH SCROLL para links internos
   ══════════════════════════════════════════════════ */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id  = a.getAttribute('href');
    const el  = $(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
