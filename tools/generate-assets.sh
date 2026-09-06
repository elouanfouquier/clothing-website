#!/usr/bin/env bash
# Génère les illustrations SVG du site (produits, matières, éditorial).
# Aucune dépendance externe : tout est dessiné en SVG.
# Usage : bash tools/generate-assets.sh
set -euo pipefail
cd "$(dirname "$0")/.."

OUT_P="assets/img/products"
OUT_F="assets/img/fabric"
OUT_E="assets/img/editorial"
mkdir -p "$OUT_P" "$OUT_F" "$OUT_E"

# --- Silhouettes de vêtements -------------------------------------------------
shape() {
  case "$1" in
    sweater) cat <<'S'
<path d="M332 238 L246 272 L176 596 L242 618 L268 470 L268 786 L532 786 L532 470 L558 618 L624 596 L554 272 L468 238 C452 270 348 270 332 238 Z"/>
<g class="d"><path d="M268 748 L532 748"/><path d="M181 572 L246 594"/><path d="M619 572 L554 594"/>
<ellipse cx="400" cy="252" rx="68" ry="22"/></g>
S
    ;;
    cardigan) cat <<'S'
<path d="M332 238 L246 272 L176 596 L242 618 L268 470 L268 786 L532 786 L532 470 L558 618 L624 596 L554 272 L468 238 L400 402 Z"/>
<g class="d"><path d="M400 402 L400 786"/><path d="M268 748 L532 748"/><path d="M181 572 L246 594"/><path d="M619 572 L554 594"/>
<path d="M332 238 L400 402 L468 238"/></g>
<g class="btn"><circle cx="400" cy="452" r="8"/><circle cx="400" cy="530" r="8"/><circle cx="400" cy="608" r="8"/><circle cx="400" cy="686" r="8"/></g>
S
    ;;
    coat) cat <<'S'
<path d="M326 242 L236 278 L166 646 L232 668 L262 500 L262 884 L538 884 L538 500 L568 668 L634 646 L564 278 L474 242 L400 328 Z"/>
<g class="d"><path d="M326 242 L400 328 L474 242"/><path d="M400 328 L400 884"/>
<path d="M296 650 L362 650"/><path d="M438 650 L504 650"/>
<path d="M171 622 L238 644"/><path d="M629 622 L562 644"/></g>
<g class="btn"><circle cx="368" cy="430" r="9"/><circle cx="368" cy="520" r="9"/><circle cx="368" cy="610" r="9"/></g>
S
    ;;
    trench) cat <<'S'
<path d="M326 242 L236 278 L166 654 L232 676 L262 500 L262 892 L538 892 L538 500 L568 676 L634 654 L564 278 L474 242 L400 328 Z"/>
<g class="d"><path d="M326 242 L400 328 L474 242"/><path d="M400 328 L400 892"/>
<path d="M171 630 L238 652"/><path d="M629 630 L562 652"/></g>
<path class="belt" d="M266 566 L534 566 L534 606 L266 606 Z"/>
<g class="d"><path d="M380 558 L380 614"/><path d="M424 558 L424 614"/></g>
<g class="btn"><circle cx="366" cy="430" r="9"/><circle cx="366" cy="506" r="9"/><circle cx="366" cy="676" r="9"/></g>
S
    ;;
    shirt) cat <<'S'
<path d="M334 234 L250 266 L186 606 L250 628 L276 470 L276 792 L524 792 L524 470 L550 628 L614 606 L550 266 L466 234 L400 278 Z"/>
<g class="d"><path d="M350 228 L400 278 L450 228"/><path d="M400 278 L400 792"/>
<path d="M191 582 L254 604"/><path d="M609 582 L546 604"/><path d="M300 500 L358 500"/></g>
<g class="btn"><circle cx="400" cy="356" r="7"/><circle cx="400" cy="432" r="7"/><circle cx="400" cy="508" r="7"/><circle cx="400" cy="584" r="7"/><circle cx="400" cy="660" r="7"/><circle cx="400" cy="736" r="7"/></g>
S
    ;;
    tee) cat <<'S'
<path d="M336 246 L258 278 L224 402 L290 426 L298 386 L298 754 L502 754 L502 386 L510 426 L576 402 L542 278 L464 246 C448 278 352 278 336 246 Z"/>
<g class="d"><path d="M232 382 L292 404"/><path d="M568 382 L508 404"/><ellipse cx="400" cy="260" rx="64" ry="20"/></g>
S
    ;;
    trousers) cat <<'S'
<path d="M282 296 L518 296 L542 890 L448 890 L400 540 L352 890 L258 890 Z"/>
<g class="d"><path d="M282 336 L518 336"/><path d="M400 336 L400 436"/>
<path d="M338 344 L318 878"/><path d="M462 344 L482 878"/></g>
S
    ;;
    skirt) cat <<'S'
<path d="M300 330 L500 330 L566 852 L234 852 Z"/>
<g class="d"><path d="M296 372 L504 372"/><path d="M340 372 L302 852"/><path d="M400 372 L400 852"/><path d="M460 372 L498 852"/></g>
S
    ;;
    dress) cat <<'S'
<path d="M342 252 C368 288 432 288 458 252 L510 296 L486 440 L554 848 L246 848 L314 440 L290 296 Z"/>
<g class="d"><path d="M314 440 L486 440"/><path d="M400 452 L400 836"/></g>
S
    ;;
    scarf) cat <<'S'
<path d="M296 188 L372 176 L394 736 L318 750 Z"/>
<path d="M408 176 L484 188 L462 750 L386 736 Z"/>
<g class="d"><path d="M318 750 L322 802"/><path d="M342 746 L346 798"/><path d="M366 742 L370 794"/><path d="M390 738 L394 790"/>
<path d="M414 740 L410 792"/><path d="M438 744 L434 796"/><path d="M462 748 L458 800"/></g>
S
    ;;
    bag) cat <<'S'
<path d="M288 382 L512 382 L552 852 L248 852 Z"/>
<g class="d"><path d="M284 428 L516 428"/></g>
<path class="strap" d="M338 386 C338 274 462 274 462 386"/>
S
    ;;
  esac
}

# product_svg <fichier> <fond> <remplissage> <forme>
product_svg() {
  local file="$1" bg="$2" fill="$3" form="$4"
  {
    printf '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" role="img">\n'
    printf '<defs>\n'
    printf '<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="%s"/><stop offset="1" stop-color="%s" stop-opacity=".55"/></linearGradient>\n' "$bg" "$bg"
    printf '<radialGradient id="vig" cx=".5" cy=".42" r=".78"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#2b271f" stop-opacity=".14"/></radialGradient>\n'
    printf '<filter id="gr"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter>\n'
    printf '</defs>\n'
    printf '<rect width="800" height="1000" fill="#EFEBE4"/>\n'
    printf '<rect width="800" height="1000" fill="url(#bg)"/>\n'
    printf '<ellipse cx="400" cy="908" rx="212" ry="26" fill="#2b271f" opacity=".07"/>\n'
    printf '<g fill="%s" stroke="#26231C" stroke-opacity=".42" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">\n' "$fill"
    printf '<style>.d{fill:none;stroke:#26231C;stroke-opacity:.32;stroke-width:2}.btn{fill:#26231C;fill-opacity:.28;stroke:none}.belt{fill:#26231C;fill-opacity:.14}.strap{fill:none;stroke-width:11;stroke-opacity:.5}</style>\n'
    shape "$form"
    printf '</g>\n'
    printf '<rect width="800" height="1000" fill="url(#vig)"/>\n'
    printf '<rect width="800" height="1000" filter="url(#gr)" opacity=".05"/>\n'
    printf '</svg>\n'
  } > "$file"
}

# fabric_svg <fichier> <couleur>
fabric_svg() {
  local file="$1" c="$2"
  cat > "$file" <<F
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" role="img">
<defs>
<pattern id="weave" width="16" height="16" patternUnits="userSpaceOnUse">
<rect width="16" height="16" fill="$c"/>
<path d="M0 0 H16" stroke="#000" stroke-opacity=".07" stroke-width="5"/>
<path d="M0 8 V24" stroke="#fff" stroke-opacity=".14" stroke-width="5"/>
</pattern>
<radialGradient id="lt" cx=".34" cy=".26" r=".85">
<stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#241f18" stop-opacity=".22"/>
</radialGradient>
<filter id="fg"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="4"/><feColorMatrix type="saturate" values="0"/></filter>
</defs>
<rect width="800" height="1000" fill="url(#weave)"/>
<g stroke="#000" stroke-opacity=".05" fill="none" stroke-width="26">
<path d="M-40 240 C220 180 520 320 860 250"/><path d="M-40 560 C240 500 500 640 860 570"/>
</g>
<rect width="800" height="1000" fill="url(#lt)"/>
<rect width="800" height="1000" filter="url(#fg)" opacity=".08"/>
</svg>
F
}

# --- Produits -----------------------------------------------------------------
product_svg "$OUT_P/hallstad.svg"  "#E7E2D8" "#D8CFBE" sweater
product_svg "$OUT_P/rorvik.svg"    "#E3E4E1" "#4A4E4C" coat
product_svg "$OUT_P/alesund.svg"   "#EDE8DF" "#F2EFE8" shirt
product_svg "$OUT_P/vestby.svg"    "#E5E3DE" "#3A3B38" trousers
product_svg "$OUT_P/solvig.svg"    "#E9E3DC" "#8E8577" dress
product_svg "$OUT_P/nordmark.svg"  "#E8E4DB" "#C2B49C" scarf
product_svg "$OUT_P/bjorka.svg"    "#E6E5E0" "#6E7468" cardigan
product_svg "$OUT_P/kvarn.svg"     "#EAE5DB" "#BFAE93" trench
product_svg "$OUT_P/leira.svg"     "#EBE7E0" "#EFEAE1" tee
product_svg "$OUT_P/havn.svg"      "#E6E2DA" "#6B5844" bag
product_svg "$OUT_P/fjeld.svg"     "#E4E5E2" "#7E8A86" shirt
product_svg "$OUT_P/ingrid.svg"    "#E8E4DD" "#2E2E2C" skirt

# --- Matières -----------------------------------------------------------------
fabric_svg "$OUT_F/hallstad.svg" "#D8CFBE"
fabric_svg "$OUT_F/rorvik.svg"   "#4A4E4C"
fabric_svg "$OUT_F/alesund.svg"  "#F0EDE5"
fabric_svg "$OUT_F/vestby.svg"   "#3A3B38"
fabric_svg "$OUT_F/solvig.svg"   "#8E8577"
fabric_svg "$OUT_F/nordmark.svg" "#C2B49C"
fabric_svg "$OUT_F/bjorka.svg"   "#6E7468"
fabric_svg "$OUT_F/kvarn.svg"    "#BFAE93"
fabric_svg "$OUT_F/leira.svg"    "#EAE5DC"
fabric_svg "$OUT_F/havn.svg"     "#6B5844"
fabric_svg "$OUT_F/fjeld.svg"    "#7E8A86"
fabric_svg "$OUT_F/ingrid.svg"   "#2E2E2C"

echo "Illustrations produits et matières générées."

# --- Éditorial ----------------------------------------------------------------
grain='<filter id="eg"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter>'

# Silhouette habillée : lookbook
figure_svg() {
  local file="$1" bg="$2" garment="$3" tone="$4"
  cat > "$file" <<F
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" role="img">
<defs>
<linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="$bg"/><stop offset="1" stop-color="#DCD6CB"/></linearGradient>
<radialGradient id="v" cx=".5" cy=".4" r=".8"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#241f18" stop-opacity=".18"/></radialGradient>
$grain
</defs>
<rect width="900" height="1200" fill="url(#b)"/>
<circle cx="662" cy="286" r="150" fill="#fff" opacity=".24"/>
<ellipse cx="450" cy="1128" rx="200" ry="22" fill="#2b271f" opacity=".09"/>
<g stroke="#26231C" stroke-opacity=".45" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
  <circle cx="450" cy="252" r="58" fill="#D9CFC0"/>
  <path d="M424 296 L424 392 L476 392 L476 296 Z" fill="#CBC1B1" stroke="none"/>
  <path d="M366 872 L360 1116 L418 1116 L426 872 Z" fill="#CFC6B7"/>
  <path d="M474 872 L482 1116 L540 1116 L534 872 Z" fill="#CFC6B7"/>
  $garment
</g>
<rect width="900" height="1200" fill="url(#v)"/>
<rect width="900" height="1200" filter="url(#eg)" opacity=".05"/>
</svg>
F
}

COAT_FIG='<path d="M362 334 L296 362 L246 706 L312 728 L336 552 L336 890 L564 890 L564 552 L588 728 L654 706 L604 362 L538 334 L450 420 Z" fill="'"#4A4E4C"'"/>
  <path d="M362 334 L450 420 L538 334" fill="none" stroke-opacity=".5"/>
  <path d="M450 420 L450 890" fill="none" stroke-opacity=".35"/>
  <path d="M251 682 L316 704" fill="none" stroke-opacity=".35"/>
  <path d="M649 682 L584 704" fill="none" stroke-opacity=".35"/>
  <circle cx="424" cy="512" r="8" fill="#26231C" fill-opacity=".3" stroke="none"/>
  <circle cx="424" cy="600" r="8" fill="#26231C" fill-opacity=".3" stroke="none"/>'

DRESS_FIG='<path d="M360 356 L332 366 L316 668 L352 676 L372 392 Z" fill="#D9CFC0"/>
  <path d="M540 356 L568 366 L584 668 L548 676 L528 392 Z" fill="#D9CFC0"/>
  <path d="M392 344 C420 380 480 380 508 344 L560 392 L534 546 L604 1004 L296 1004 L366 546 L340 392 Z" fill="'"#8E8577"'"/>
  <path d="M366 546 L534 546" fill="none" stroke-opacity=".35"/>'

figure_svg "$OUT_E/look-01.svg" "#E9E4DA" "$COAT_FIG"  ink
figure_svg "$OUT_E/look-02.svg" "#E6E6E1" "$DRESS_FIG" ink

# Paysage nordique minimal : journal / éditorial
landscape_svg() {
  local file="$1" c1="$2" c2="$3" sun="$4"
  cat > "$file" <<F
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 640" role="img">
<defs>
<linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="$c1"/><stop offset="1" stop-color="$c2"/></linearGradient>
$grain
</defs>
<rect width="900" height="640" fill="url(#s)"/>
<circle cx="612" cy="222" r="74" fill="$sun" opacity=".55"/>
<path d="M0 470 C180 400 300 476 450 452 C620 424 740 470 900 428 L900 640 L0 640 Z" fill="#2b271f" opacity=".13"/>
<path d="M0 540 C200 496 340 556 520 528 C700 500 800 546 900 522 L900 640 L0 640 Z" fill="#2b271f" opacity=".18"/>
<g stroke="#fff" stroke-opacity=".28" stroke-width="3" fill="none">
<path d="M-20 336 C220 316 420 356 920 326"/><path d="M-20 380 C260 360 460 396 920 368"/>
</g>
<rect width="900" height="640" filter="url(#eg)" opacity=".06"/>
</svg>
F
}

landscape_svg "$OUT_E/journal-01.svg" "#E7E3DA" "#CFC7B7" "#F3EADA"
landscape_svg "$OUT_E/journal-02.svg" "#E2E5E3" "#BFC5C0" "#EEF1EC"
landscape_svg "$OUT_E/journal-03.svg" "#EBE4DB" "#D2C3AE" "#F6EEE1"

# Drapé de matière : hero / atelier
drape_svg() {
  local file="$1" w="$2" h="$3" c1="$4" c2="$5"
  cat > "$file" <<F
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 $w $h" role="img">
<defs>
<linearGradient id="d" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="$c1"/><stop offset="1" stop-color="$c2"/></linearGradient>
<linearGradient id="f" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".5" stop-color="#241f18" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity=".2"/></linearGradient>
<radialGradient id="v2" cx=".5" cy=".38" r=".82"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#241f18" stop-opacity=".2"/></radialGradient>
$grain
</defs>
<rect width="$w" height="$h" fill="url(#d)"/>
<g fill="url(#f)">
<path d="M0 0 C$((w/5)) $((h/3)) $((w/4)) $((h/2)) 0 $h L$((w/3)) $h C$((w/5)) $((h*2/3)) $((w*2/5)) $((h/3)) $((w/4)) 0 Z"/>
<path d="M$((w/2)) 0 C$((w*3/5)) $((h/3)) $((w*2/5)) $((h*2/3)) $((w*3/5)) $h L$((w*9/10)) $h C$((w*7/10)) $((h*2/3)) $((w*9/10)) $((h/3)) $((w*4/5)) 0 Z"/>
</g>
<g stroke="#fff" stroke-opacity=".2" stroke-width="2" fill="none">
<path d="M0 $((h*2/3)) C$((w/3)) $((h/2)) $((w*2/3)) $((h*3/4)) $w $((h*3/5))"/>
<path d="M0 $((h*4/5)) C$((w/3)) $((h*2/3)) $((w*2/3)) $((h*9/10)) $w $((h*3/4))"/>
</g>
<rect width="$w" height="$h" fill="url(#v2)"/>
<rect width="$w" height="$h" filter="url(#eg)" opacity=".05"/>
</svg>
F
}

drape_svg "$OUT_E/hero.svg"    1600 1100 "#9C9284" "#4B453C"
drape_svg "$OUT_E/atelier.svg" 1200 900  "#E4E6E3" "#B9BEB7"
drape_svg "$OUT_E/story.svg"   1000 1250 "#EAE4D9" "#CBBEA8"

echo "Illustrations éditoriales générées."
