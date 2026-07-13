/* =========================================================
   JASAWEB_STORE - Scroll Reveal (Fade-in saat di-scroll)
   Otomatis nempelin class .reveal ke elemen-elemen konten
   utama, lalu pakai IntersectionObserver buat munculin
   dengan animasi halus pas elemen masuk ke layar.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

    var selectors = [
        '.service-card',
        '.harga-card',
        '.testimoni-card',
        '.layanan-item',
        '.alur-step',
        '.info-item',
        '.accordion-item',
        '.seksi-tentang',
        '.kartu-tech',
        '.kartu-developer',
        '.footer-box',
        '.map-wrap',
        '.kontak-form-wrap',
        '.intro .container > h2',
        '.intro .container > p',
        '.cta .container > *',
        '.hero-content > *'
    ];

    var targets = document.querySelectorAll(selectors.join(', '));
    if (!targets.length) return;

    // Kasih delay bertahap (stagger) biar elemen yang berdekatan
    // muncul berurutan, bukan barengan semua sekaligus.
    var parentIndex = new Map();
    targets.forEach(function (el) {
        el.classList.add('reveal');
        var parent = el.parentElement;
        var idx = parentIndex.get(parent) || 0;
        el.style.transitionDelay = (Math.min(idx, 5) * 0.08) + 's';
        parentIndex.set(parent, idx + 1);
    });

    // Fallback kalau browser gak dukung IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        targets.forEach(function (el) { el.classList.add('is-visible'); });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    targets.forEach(function (el) { observer.observe(el); });
});
