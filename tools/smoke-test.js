/*
 * Test de fumée du site NORDHEM.
 * Prérequis :
 *   npm install --no-save playwright
 *   python3 -m http.server 8899   (depuis la racine du dépôt)
 * Lancement :
 *   node tools/smoke-test.js
 * Variables d'environnement facultatives : BASE_URL, CHROMIUM_PATH
 */
const { chromium } = require('playwright');
const BASE = process.env.BASE_URL || 'http://localhost:8899';
let failed = 0;
const assert = (c, m) => { if (!c) failed++; console.log((c ? '  OK   ' : '  ÉCHEC ') + m); };
(async () => {
  const launch = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
  const b = await chromium.launch(launch);
  const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));

  console.log('\n— Panier —');
  await p.goto(BASE + '/produit.html?id=hallstad', { waitUntil: 'load' });
  await p.click('[data-size="L"]');
  await p.click('[data-add]');
  await p.waitForTimeout(700);
  assert(await p.isVisible('.cart.is-open'), 'le tiroir s\'ouvre après ajout');
  assert((await p.textContent('[data-cart-count]')) === '1', 'compteur = 1');
  assert((await p.textContent('.cart-line__meta')).includes('Taille L'), 'la taille choisie est retenue');
  assert((await p.textContent('[data-cart-sub]')).includes('245'), 'sous-total = 245 €');
  assert((await p.textContent('[data-cart-ship]')) === 'Offerte', 'livraison offerte au-dessus de 200 €');

  await p.click('[data-qty="0"][data-delta="1"]');
  await p.waitForTimeout(300);
  assert((await p.textContent('[data-cart-count]')) === '2', 'incrément quantité');
  assert((await p.textContent('[data-cart-total]')).includes('490'), 'total recalculé');

  console.log('\n— Persistance —');
  await p.goto(BASE + '/boutique.html', { waitUntil: 'load' });
  await p.waitForTimeout(400);
  assert((await p.textContent('[data-cart-count]')) === '2', 'panier conservé entre les pages');

  console.log('\n— Filtres —');
  await p.click('[data-cat="manteaux"]');
  await p.waitForTimeout(400);
  const n = await p.locator('[data-shop-grid] .card').count();
  assert(n === 2, 'filtre « manteaux » → 2 pièces (obtenu ' + n + ')');
  assert(p.url().includes('c=manteaux'), 'URL synchronisée : ' + p.url());
  await p.selectOption('[data-sort]', 'prix-asc');
  await p.waitForTimeout(400);
  const prices = await p.locator('.card__price').allTextContents();
  assert(prices[0].includes('520'), 'tri prix croissant : ' + prices.join(' / '));

  console.log('\n— Lien profond —');
  await p.goto(BASE + '/boutique.html?c=mailles', { waitUntil: 'load' });
  await p.waitForTimeout(400);
  assert((await p.locator('[data-shop-grid] .card').count()) === 2, 'filtre appliqué depuis l\'URL');
  assert(await p.isVisible('.chip.is-active:text("Mailles")'), 'puce active correcte');

  console.log('\n— Ajout rapide + suppression —');
  await p.hover('.card');
  await p.click('[data-quick-add]');
  await p.waitForTimeout(600);
  const before = Number(await p.textContent('[data-cart-count]'));
  await p.click('[data-remove="0"]');
  await p.waitForTimeout(400);
  assert(Number(await p.textContent('[data-cart-count]')) < before, 'suppression d\'une ligne');
  await p.keyboard.press('Escape');
  await p.waitForTimeout(600);
  assert(!(await p.isVisible('.cart.is-open')), 'Échap ferme le tiroir');

  console.log('\n— Fiche produit inconnue —');
  await p.goto(BASE + '/produit.html?id=nexistepas', { waitUntil: 'load' });
  await p.waitForTimeout(300);
  assert(await p.isVisible('.pdp__title'), 'repli sur un produit valide');

  console.log('\n— Mobile —');
  const m = await b.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await m.newPage();
  mp.on('pageerror', e => errs.push('mobile: ' + e.message));
  await mp.goto(BASE + '/index.html', { waitUntil: 'load' });
  await mp.click('[data-menu-open]');
  await mp.waitForTimeout(700);
  assert(await mp.isVisible('.mobile-nav.is-open'), 'menu mobile ouvert');
  const overflow = await mp.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
  assert(overflow, 'aucun débordement horizontal');
  await mp.click('[data-menu-close]');
  await mp.waitForTimeout(600);
  assert(!(await mp.isVisible('.mobile-nav.is-open')), 'menu mobile fermé');

  console.log('\nErreurs JS : ' + (errs.length ? errs.join(' | ') : 'aucune'));
  await b.close();
  console.log(failed || errs.length ? '\n' + (failed + errs.length) + ' problème(s).' : '\nTout est vert.');
  process.exit(failed || errs.length ? 1 : 0);
})();
