/* Catalogue NORDHEM — source unique de vérité pour toutes les pages. */
window.NORDHEM = (function () {
  const P = 'assets/img/products/';
  const F = 'assets/img/fabric/';

  const products = [
    {
      id: 'hallstad',
      name: 'Pull Hallstad',
      subtitle: 'Laine mérinos filée en Norvège',
      price: 245,
      category: 'mailles',
      gender: 'unisexe',
      color: 'Écru',
      swatch: '#D8CFBE',
      badge: 'Pièce signature',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      images: [P + 'hallstad.svg', F + 'hallstad.svg'],
      composition: '100 % laine mérinos extra-fine (18,5 microns)',
      care: 'Lavage à la main à froid. Séchage à plat. Ne pas tordre.',
      origin: 'Tricoté à Bergen, Norvège',
      description:
        "Une maille dense et régulière, tricotée en jauge 12 pour tenir sa forme saison après saison. L'encolure ronde est remaillée à la main, les côtes sont doublées aux poignets et à la base. Le mérinos, filé à moins de 19 microns, ne gratte pas et régule la chaleur.",
      details: [
        'Coupe droite, épaules légèrement tombantes',
        'Encolure remaillée main, côtes 2×2',
        'Tricoté en une seule pièce, sans couture latérale'
      ],
      featured: true
    },
    {
      id: 'rorvik',
      name: 'Manteau Rørvik',
      subtitle: 'Drap de laine double face',
      price: 690,
      category: 'manteaux',
      gender: 'femme',
      color: 'Ardoise',
      swatch: '#4A4E4C',
      badge: 'Édition limitée',
      sizes: ['34', '36', '38', '40', '42'],
      images: [P + 'rorvik.svg', F + 'rorvik.svg'],
      composition: '82 % laine vierge, 18 % cachemire',
      care: 'Nettoyage à sec uniquement. Brosser dans le sens du poil.',
      origin: 'Confectionné au Portugal',
      description:
        "Un drap double face de 780 g tissé en Italie, assemblé sans doublure : les deux faces sont finies à la main, bord à bord. La coupe tombe droit depuis l'épaule et s'arrête sous le genou.",
      details: [
        'Col tailleur, revers cranté',
        'Deux poches passepoilées à hauteur de main',
        'Bords assemblés à la main, sans doublure'
      ],
      featured: true
    },
    {
      id: 'alesund',
      name: 'Chemise Ålesund',
      subtitle: 'Lin lavé européen',
      price: 165,
      category: 'chemises',
      gender: 'unisexe',
      color: 'Craie',
      swatch: '#EFE9DE',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      images: [P + 'alesund.svg', F + 'alesund.svg'],
      composition: '100 % lin lavé (Normandie)',
      care: 'Lavage machine 30°. Repassage doux si nécessaire.',
      origin: 'Confectionnée en Lituanie',
      description:
        "Un lin cultivé en Normandie, tissé puis lavé à la pierre pour obtenir ce tombé souple dès la première mise. La chemise se porte fermée, ouverte sur un tee-shirt, ou en surchemise légère.",
      details: [
        'Col italien légèrement ouvert',
        'Boutons en corozo naturel',
        'Coutures anglaises, 8 points par centimètre'
      ],
      featured: true
    },
    {
      id: 'vestby',
      name: 'Pantalon Vestby',
      subtitle: 'Laine froide, taille haute',
      price: 210,
      category: 'pantalons',
      gender: 'unisexe',
      color: 'Encre',
      swatch: '#3A3B38',
      sizes: ['34', '36', '38', '40', '42', '44'],
      images: [P + 'vestby.svg', F + 'vestby.svg'],
      composition: '96 % laine vierge, 4 % élasthanne',
      care: 'Nettoyage à sec. Repassage sur l\'envers.',
      origin: 'Confectionné au Portugal',
      description:
        "Une laine froide au tombé net, coupée droite depuis une taille haute. Le pli marqué structure la jambe sans la raidir. Se porte du bureau au dîner sans changer de registre.",
      details: [
        'Taille haute, ceinture doublée',
        'Pli permanent marqué à la vapeur',
        'Ourlet non fini, à ajuster à votre hauteur'
      ],
      featured: true
    },
    {
      id: 'solvig',
      name: 'Robe Sölvig',
      subtitle: 'Midi, coupe fluide',
      price: 295,
      category: 'robes',
      gender: 'femme',
      color: 'Argile',
      swatch: '#8E8577',
      sizes: ['34', '36', '38', '40', '42'],
      images: [P + 'solvig.svg', F + 'solvig.svg'],
      composition: '70 % viscose de bambou, 30 % lin',
      care: 'Lavage à la main à froid. Séchage sur cintre.',
      origin: 'Confectionnée au Portugal',
      description:
        "Une robe qui tient debout toute seule : découpe à la taille, jupe légèrement évasée, longueur mollet. Le mélange bambou-lin donne un tombé lourd et mat, sans brillance.",
      details: [
        'Découpe taille, jupe évasée',
        'Longueur 118 cm en taille 38',
        'Sans doublure, tissu opaque'
      ],
      featured: false
    },
    {
      id: 'nordmark',
      name: 'Écharpe Nordmark',
      subtitle: 'Alpaga brossé',
      price: 120,
      category: 'accessoires',
      gender: 'unisexe',
      color: 'Avoine',
      swatch: '#C2B49C',
      sizes: ['Taille unique'],
      images: [P + 'nordmark.svg', F + 'nordmark.svg'],
      composition: '70 % alpaga bébé, 30 % laine mérinos',
      care: 'Aérer plutôt que laver. Nettoyage à sec si nécessaire.',
      origin: 'Tissée au Pérou',
      description:
        "Deux mètres d'alpaga bébé brossé à la main, franges nouées une à une. Assez large pour se porter en étole, assez légère pour rester nouée toute la journée.",
      details: ['200 × 45 cm', 'Franges nouées à la main', 'Brossage double face'],
      featured: true
    },
    {
      id: 'bjorka',
      name: 'Cardigan Bjørka',
      subtitle: 'Côtes anglaises',
      price: 265,
      category: 'mailles',
      gender: 'unisexe',
      color: 'Mousse',
      swatch: '#6E7468',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      images: [P + 'bjorka.svg', F + 'bjorka.svg'],
      composition: '60 % laine mérinos, 40 % coton biologique',
      care: 'Lavage à la main à froid. Séchage à plat.',
      origin: 'Tricoté au Portugal',
      description:
        "Un cardigan de mi-saison en côtes anglaises, assez ample pour passer sur une chemise. Les boutons en corne sont cousus sur une patte renforcée qui ne se déforme pas.",
      details: ['Côtes anglaises 3 mm', 'Boutons en corne véritable', 'Poches plaquées basses'],
      featured: false
    },
    {
      id: 'kvarn',
      name: 'Trench Kvarn',
      subtitle: 'Coton égyptien déperlant',
      price: 520,
      category: 'manteaux',
      gender: 'unisexe',
      color: 'Sable',
      swatch: '#BFAE93',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      images: [P + 'kvarn.svg', F + 'kvarn.svg'],
      composition: '100 % coton égyptien, traitement déperlant sans PFC',
      care: 'Lavage machine 30°, cycle délicat. Ne pas assouplir.',
      origin: 'Confectionné au Portugal',
      description:
        "Une gabardine serrée à 130 fils, rendue déperlante sans traitement fluoré. La ceinture se noue ou se laisse pendre ; les épaules sont assez larges pour un pull épais dessous.",
      details: [
        'Ceinture amovible, boucle en laiton brossé',
        'Empiècement dos ventilé',
        'Déperlance sans PFC, réactivable au fer doux'
      ],
      featured: true
    },
    {
      id: 'leira',
      name: 'Tee-shirt Leira',
      subtitle: 'Coton biologique peigné',
      price: 75,
      category: 'hauts',
      gender: 'unisexe',
      color: 'Blanc cassé',
      swatch: '#EAE5DC',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      images: [P + 'leira.svg', F + 'leira.svg'],
      composition: '100 % coton biologique peigné, 230 g/m²',
      care: 'Lavage machine 30°. Séchage à l\'air libre.',
      origin: 'Confectionné au Portugal',
      description:
        "Un jersey lourd de 230 g qui ne transparaît pas et ne se déforme pas au col. La base de tout le reste du vestiaire.",
      details: ['Jersey 230 g/m²', 'Col côtelé renforcé', 'Coupe droite, épaule marquée'],
      featured: false
    },
    {
      id: 'havn',
      name: 'Cabas Havn',
      subtitle: 'Cuir à tannage végétal',
      price: 340,
      category: 'accessoires',
      gender: 'unisexe',
      color: 'Tabac',
      swatch: '#6B5844',
      badge: 'Fabriqué à la main',
      sizes: ['Taille unique'],
      images: [P + 'havn.svg', F + 'havn.svg'],
      composition: 'Cuir pleine fleur à tannage végétal',
      care: 'Nourrir au baume incolore deux fois par an.',
      origin: 'Fabriqué à Florence, Italie',
      description:
        "Une seule pièce de cuir pleine fleur, pliée et cousue sur les côtés. Sans doublure, sans fermeture : le cuir patine et le sac se tient mieux à mesure qu'il sert.",
      details: ['38 × 34 × 12 cm', 'Anses rivetées, portée épaule', 'Tannage végétal, sans chrome'],
      featured: false
    },
    {
      id: 'fjeld',
      name: 'Surchemise Fjeld',
      subtitle: 'Laine bouillie',
      price: 230,
      category: 'chemises',
      gender: 'homme',
      color: 'Brume',
      swatch: '#7E8A86',
      sizes: ['S', 'M', 'L', 'XL'],
      images: [P + 'fjeld.svg', F + 'fjeld.svg'],
      composition: '90 % laine bouillie, 10 % polyamide recyclé',
      care: 'Nettoyage à sec. Brosser après usage.',
      origin: 'Confectionnée en Lituanie',
      description:
        "À mi-chemin entre la chemise et la veste. La laine bouillie coupe le vent sans doublure et se porte ouverte sur une maille fine dès l'automne.",
      details: ['Coupe oversize assumée', 'Deux poches poitrine à rabat', 'Boutons en corozo teint'],
      featured: false
    },
    {
      id: 'ingrid',
      name: 'Jupe Ingrid',
      subtitle: 'Plissée, laine froide',
      price: 245,
      category: 'jupes',
      gender: 'femme',
      color: 'Noir',
      swatch: '#2E2E2C',
      sizes: ['34', '36', '38', '40', '42'],
      images: [P + 'ingrid.svg', F + 'ingrid.svg'],
      composition: '100 % laine vierge',
      care: 'Nettoyage à sec. Suspendre pour conserver les plis.',
      origin: 'Confectionnée au Portugal',
      description:
        "Des plis permanents fixés à la vapeur sur une laine froide qui bouge à chaque pas. Taille haute, longueur sous le genou.",
      details: ['Plis permanents fixés à la vapeur', 'Fermeture invisible côté', 'Longueur 76 cm en taille 38'],
      featured: false
    }
  ];

  const journal = [
    {
      id: 'lumiere',
      image: 'assets/img/editorial/journal-01.svg',
      tag: 'Atelier',
      title: 'La lumière de janvier',
      excerpt:
        "Quatre heures de jour utile à Bergen. Comment nos coloristes composent une palette qui tient debout sous un ciel bas.",
      date: 'Janvier 2026'
    },
    {
      id: 'merinos',
      image: 'assets/img/editorial/journal-02.svg',
      tag: 'Matières',
      title: 'Ce que veut dire « 18,5 microns »',
      excerpt:
        "Le diamètre d'une fibre décide de tout : de la douceur, de la tenue, de la durée de vie. Petit guide sans jargon.",
      date: 'Décembre 2025'
    },
    {
      id: 'reparer',
      image: 'assets/img/editorial/journal-03.svg',
      tag: 'Entretien',
      title: 'Réparer plutôt que remplacer',
      excerpt:
        "Notre atelier de reprise remaille gratuitement toute maille NORDHEM, à vie. Mode d'emploi.",
      date: 'Novembre 2025'
    }
  ];

  const categories = [
    { id: 'tous', label: 'Tout le vestiaire' },
    { id: 'mailles', label: 'Mailles' },
    { id: 'manteaux', label: 'Manteaux' },
    { id: 'chemises', label: 'Chemises' },
    { id: 'hauts', label: 'Hauts' },
    { id: 'pantalons', label: 'Pantalons' },
    { id: 'jupes', label: 'Jupes' },
    { id: 'robes', label: 'Robes' },
    { id: 'accessoires', label: 'Accessoires' }
  ];

  return { products, journal, categories };
})();
