# NORDHEM — site de vêtements premium scandinave

Site vitrine et boutique pour une marque de vêtements haut de gamme d'inspiration
scandinave. Statique, sans build, sans dépendance : on ouvre les fichiers et ça marche.

![Accueil](assets/img/editorial/hero.svg)

## Ce que contient le site

| Page | Fichier | Contenu |
| --- | --- | --- |
| Accueil | `index.html` | Hero plein écran, l'édit de la saison, piliers de marque, lookbook, journal, infolettre |
| Boutique | `boutique.html` | Grille de 12 produits, filtres par catégorie, tri, état reflété dans l'URL |
| Fiche produit | `produit.html?id=…` | Galerie, choix de taille, ajout au panier, accordéons matière / entretien / livraison, pièces associées |
| La maison | `maison.html` | Histoire, chiffres clés, matières, atelier de réparation, repères chronologiques |

Fonctionnalités transverses : panier persistant (`localStorage`) avec tiroir latéral,
calcul de la livraison (offerte dès 200 €), menu mobile plein écran, apparition des blocs
au défilement, notifications discrètes, navigation au clavier et touche `Échap`.

## Lancer en local

Un serveur statique suffit — les pages lisent des paramètres d'URL, donc ouvrir les
fichiers en `file://` fonctionne moins bien.

```bash
python3 -m http.server 8899
# puis http://localhost:8899
```

## Structure

```
index.html  boutique.html  produit.html  maison.html
assets/
  css/style.css        feuille de style unique, organisée en 9 sections
  js/data.js           catalogue : produits, journal, catégories
  js/app.js            panier, filtres, fiche produit, interactions
  img/products/        illustrations produit (SVG)
  img/fabric/          gros plans matière (SVG)
  img/editorial/       hero, lookbook, journal (SVG)
tools/
  generate-assets.sh   régénère toutes les illustrations SVG
  smoke-test.js        test de bout en bout (Playwright)
```

## Personnaliser

**Ajouter ou modifier un produit** — tout part de `assets/js/data.js`. Un objet produit
suffit ; les pages boutique, fiche produit et panier s'alimentent à cette source.

```js
{
  id: 'hallstad',              // sert d'URL : produit.html?id=hallstad
  name: 'Pull Hallstad',
  price: 245,
  category: 'mailles',         // doit exister dans la liste `categories`
  color: 'Écru', swatch: '#D8CFBE',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  images: ['assets/img/products/hallstad.svg', 'assets/img/fabric/hallstad.svg'],
  featured: true               // remonte sur la page d'accueil
}
```

**Changer la palette ou la typographie** — les jetons sont regroupés en tête de
`assets/css/style.css`, dans `:root` (couleurs, polices, rythme vertical, gouttières).

**Remplacer les visuels** — les illustrations sont générées par
`bash tools/generate-assets.sh`. Pour passer à de vraies photographies, il suffit de
déposer les fichiers dans `assets/img/` et de mettre à jour les chemins dans `data.js`
et dans les pages ; le ratio attendu est 4/5 pour les produits, 3/4 pour le lookbook.

**Seuil de livraison offerte** — constantes `SHIPPING_FREE_FROM` et `SHIPPING_COST`
en haut de `assets/js/app.js`.

## Tests

```bash
npm install --no-save playwright
python3 -m http.server 8899 &
node tools/smoke-test.js
```

Le test couvre l'ajout au panier avec la taille retenue, le recalcul des totaux et de la
livraison, la persistance entre les pages, les filtres et le tri, les liens profonds, la
suppression d'une ligne, la fermeture au clavier et l'absence de débordement horizontal
sur mobile.

## Déploiement

Le site est entièrement statique : n'importe quel hébergeur de fichiers convient
(GitHub Pages, Netlify, Vercel, un simple bucket). Aucune étape de build.

## À savoir

Le paiement n'est pas branché : le bouton « Passer commande » affiche une notification de
démonstration. Le formulaire d'infolettre ne fait pas d'appel réseau non plus. Les polices
(Instrument Serif, Inter) sont chargées depuis Google Fonts, avec des polices système en
repli si le réseau est indisponible.
