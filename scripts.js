/* ============================================================
   MINILINE — scripts.js
   WP: enqueue via wp_enqueue_script('miniline-main', ...)
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Header shadow on scroll --- */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* --- Mobile nav --- */
  const burger    = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const navClose  = document.getElementById('navClose');

  function openNav() {
    mobileNav.classList.add('open');
    burger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    mobileNav.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (burger)    burger.addEventListener('click', openNav);
  if (navClose)  navClose.addEventListener('click', closeNav);
  if (mobileNav) mobileNav.addEventListener('click', e => { if (e.target === mobileNav) closeNav(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  /* --- Wishlist toggle (product cards) --- */
  document.querySelectorAll('.product-card__wish').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const liked = btn.textContent === '♥';
      btn.textContent = liked ? '♡' : '♥';
      btn.style.color  = liked ? '' : '#e05555';
    });
  });

  /* ============================================================
     SHOP PAGE — filters
  ============================================================ */

  /* Filter group accordion */
  document.querySelectorAll('.filter-group__toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.filter-group');
      const body  = group.querySelector('.filter-group__body');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      body.hidden = expanded;
    });
  });

  /* Size filter toggle */
  document.querySelectorAll('.filter-size').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('filter-size--active'));
  });

  /* Color filter toggle */
  document.querySelectorAll('.filter-color').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('filter-color--active'));
  });

  /* Clear all filters */
  const clearBtn = document.getElementById('clearAllFilters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      document.querySelectorAll('.filter-size').forEach(b => b.classList.remove('filter-size--active'));
      document.querySelectorAll('.filter-color').forEach(b => b.classList.remove('filter-color--active'));
      document.querySelectorAll('.filter-checkbox input, .filter-radio input').forEach(i => {
        if (i.value === 'all' || i.value === 'default') i.checked = true;
        else i.checked = false;
      });
    });
  }

  /* Mobile filter panel */
  const mobileFilterBtn = document.getElementById('mobileFilterBtn');
  const filterSidebar   = document.getElementById('filterSidebar');
  const filterOverlay   = document.getElementById('filterOverlay');

  function openFilters() {
    filterSidebar?.classList.add('filter-sidebar--open');
    filterOverlay?.classList.add('filter-overlay--show');
    document.body.style.overflow = 'hidden';
  }
  function closeFilters() {
    filterSidebar?.classList.remove('filter-sidebar--open');
    filterOverlay?.classList.remove('filter-overlay--show');
    document.body.style.overflow = '';
  }

  mobileFilterBtn?.addEventListener('click', openFilters);
  filterOverlay?.addEventListener('click', closeFilters);

  /* ============================================================
     PRODUCT PAGE
  ============================================================ */

  /* Gallery thumbnails */
  document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('gallery-thumb--active'));
      thumb.classList.add('gallery-thumb--active');
      const mainImg = document.getElementById('galleryMain');
      if (mainImg) mainImg.src = thumb.dataset.src;
    });
  });

  /* Size selector */
  document.querySelectorAll('.product-size').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      document.querySelectorAll('.product-size').forEach(b => b.classList.remove('product-size--active'));
      btn.classList.add('product-size--active');
      const label = document.getElementById('selectedSize');
      if (label) label.textContent = btn.dataset.size;
    });
  });

  /* Color selector */
  document.querySelectorAll('.product-color').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.product-color').forEach(b => b.classList.remove('product-color--active'));
      btn.classList.add('product-color--active');
    });
  });

  /* Quantity */
  function initQty(minusId, plusId, inputId) {
    const minus = document.getElementById(minusId);
    const plus  = document.getElementById(plusId);
    const input = document.getElementById(inputId);
    if (!minus || !plus || !input) return;
    minus.addEventListener('click', () => { if (+input.value > 1) input.value = +input.value - 1; });
    plus.addEventListener('click',  () => { if (+input.value < 99) input.value = +input.value + 1; });
  }
  initQty('qtyMinus', 'qtyPlus', 'qtyInput');

  /* Product wishlist */
  const productWish = document.getElementById('productWish');
  if (productWish) {
    productWish.addEventListener('click', () => {
      const liked = productWish.textContent === '♥';
      productWish.textContent = liked ? '♡' : '♥';
      productWish.style.color  = liked ? '' : '#e05555';
    });
  }

  /* Product tabs */
  document.querySelectorAll('.product-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.product-tab-btn').forEach(b => b.classList.remove('product-tab-btn--active'));
      document.querySelectorAll('.product-tab-panel').forEach(p => p.hidden = true);
      btn.classList.add('product-tab-btn--active');
      const panel = document.getElementById('tab-' + tab);
      if (panel) panel.hidden = false;
    });
  });

  /* ============================================================
     CART PAGE
  ============================================================ */
  document.querySelectorAll('.cart-qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.product-qty').querySelector('input');
      if (+input.value > 1) input.value = +input.value - 1;
    });
  });
  document.querySelectorAll('.cart-qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.product-qty').querySelector('input');
      if (+input.value < 99) input.value = +input.value + 1;
    });
  });
  document.querySelectorAll('.cart-item__remove').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.cart-item')?.remove();
    });
  });

  /* ============================================================
     ACCOUNT PAGE — tab between login/register handled by CSS
  ============================================================ */
  const authLayout      = document.getElementById('authLayout');
  const accountDashboard = document.getElementById('accountDashboard');

  /* Demo: click login submits shows dashboard */
  document.getElementById('loginForm')?.addEventListener('submit', e => {
    e.preventDefault();
    if (authLayout)       authLayout.hidden = true;
    if (accountDashboard) accountDashboard.hidden = false;
  });

  /* Password visibility toggle */
  document.querySelectorAll('.form-eye').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  });

  /* ============================================================
     DELIVERY PAGE — accordion
  ============================================================ */
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item     = btn.closest('.accordion-item');
      const body     = item.querySelector('.accordion-body');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      body.hidden = expanded;
    });
  });

  /* Content nav smooth highlight */
  document.querySelectorAll('.content-nav__link').forEach(link => {
    link.addEventListener('click', e => {
      document.querySelectorAll('.content-nav__link').forEach(l => l.classList.remove('content-nav__link--active'));
      link.classList.add('content-nav__link--active');
    });
  });

});
