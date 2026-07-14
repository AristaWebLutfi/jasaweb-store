document.addEventListener('DOMContentLoaded', function () {
    if (!('IntersectionObserver' in window)) return;

    const selector = [
        '.service-card',
        '.harga-card',
        '.layanan-item',
        '.alur-step',
        '.kartu-tech',
        '.kartu-developer',
        '.accordion-item',
        '.info-item',
        '.testimoni-card'
    ].join(', ');

    const targets = document.querySelectorAll(selector);
    if (targets.length === 0) return;

    targets.forEach(function (el, i) {
        el.classList.add('reveal-init');

        el.style.transitionDelay = (i % 4) * 0.08 + 's';
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) {
        observer.observe(el);
    });
});
