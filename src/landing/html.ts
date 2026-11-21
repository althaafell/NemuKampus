// The home page, built with the taste-skill kit (public/assets) as one plain HTML document.
// It is served by app/route.ts instead of a React page because the kit's scripts edit the DOM
// (entrances, fragments, moments), which React hydration would fight.
//
// type: software · deal: hero centred, nav nav-centre, close close-type, footer footer-statement,
// rhythm surface-pairs, buttons arrow, mark dots, radius round, palette mint-pink-accounts (the second dealt; the client turned down the first, card-pastels), type instrument,
// ground sage · moments: cursor-spotlight on the hero window, line-carries-colour on #cara-kerja (smoothed with page CSS: the client found the scrubbed steps jerky); liquid-type's statement section was too sparse

const arrow =
  '<svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path class="m-arrow__stem" d="M1 6h8"/><path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5"/></svg>';
const docIcon =
  '<svg class="ui-icon" viewBox="0 0 16 16"><path d="M4 2.5h5l3 3v8H4z"/><path d="M9 2.5v3h3"/></svg>';
const pinIcon =
  '<svg class="ui-icon" viewBox="0 0 16 16"><path d="M8 14s4.5-4.2 4.5-7.5a4.5 4.5 0 0 0-9 0C3.5 9.8 8 14 8 14z"/><circle cx="8" cy="6.5" r="1.6"/></svg>';
const check =
  '<span class="ui-check__box"><svg viewBox="0 0 16 16"><path d="m4.5 8.2 2.3 2.3 4.7-5"/></svg></span>';
const logo = '<a class="nav__logo" href="/"><span class="mark" data-mark="dots" aria-hidden="true"></span>NemuKampus</a>';

// illustrative rows for the hero's app window (role="img"); the live list is on /cari
const rows: [tone: number, tag: string, item: string, place: string, status: "Dicari" | "Kembali", age: string][] = [
  [1, "DK", "Dompet kulit hitam", "FILKOM, Gedung F", "Dicari", "2m"],
  [3, "KN", "Kunci motor Honda", "Parkiran FEB", "Dicari", "9m"],
  [4, "EL", "Laptop ASUS abu-abu", "Perpustakaan Pusat", "Dicari", "14m"],
  [2, "PK", "Jaket almamater", "Samantha Krida", "Kembali", "31m"],
  [5, "DM", "Map tugas akhir", "FMIPA", "Kembali", "48m"],
  [3, "TS", "Tas ransel hitam", "Kantin FILKOM", "Kembali", "1j"],
  [1, "EL", "Earphone putih", "FEB", "Dicari", "2j"],
  [4, "DK", "Kartu e-money biru", "Masjid Raden Patah", "Kembali", "3j"],
  [2, "LN", "Botol minum biru", "Stadion UB", "Kembali", "5j"],
];

const windowRows = rows
  .map(
    ([tone, tag, item, place, st, age]) =>
      `<li class="ui-win__row" data-row><span class="ui-avatar" data-tone="${tone}">${tag}</span><span class="ui-win__who">${item}</span><span class="ui-win__sub">${place}</span><span class="ui-win__st${st === "Kembali" ? " is-done" : ""}" data-st>${st}</span><span class="ui-win__age">${age}</span></li>`,
  )
  .join("");

export function landingHtml(origin: string) {
  return `<!doctype html>
<html lang="id" data-type="software" data-radius="round" data-ground="sage" data-buttons="arrow" data-motion>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>NemuKampus: barang hilang dan temuan untuk mahasiswa UB</title>
<meta name="description" content="Laporkan barang yang hilang atau kamu temukan di kampus Universitas Brawijaya, lalu hubungi pelapornya lewat WhatsApp. Gratis, tanpa akun.">
<meta property="og:type" content="website">
<meta property="og:title" content="NemuKampus: barang hilang dan temuan untuk mahasiswa UB">
<meta property="og:description" content="Cari dan laporkan barang hilang atau temuan di kampus UB. Gratis, tanpa akun.">
<meta property="og:image" content="${origin}/opengraph-image">
<meta property="og:locale" content="id_ID">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<meta name="theme-color" content="#f8f8f8">
<!-- <link rel="canonical" href="https://[domain kampus]/"> once the domain is known -->
<meta name="site-kind" content="software">
<meta name="page-type" content="software">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wdth,wght@75..100,400..700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/system.css">
<link rel="stylesheet" href="/assets/ui/cards.css">
<link rel="stylesheet" href="/assets/motion/motion.css">
<link rel="stylesheet" href="/assets/backgrounds/backgrounds.css">
<link rel="stylesheet" href="/assets/layout/layout.css">
<link rel="stylesheet" href="/assets/icons/icon.css">
<style>
:root {
  --p-bg: #f8f8f8; --p-surface: #eeeeee; --p-ink: #0a0a0a; --p-muted: #6a6a6a;
  --p-accent: #1f6b3a; --p-accent-ink: #ffffff; --p-action: #1f6b3a; --p-action-ink: #ffffff;
  --p-inv-bg: #0a0a0a; --p-inv-surface: #171717; --p-inv-ink: #f8f8f8; --p-inv-muted: #939393;
  --p-inv-accent: #1f6b3a; --p-inv-accent-ink: #ffffff; --p-inv-action: #1f6b3a; --p-inv-action-ink: #ffffff;
  --font-display: "Instrument Sans", system-ui, sans-serif;
  --font-text: "Instrument Sans", system-ui, sans-serif;
  --font-mono: "DM Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  --display-weight: 500;
  --display-tracking: -0.028em;
  --display-tracking-xl: -0.036em;
  --display-stretch: 96%;
  --ly-scale: 1.04;
}
</style>
<link rel="stylesheet" href="/assets/ui/base.css">
<link rel="stylesheet" href="/assets/ui/window/fragment.css">
<link rel="stylesheet" href="/assets/ui/chat/fragment.css">
<link rel="stylesheet" href="/assets/ui/checklist/fragment.css">
<link rel="stylesheet" href="/assets/ui/search/fragment.css">
<link rel="stylesheet" href="/assets/ui/notify/fragment.css">
<link rel="stylesheet" href="/assets/ui/doc/fragment.css">
<script>document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)</script>
<script src="/assets/backgrounds/backgrounds.js"></script>
<script>document.documentElement.classList.add('mo-js');setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)</script>
<link rel="modulepreload" href="/assets/moments/moments.js"><link rel="modulepreload" href="/assets/moments/lib.js">
<link rel="modulepreload" href="/assets/moments/cursor-spotlight/moment.js"><link rel="modulepreload" href="/assets/moments/line-carries-colour/moment.js">
<!-- page CSS: the app window (sections-library.md, app-frame) and one --p-h per card group -->
<style>
  .app.ui { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); background: var(--u-bg); border: 1px solid var(--u-border); border-radius: var(--u-r); box-shadow: var(--u-shadow); height: 420px; }
  .app > .app__pane { position: relative; min-width: 0; min-height: 0; overflow: hidden; }
  .app > .app__pane + .app__pane { border-left: 1px solid var(--u-line); }
  .app > .app__pane > .ui-panel { width: 100%; border: 0; border-radius: 0; box-shadow: none; }
  .app > .app__pane::after { content: ""; position: absolute; inset: auto 0 0 0; height: 64px; background: linear-gradient(transparent, var(--u-bg)); pointer-events: none; }
  @media (min-width: 1024px) and (max-width: 1279px) { .app.ui { grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); } }
  @media (max-width: 1023px) {
    .app.ui { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); }
    .app > .app__pane--list { max-height: 252px; }
    .app > .app__pane--list::after { display: none; }
    .app .ui-win__side { display: none; }
    .app .ui-win__body { grid-template-columns: minmax(0, 1fr); }
    .app > .app__pane + .app__pane { border-left: 0; border-top: 1px solid var(--u-line); }
  }
  @media (max-width: 639px) {
    .app.ui { grid-template-rows: minmax(0, 1fr); }
    .app > .app__pane--list { display: none; }
    .app > .app__pane + .app__pane { border-top: 0; }
  }
  /* the centred hero's lead is read text: ink, 7:1 (layout.css greys it) */
  .hero--centred .hero__lead { color: var(--ink); }
  /* line-carries-colour follows the scrollbar exactly, so a wheel notch (about 100px) made the line and the
     blocks jump; these glide between scroll steps, and the line moves by transform instead of top (no layout) */
  #cara-kerja .mo-lc__line { top: 0; transform: translateY(var(--mo-cut)); will-change: transform; transition: transform .7s cubic-bezier(.22,1,.36,1); }
  #cara-kerja .mo-lc__cover { transition: clip-path .7s cubic-bezier(.22,1,.36,1); }
  #cara-kerja.is-live:not(.is-open) .wrap [style*="opacity"] { transition: opacity .7s cubic-bezier(.22,1,.36,1); }
  #cara-kerja .panel { --p-h: 336px; }
  @media (min-width: 640px) and (max-width: 1279px) { #cara-kerja { --h: 2 } }
  #aman .frame--split { --ratio: 100%; }
  @media (max-width: 639px) { #aman .frame--split { --ratio: 72%; } }
  /* under 380px the bar holds only the logo and the menu; the hero's Buat Laporan sits right under it */
  @media (max-width: 379px) { .nav:not(.is-open) .nav__actions { display: none; } .nav:not(.is-open) .nav__actions + .nav__toggle { margin-left: auto; } }
  @media (max-width: 639px) { #cara-kerja .panel { --p-h: 280px; } }
</style>
</head>
<body>
<!-- type: software
     deal: hero centred, nav nav-centre, close close-type, footer footer-statement, rhythm surface-pairs,
     buttons arrow, mark dots, grounds: the lit ground sage behind the hero window, no shader effect
     moments: cursor-spotlight on the hero window (pointer), line-carries-colour on #cara-kerja (scroll,
              eased between wheel steps by page CSS); liquid-type dropped: its statement was too sparse -->
<header class="nav nav--centre">
  <div class="wrap nav__bar">
    <a class="skip-link" href="#top">Lewati ke konten</a>
    ${logo}
    <nav class="nav__links" aria-label="Utama">
      <div class="nav__item"><a class="nav__link" href="#cara-kerja">Langkah</a></div>
      <div class="nav__item"><a class="nav__link" href="#aman">Ciri khas</a></div>
      <div class="nav__item"><a class="nav__link" href="#faq">Pertanyaan</a></div>
    </nav>
    <div class="nav__actions">
      <a class="nav__link" href="/cari">Cari barang</a>
      <a class="btn btn--primary" href="/lapor">Buat Laporan</a>
    </div>
    <button class="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
    </button>
  </div>
</header>

<main id="top">
  <section class="hero hero--centred" data-enter aria-labelledby="hero-h">
    <div class="wrap"><div class="hero-text">
      <div class="hero__c">
        <a class="pill" href="#cara-kerja"><span>Gratis, tanpa akun</span><span class="muted">Lihat caranya</span></a>
        <h1 id="hero-h">Barang hilang &amp; temuan kampus UB</h1>
        <p class="hero__lead">Laporkan barang yang hilang atau kamu temukan di 24 lokasi UB, lalu hubungi pelapornya lewat WhatsApp. Setiap laporan tampil 60 hari.</p>
        <div class="btn-row"><a class="btn btn--primary" href="/lapor">Buat Laporan${arrow}</a><a class="btn btn--secondary" href="/cari">Cari barang</a></div>
      </div>
      <div class="hero__window" data-moment="cursor-spotlight">
        <div class="ly-piece">
          <div class="ui app" role="img" aria-label="Daftar laporan NemuKampus di samping percakapan pemilik dan penemu sebuah dompet" data-ui-pause-host>
            <div class="app__pane app__pane--list">
              <div class="ui ui-panel ui-win" data-ui="window" data-open="Dicari" data-work="Dihubungi" data-done="Kembali">
                <div class="ui-win__bar">
                  <span class="ui-dots" aria-hidden="true"><i></i><i></i><i></i></span>
                  <span class="ui-win__crumb">NemuKampus <i>/</i> <b>Laporan</b></span>
                  <span class="ui-spacer"></span>
                  <span class="ui-win__search" aria-hidden="true"><svg class="ui-icon" viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3 3"/></svg><span class="ui-win__ph">Cari barang</span><span class="ui-kbd">/</span></span>
                </div>
                <div class="ui-win__body">
                  <nav class="ui-win__side" aria-hidden="true">
                    <span class="ui-win__nav is-on">${docIcon}Semua</span>
                    <span class="ui-win__nav">${docIcon}Hilang</span>
                    <span class="ui-win__nav">${docIcon}Ditemukan</span>
                    <span class="ui-win__nav"><svg class="ui-icon" viewBox="0 0 16 16"><path d="m3.5 8.4 2.8 2.8 6.2-6.4"/></svg>Selesai</span>
                    <span class="ui-win__label">Lokasi</span>
                    <span class="ui-win__nav"><span class="ui-win__hash">#</span>FILKOM</span>
                    <span class="ui-win__nav"><span class="ui-win__hash">#</span>Perpustakaan</span>
                  </nav>
                  <div class="ui-win__main">
                    <div class="ui-win__cols" aria-hidden="true"><span>Barang</span><span>Lokasi</span><span>Status</span><span>Umur</span></div>
                    <ul class="ui-win__rows">${windowRows}</ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="app__pane app__pane--open" data-ui-loop>
              <div class="ui ui-panel ui-chat" data-ui="chat">
                <div class="ui-head">
                  <span class="ui-agent" aria-hidden="true"></span>
                  <div class="ui-title">Penemu dompet</div>
                  <span class="ui-chat__online">Online</span>
                  <span class="ui-spacer"></span>
                </div>
                <div class="ui-chat__body">
                  <div class="ui-chat__day">Hari ini, 10.42</div>
                  <div class="ui-msg ui-msg--me" data-chat-q><span class="ui-msg__text">Halo, dompet hitam di FILKOM sepertinya milik saya.</span></div>
                  <div class="ui-msg ui-msg--bot" data-chat-a>
                    <span class="ui-agent ui-msg__av" aria-hidden="true"></span>
                    <span class="ui-msg__col">
                      <span class="ui-chat__answer">Boleh sebutkan isinya? Ciri khasnya <b>sengaja tidak saya tulis</b> di laporan.</span>
                      <span class="ui-chat__srcs"><span class="ui-chat__src">${docIcon}Dompet kulit hitam</span><span class="ui-chat__src">${pinIcon}Gedung F, lantai 3</span></span>
                    </span>
                  </div>
                  <div class="ui-msg ui-msg--me"><span class="ui-msg__text">Ada KTM saya dan kartu e-money biru.</span></div>
                </div>
                <div class="ui-chat__input"><span class="ui-chat__ph">Tulis pesan</span><span class="ui-chat__send" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 13V3.5M3.8 7.5 8 3.3l4.2 4.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  </section>

  <section class="section ground-surface" id="cara-kerja" style="--hm: 2" data-moment="line-carries-colour" data-moment-opts='{"from": "base"}' aria-labelledby="langkah-h">
    <div class="wrap">
      <div class="section-head">
        <h2 id="langkah-h">Barang kembali dalam 3 langkah. <span class="muted">Tanpa akun dan tanpa aplikasi tambahan.</span></h2>
      </div>
      <div class="grid">
        <article class="card card--row card--open span-4">
          <span class="step-num">1</span>
          <h3>Laporkan barangnya</h3>
          <p>Isi nama barang, lokasi dan nomor WhatsApp. Kamu langsung dapat kode laporan.</p>
          <div class="panel" data-moment-block>
            <div class="stage stage--fade-b"><div class="at-rise fit" style="--fit-max:340px;--ax:max(24px, 50% - 170px);--ay:40px;--ay-sm:16px" data-ui-loop>
              <div class="ui ui-panel ui-checks" data-ui="checklist">
                <div class="ui-checks__head"><div class="ui-title">Laporan barang hilang</div><span class="ui-spacer"></span><div class="ui-meta" data-checks-count>3 dari 5</div></div>
                <div class="ui-checks__bar"><i data-checks-bar style="--k:0.6"></i></div>
                <ul class="ui-checks__list">
                  <li class="ui-check is-done">${check}<span class="ui-check__label">Nama barang</span></li>
                  <li class="ui-check is-done">${check}<span class="ui-check__label">Kategori</span></li>
                  <li class="ui-check is-done">${check}<span class="ui-check__label">Lokasi dan tanggal</span></li>
                  <li class="ui-check">${check}<span class="ui-check__label">Foto barang (boleh dilewati)</span></li>
                  <li class="ui-check">${check}<span class="ui-check__label">Nomor WhatsApp</span></li>
                </ul>
              </div>
            </div></div>
          </div>
        </article>
        <article class="card card--row card--open span-4">
          <span class="step-num">2</span>
          <h3>Cari dengan filter</h3>
          <p>Saring laporan menurut jenis, kategori dan 24 lokasi kampus.</p>
          <div class="panel" data-moment-block>
            <div class="stage stage--fade-b"><div class="at-rise fit" style="--fit-max:380px;--ax:max(24px, 50% - 190px);--ay:40px;--ay-sm:16px">
              <div class="ui ui-panel ui-search" data-ui="search">
                <div class="ui-search__field">
                  <svg class="ui-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3 3"/></svg>
                  <span class="ui-search__q"><span data-search-q>dompet filkom</span><i class="ui-search__caret"></i></span>
                  <kbd class="ui-search__kbd">/</kbd>
                </div>
                <div class="ui-search__group">Laporan</div>
                <ul class="ui-search__list" data-search-list>
                  <li class="ui-search__row is-sel"><span class="ui-search__ico">${docIcon}</span><span class="ui-search__t"><b>Dompet</b> kulit hitam</span><span class="ui-search__m">Hilang</span></li>
                  <li class="ui-search__row"><span class="ui-search__ico">${docIcon}</span><span class="ui-search__t"><b>Dompet</b> lipat cokelat</span><span class="ui-search__m">Ditemukan</span></li>
                  <li class="ui-search__row"><span class="ui-search__ico">${pinIcon}</span><span class="ui-search__t">Kartu di <b>FILKOM</b> lantai 2</span><span class="ui-search__m">Ditemukan</span></li>
                </ul>
                <div class="ui-search__foot"><span><kbd>&uarr;</kbd><kbd>&darr;</kbd> pindah</span><span><kbd>Enter</kbd> buka</span></div>
              </div>
            </div></div>
          </div>
        </article>
        <article class="card card--row card--open span-4">
          <span class="step-num">3</span>
          <h3>Tandai barang sudah kembali</h3>
          <p>Setelah barang kembali, masukkan kode laporan untuk menutupnya.</p>
          <div class="panel" data-moment-block>
            <div class="stage stage--fade-b"><div class="at-rise fit" style="--fit-max:380px;--ax:max(24px, 50% - 190px);--ay:40px;--ay-sm:16px">
              <div class="ui ui-notify" data-ui="notify">
                <ul class="ui-notify__list" data-notify-list>
                  <li class="ui-note"><span class="ui-note__ico"><svg class="ui-icon" viewBox="0 0 16 16"><path d="m3.5 8.4 2.8 2.8 6.2-6.4"/></svg></span><span class="ui-note__text"><span class="ui-note__title">Laporan ditandai selesai<time>kini</time></span><span class="ui-note__body">Dompet kulit hitam kembali ke pemiliknya</span></span></li>
                  <li class="ui-note"><span class="ui-avatar ui-note__av" data-tone="3">KN</span><span class="ui-note__text"><span class="ui-note__title">Pesan WhatsApp baru<time>4m</time></span><span class="ui-note__body">Penemu kunci motor Honda di Parkiran FEB</span></span></li>
                  <li class="ui-note"><span class="ui-note__ico">${docIcon}</span><span class="ui-note__text"><span class="ui-note__title">Laporan lewat 60 hari<time>1j</time></span><span class="ui-note__body">Disembunyikan, masih bisa dicari</span></span></li>
                </ul>
              </div>
            </div></div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section" id="faq" aria-labelledby="faq-h">
    <div class="wrap">
      <div class="grid">
        <div class="span-5 stack-6">
          <h2 id="faq-h">Pertanyaan seputar barang hilang</h2>
          <p class="muted">Yang paling sering ditanyakan sebelum melapor.</p>
          <a class="link" href="#cara-kerja">Lihat tiga langkahnya</a>
        </div>
        <div class="faq span-6 start-7">
          <div class="faq__item"><h3>Apakah NemuKampus gratis?</h3><p>Ya. Melapor dan mencari tidak dipungut biaya dan tidak perlu akun.</p></div>
          <div class="faq__item"><h3>Siapa yang bisa melihat nomor WhatsApp saya?</h3><p>Semua orang yang membuka laporanmu. Pakai nomor yang memang boleh dihubungi soal barang ini.</p></div>
          <div class="faq__item"><h3>Berapa lama laporan tampil?</h3><p>60 hari. Setelah itu laporan tidak muncul di pencarian biasa, tapi tetap tampil bila kamu memilih menampilkan semua.</p></div>
          <div class="faq__item"><h3>Bagaimana menutup laporan?</h3><p>Buka Kelola Laporan, masukkan kode 8 karakter dari saat melapor, lalu pilih Tandai Selesai atau Hapus.</p></div>
          <div class="faq__item"><h3>Kode laporan saya hilang. Lalu?</h3><p>Kode tidak bisa ditampilkan ulang. Laporan lama tersembunyi sendiri setelah 60 hari.</p></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="aman" aria-labelledby="aman-h">
    <div class="wrap">
      <div class="grid">
        <div class="span-5 stack-6">
          <h2 id="aman-h">Ciri khas barangmu tetap rahasia</h2>
          <p class="t-lead">Penemu tidak menulis isi dompet atau nomor seri di laporan. Ia menanyakannya lewat WhatsApp, lalu kalian bertemu di tempat ramai.</p>
          <div class="stack-2">
            <p>Bertemu di lobi fakultas atau perpustakaan</p>
            <p>Jangan transfer uang sebagai tebusan</p>
            <p>Kode laporan 8 karakter untuk menutup laporan</p>
          </div>
          <a class="link" href="/kelola">Kelola laporanmu</a>
        </div>
        <div class="frame frame--split span-6 start-7">
          <div class="stage stage--fade-br"><div class="at-corner to-edge" style="--ax:56px;--ay:56px" data-ui-loop>
            <div class="ui ui-doc" data-ui="doc">
              <article class="ui-doc__page">
                <div class="ui-doc__label">Laporan · Ditemukan</div>
                <div class="ui-doc__title">Dompet kulit hitam</div>
                <div class="ui-doc__text">Ditemukan di <mark class="ui-doc__mark is-on">Gedung F lantai 3</mark>, dekat lift, pukul 10.15.</div>
                <div class="ui-doc__text">Isi dompet <mark class="ui-doc__mark" data-kind="Rahasia" data-msg="Tanyakan ke pengklaim, jangan ditulis." data-where="Tips serah terima">tidak ditulis di laporan</mark>, supaya hanya pemiliknya yang tahu.</div>
                <div class="ui-doc__text">Hubungi lewat WhatsApp untuk mengambilnya.</div>
                <div class="ui-doc__text">Laporan tampil 60 hari sejak dibuat.</div>
              </article>
              <aside class="ui-doc__note ui-panel is-on" aria-live="polite">
                <div class="ui-doc__kind"><span class="ui-doc__dot"></span><span data-doc-kind>Tempat temu</span></div>
                <div class="ui-doc__msg" data-doc-msg>Bertemu di lobi FILKOM, tempat yang ramai.</div>
                <div class="ui-doc__where" data-doc-where>Tips serah terima</div>
              </aside>
            </div>
          </div></div>
        </div>
      </div>
    </div>
  </section>
</main>

<footer class="footer closing footer--statement" id="contact" aria-labelledby="close-h">
  <div class="wrap">
    <div class="closing__cta close--type">
      <div class="section-head">
        <h2 id="close-h">Laporkan barang hilang atau temuanmu</h2>
        <p>Gratis dan tanpa akun. Kode laporan langsung kamu dapat.</p>
      </div>
      <a class="btn btn--primary btn--xl btn--wide" href="/lapor">Buat Laporan${arrow}</a>
    </div>
    <div class="closing__links">
      <div class="grid">
        <div class="span-4 stack-4">
          ${logo}
          <p class="footer__lede">Papan barang hilang dan temuan untuk mahasiswa Universitas Brawijaya.</p>
        </div>
        <div class="span-2 start-7 footer__col"><h3>Barang</h3><ul><li><a href="/cari">Cari barang</a></li><li><a href="/lapor/hilang">Lapor kehilangan</a></li><li><a href="/lapor/ditemukan">Lapor temuan</a></li></ul></div>
        <div class="span-2 footer__col"><h3>Laporan</h3><ul><li><a href="/kelola">Kelola laporan</a></li><li><a href="/cari?semua=1">Laporan lama</a></li></ul></div>
        <div class="span-2 footer__col"><h3>Panduan</h3><ul><li><a href="#cara-kerja">Langkah</a></li><li><a href="#aman">Ciri khas</a></li><li><a href="#faq">Pertanyaan</a></li></ul></div>
      </div>
      <div class="footer__legal">
        <span>&copy; 2026 NemuKampus &nbsp; Tugas Interaksi Manusia dan Komputer, FILKOM UB</span>
        <div class="socials"></div>
      </div>
    </div>
  </div>
</footer>

<script type="module" src="/assets/system.js"></script>
<script type="module" src="/assets/motion/motion.js"></script>
<script type="module" src="/assets/layout/layout.js"></script>
</body>
</html>`;
}
