/* NORDHEM — comportements du site : panier, navigation, filtres, fiche produit. */
(function () {
  'use strict';

  var DATA = window.NORDHEM || { products: [], journal: [], categories: [] };
  var KEY = 'nordhem:cart';
  var SHIPPING_FREE_FROM = 200;
  var SHIPPING_COST = 8;

  /* ---------- Utilitaires ---------- */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var money = function (n) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(n);
  };

  var byId = function (id) {
    return DATA.products.filter(function (p) { return p.id === id; })[0] || null;
  };

  var escapeHtml = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ---------- Panier ---------- */
  function readCart() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(raw) ? raw.filter(function (l) { return byId(l.id); }) : [];
    } catch (e) {
      return [];
    }
  }

  function writeCart(lines) {
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch (e) { /* mode privé */ }
    renderCart();
  }

  function cartCount(lines) {
    return lines.reduce(function (n, l) { return n + l.qty; }, 0);
  }

  function cartSubtotal(lines) {
    return lines.reduce(function (n, l) {
      var p = byId(l.id);
      return n + (p ? p.price * l.qty : 0);
    }, 0);
  }

  function addToCart(id, size, qty) {
    var lines = readCart();
    var match = lines.filter(function (l) { return l.id === id && l.size === size; })[0];
    if (match) { match.qty += qty || 1; }
    else { lines.push({ id: id, size: size, qty: qty || 1 }); }
    writeCart(lines);
    openCart();
    toast('Ajouté au panier');
  }

  function updateQty(index, delta) {
    var lines = readCart();
    if (!lines[index]) return;
    lines[index].qty += delta;
    if (lines[index].qty < 1) lines.splice(index, 1);
    writeCart(lines);
  }

  function removeLine(index) {
    var lines = readCart();
    lines.splice(index, 1);
    writeCart(lines);
    toast('Article retiré');
  }

  function renderCart() {
    var lines = readCart();
    var count = cartCount(lines);

    $$('[data-cart-count]').forEach(function (el) {
      el.textContent = count;
      el.classList.toggle('is-on', count > 0);
    });

    var body = $('[data-cart-body]');
    var foot = $('[data-cart-foot]');
    if (!body) return;

    if (!lines.length) {
      body.innerHTML = '<p class="cart__empty">Votre panier est vide.<br>Le vestiaire vous attend.</p>';
      if (foot) foot.hidden = true;
      return;
    }

    body.innerHTML = lines.map(function (l, i) {
      var p = byId(l.id);
      return '<article class="cart-line">' +
        '<img src="' + p.images[0] + '" alt="' + escapeHtml(p.name) + '" loading="lazy">' +
        '<div>' +
          '<a class="cart-line__name" href="produit.html?id=' + p.id + '">' + escapeHtml(p.name) + '</a>' +
          '<p class="cart-line__meta">Taille ' + escapeHtml(l.size) + ' · ' + escapeHtml(p.color) + '</p>' +
          '<div class="cart-line__row">' +
            '<div class="qty">' +
              '<button type="button" data-qty="' + i + '" data-delta="-1" aria-label="Retirer une unité">−</button>' +
              '<span>' + l.qty + '</span>' +
              '<button type="button" data-qty="' + i + '" data-delta="1" aria-label="Ajouter une unité">+</button>' +
            '</div>' +
            '<strong>' + money(p.price * l.qty) + '</strong>' +
          '</div>' +
          '<button type="button" class="cart-line__remove" data-remove="' + i + '">Retirer</button>' +
        '</div>' +
      '</article>';
    }).join('');

    if (foot) {
      var sub = cartSubtotal(lines);
      var ship = sub >= SHIPPING_FREE_FROM ? 0 : SHIPPING_COST;
      foot.hidden = false;
      $('[data-cart-sub]', foot).textContent = money(sub);
      $('[data-cart-ship]', foot).textContent = ship === 0 ? 'Offerte' : money(ship);
      $('[data-cart-total]', foot).textContent = money(sub + ship);
      var hint = $('[data-cart-hint]', foot);
      if (hint) {
        hint.textContent = ship === 0
          ? 'Livraison offerte — expédition sous 48 h.'
          : 'Plus que ' + money(SHIPPING_FREE_FROM - sub) + ' pour la livraison offerte.';
      }
    }
  }

  /* ---------- Tiroir panier / menu / overlay ---------- */
  var lastFocus = null;

  function openCart() {
    var cart = $('[data-cart]');
    if (!cart) return;
    lastFocus = document.activeElement;
    cart.classList.add('is-open');
    cart.setAttribute('aria-hidden', 'false');
    $('[data-overlay]').classList.add('is-on');
    document.body.classList.add('is-locked');
    var close = $('[data-cart-close]');
    if (close) close.focus();
  }

  function closeCart() {
    var cart = $('[data-cart]');
    if (!cart) return;
    cart.classList.remove('is-open');
    cart.setAttribute('aria-hidden', 'true');
    $('[data-overlay]').classList.remove('is-on');
    document.body.classList.remove('is-locked');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function toggleMenu(open) {
    var nav = $('[data-mobile-nav]');
    if (!nav) return;
    nav.classList.toggle('is-open', open);
    nav.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.classList.toggle('is-locked', open);
  }

  /* ---------- Notification ---------- */
  var toastTimer;
  function toast(msg) {
    var el = $('[data-toast]');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-on'); }, 2600);
  }

  /* ---------- Fabriques de balisage ---------- */
  function cardHtml(p) {
    var second = p.images[1] || p.images[0];
    return '<article class="card reveal">' +
      '<a class="card__media" href="produit.html?id=' + p.id + '" aria-label="' + escapeHtml(p.name) + '">' +
        (p.badge ? '<span class="card__badge">' + escapeHtml(p.badge) + '</span>' : '') +
        '<img src="' + p.images[0] + '" alt="' + escapeHtml(p.name) + ' — ' + escapeHtml(p.color) + '" loading="lazy">' +
        '<img src="' + second + '" alt="" aria-hidden="true" loading="lazy">' +
      '</a>' +
      '<div class="card__quick">' +
        '<button type="button" class="btn btn--light btn--block" data-quick-add="' + p.id + '">Ajout rapide</button>' +
      '</div>' +
      '<div class="card__body">' +
        '<div>' +
          '<a class="card__name" href="produit.html?id=' + p.id + '">' + escapeHtml(p.name) + '</a>' +
          '<p class="card__sub"><span class="swatch" style="background:' + p.swatch + '"></span>' + escapeHtml(p.color) + '</p>' +
        '</div>' +
        '<span class="card__price">' + money(p.price) + '</span>' +
      '</div>' +
    '</article>';
  }

  function renderGrid(host, items) {
    if (!items.length) {
      host.innerHTML = '<p class="empty">Aucune pièce ne correspond à cette sélection.</p>';
      return;
    }
    host.innerHTML = items.map(cardHtml).join('');
    observeReveals(host);
  }

  /* ---------- Accueil ---------- */
  function mountHome() {
    var grid = $('[data-featured]');
    if (grid) {
      renderGrid(grid, DATA.products.filter(function (p) { return p.featured; }).slice(0, 4));
    }

    var posts = $('[data-journal]');
    if (posts) {
      posts.innerHTML = DATA.journal.map(function (a) {
        return '<article class="post reveal">' +
          '<img src="' + a.image + '" alt="" loading="lazy">' +
          '<span class="post__tag">' + escapeHtml(a.tag) + '</span>' +
          '<h3>' + escapeHtml(a.title) + '</h3>' +
          '<p>' + escapeHtml(a.excerpt) + '</p>' +
          '<span class="post__date">' + escapeHtml(a.date) + '</span>' +
        '</article>';
      }).join('');
      observeReveals(posts);
    }
  }

  /* ---------- Boutique ---------- */
  function mountShop() {
    var grid = $('[data-shop-grid]');
    if (!grid) return;

    var chips = $('[data-chips]');
    var sortSel = $('[data-sort]');
    var counter = $('[data-count]');
    var params = new URLSearchParams(location.search);
    var state = {
      cat: params.get('c') || 'tous',
      sort: params.get('sort') || 'defaut'
    };

    if (chips) {
      chips.innerHTML = DATA.categories.map(function (c) {
        return '<button type="button" class="chip' + (c.id === state.cat ? ' is-active' : '') +
          '" data-cat="' + c.id + '" aria-pressed="' + (c.id === state.cat) + '">' + escapeHtml(c.label) + '</button>';
      }).join('');
    }
    if (sortSel) sortSel.value = state.sort;

    function apply() {
      var items = DATA.products.filter(function (p) {
        return state.cat === 'tous' || p.category === state.cat;
      });

      if (state.sort === 'prix-asc') items.sort(function (a, b) { return a.price - b.price; });
      else if (state.sort === 'prix-desc') items.sort(function (a, b) { return b.price - a.price; });
      else if (state.sort === 'nom') items.sort(function (a, b) { return a.name.localeCompare(b.name, 'fr'); });

      renderGrid(grid, items);
      if (counter) {
        counter.textContent = items.length + (items.length > 1 ? ' pièces' : ' pièce');
      }

      var q = new URLSearchParams();
      if (state.cat !== 'tous') q.set('c', state.cat);
      if (state.sort !== 'defaut') q.set('sort', state.sort);
      var qs = q.toString();
      history.replaceState(null, '', qs ? '?' + qs : location.pathname);
    }

    if (chips) {
      chips.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-cat]');
        if (!btn) return;
        state.cat = btn.dataset.cat;
        $$('.chip', chips).forEach(function (c) {
          var on = c === btn;
          c.classList.toggle('is-active', on);
          c.setAttribute('aria-pressed', String(on));
        });
        apply();
      });
    }

    if (sortSel) {
      sortSel.addEventListener('change', function () {
        state.sort = sortSel.value;
        apply();
      });
    }

    apply();
  }

  /* ---------- Fiche produit ---------- */
  function mountProduct() {
    var host = $('[data-pdp]');
    if (!host) return;

    var id = new URLSearchParams(location.search).get('id');
    var p = byId(id) || DATA.products[0];
    if (!p) return;

    document.title = p.name + ' — NORDHEM';
    var crumb = $('[data-crumb]');
    if (crumb) crumb.textContent = p.name;

    host.innerHTML =
      '<div class="pdp__gallery">' +
        p.images.map(function (src, i) {
          return '<img src="' + src + '" alt="' + escapeHtml(p.name) + (i ? ' — détail de la matière' : '') + '"' + (i ? ' loading="lazy"' : '') + '>';
        }).join('') +
      '</div>' +
      '<div class="pdp__info">' +
        '<h1 class="pdp__title">' + escapeHtml(p.name) + '</h1>' +
        '<p class="pdp__sub">' + escapeHtml(p.subtitle) + ' · <span class="swatch" style="background:' + p.swatch + '"></span>' + escapeHtml(p.color) + '</p>' +
        '<p class="pdp__price">' + money(p.price) + '</p>' +
        '<p class="pdp__desc">' + escapeHtml(p.description) + '</p>' +
        '<div class="field">' +
          '<div class="field__label"><span>Taille</span><button type="button" data-guide>Guide des tailles</button></div>' +
          '<div class="sizes" role="group" aria-label="Choix de la taille">' +
            p.sizes.map(function (s, i) {
              return '<button type="button" class="size' + (p.sizes.length === 1 || i === 1 ? ' is-active' : '') +
                '" data-size="' + escapeHtml(s) + '" aria-pressed="' + (p.sizes.length === 1 || i === 1) + '">' + escapeHtml(s) + '</button>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<button type="button" class="btn btn--block" data-add="' + p.id + '">Ajouter au panier — ' + money(p.price) + '</button>' +
        '<div class="reassure">' +
          '<div><span>—</span><span>Livraison offerte dès ' + money(SHIPPING_FREE_FROM) + ', expédition sous 48 h.</span></div>' +
          '<div><span>—</span><span>Retours libres sous 30 jours.</span></div>' +
          '<div><span>—</span><span>Réparation à vie dans notre atelier.</span></div>' +
        '</div>' +
        '<div class="accordion">' +
          '<details open><summary>Détails</summary><div class="accordion__body"><ul>' +
            p.details.map(function (d) { return '<li>' + escapeHtml(d) + '</li>'; }).join('') +
          '</ul></div></details>' +
          '<details><summary>Matière et origine</summary><div class="accordion__body"><p>' +
            escapeHtml(p.composition) + '<br>' + escapeHtml(p.origin) + '</p></div></details>' +
          '<details><summary>Entretien</summary><div class="accordion__body"><p>' + escapeHtml(p.care) + '</p></div></details>' +
          '<details><summary>Livraison et retours</summary><div class="accordion__body"><p>Expédition sous 48 h ouvrées depuis notre entrepôt de Copenhague. Livraison offerte en France métropolitaine dès ' + money(SHIPPING_FREE_FROM) + ', sinon ' + money(SHIPPING_COST) + '. Retours gratuits sous 30 jours.</p></div></details>' +
        '</div>' +
      '</div>';

    var sizes = $$('[data-size]', host);
    var chosen = (sizes.filter(function (b) { return b.classList.contains('is-active'); })[0] || sizes[0]);
    var current = chosen ? chosen.dataset.size : p.sizes[0];

    host.addEventListener('click', function (e) {
      var sizeBtn = e.target.closest('[data-size]');
      if (sizeBtn) {
        current = sizeBtn.dataset.size;
        sizes.forEach(function (b) {
          var on = b === sizeBtn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', String(on));
        });
        return;
      }
      if (e.target.closest('[data-add]')) {
        addToCart(p.id, current, 1);
        return;
      }
      if (e.target.closest('[data-guide]')) {
        var det = $$('.accordion details', host)[0];
        if (det) { det.open = true; det.scrollIntoView({ block: 'center' }); }
        toast('Nos pièces taillent normalement.');
      }
    });

    var related = $('[data-related]');
    if (related) {
      var others = DATA.products.filter(function (o) { return o.id !== p.id; });
      var same = others.filter(function (o) { return o.category === p.category; });
      renderGrid(related, same.concat(others).filter(function (o, i, arr) {
        return arr.indexOf(o) === i;
      }).slice(0, 4));
    }
  }

  /* ---------- Apparition au défilement ---------- */
  var io = null;
  function observeReveals(root) {
    var els = $$('.reveal', root || document);
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    }
    els.forEach(function (el) { if (!el.classList.contains('is-in')) io.observe(el); });
  }

  /* ---------- Câblage global ---------- */
  function wire() {
    var header = $('[data-header]');
    if (header) {
      var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 12); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-cart-open]')) { e.preventDefault(); openCart(); return; }
      if (e.target.closest('[data-cart-close]') || e.target.closest('[data-overlay]')) { closeCart(); toggleMenu(false); return; }
      if (e.target.closest('[data-menu-open]')) { toggleMenu(true); return; }
      if (e.target.closest('[data-menu-close]')) { toggleMenu(false); return; }

      var quick = e.target.closest('[data-quick-add]');
      if (quick) {
        e.preventDefault();
        var p = byId(quick.dataset.quickAdd);
        if (p) addToCart(p.id, p.sizes[Math.min(1, p.sizes.length - 1)], 1);
        return;
      }

      var qtyBtn = e.target.closest('[data-qty]');
      if (qtyBtn) { updateQty(Number(qtyBtn.dataset.qty), Number(qtyBtn.dataset.delta)); return; }

      var rm = e.target.closest('[data-remove]');
      if (rm) { removeLine(Number(rm.dataset.remove)); return; }

      if (e.target.closest('[data-checkout]')) {
        toast('Démonstration — le paiement n’est pas connecté.');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeCart(); toggleMenu(false); }
    });

    $$('[data-newsletter]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = $('input', form);
        if (input && input.value) {
          toast('Merci — vous êtes inscrit·e.');
          form.reset();
        }
      });
    });

    var year = $('[data-year]');
    if (year) year.textContent = new Date().getFullYear();

    renderCart();
    observeReveals();
  }

  function init() {
    wire();
    mountHome();
    mountShop();
    mountProduct();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
