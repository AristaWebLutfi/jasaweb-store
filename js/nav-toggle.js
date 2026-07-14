/* =========================================================
   Jasaweb_Store — Hamburger Menu (mobile)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('nav-toggle-btn');
    const linksWrap = document.getElementById('nav-links-wrap');

    if (!toggleBtn || !linksWrap) return;

    toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        linksWrap.classList.toggle('open');
    });

    // Otomatis nutup menu kalau salah satu link navigasi diklik
    linksWrap.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            linksWrap.classList.remove('open');
        });
    });

    // Klik di luar navbar otomatis nutup menu
    document.addEventListener('click', function (e) {
        if (!linksWrap.contains(e.target) && e.target !== toggleBtn && !toggleBtn.contains(e.target)) {
            linksWrap.classList.remove('open');
        }
    });
});
