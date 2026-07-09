// ============================================================
// DARK MODE TOGGLE
// ============================================================
const darkModeToggle = document.getElementById('dark-mode-toggle');
const html = document.documentElement;

// Check if user has dark mode preference saved
if (localStorage.getItem('darkMode') === 'enabled') {
    html.setAttribute('data-theme', 'dark');
    if (darkModeToggle) darkModeToggle.classList.add('active');
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
        const isDark = html.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            html.removeAttribute('data-theme');
            localStorage.setItem('darkMode', 'disabled');
            this.classList.remove('active');
        } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('darkMode', 'enabled');
            this.classList.add('active');
        }
    });
}

// ============================================================
// MULTI-LANGUAGE SUPPORT
// ============================================================
const translations = {
    'id': {
        'nav_layanan': 'Layanan',
        'nav_kontak': 'Kontak',
        'nav_tentang': 'Tentang Kami',
    },
    'en': {
        'nav_layanan': 'Services',
        'nav_kontak': 'Contact',
        'nav_tentang': 'About Us',
    },
    'ms': {
        'nav_layanan': 'Perkhidmatan',
        'nav_kontak': 'Hubungi',
        'nav_tentang': 'Tentang Kami',
    }
};

// Set default language
let currentLanguage = localStorage.getItem('language') || 'id';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updatePageLanguage();
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

function updatePageLanguage() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Language button listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        setLanguage(lang);
    });
});

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLanguage) {
            btn.classList.add('active');
        }
    });
    updatePageLanguage();
});

// ============================================================
// LOADING ANIMATION
// ============================================================
const loadingScreen = document.getElementById('loading-screen');

window.addEventListener('load', function() {
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 800);
    }
});

// Show loading when navigating
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href && !link.href.includes('#') && !link.target) {
        const href = link.getAttribute('href');
        if (href && !href.includes('http') && !href.includes('wa.me') && !href.includes('instagram') && !href.includes('tiktok') && !href.includes('polybuzz')) {
            if (loadingScreen) {
                loadingScreen.classList.remove('hidden');
                loadingScreen.style.display = 'flex';
            }
        }
    }
});

// ============================================================
// BACK TO TOP BUTTON
// ============================================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        if (backToTopBtn) backToTopBtn.classList.add('show');
    } else {
        if (backToTopBtn) backToTopBtn.classList.remove('show');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================================
// HERO SLIDER CROSSFADE (untuk index.html)
// ============================================================
const hsSlides = document.querySelectorAll('.hs-slide');
const hsDots = document.querySelectorAll('.hs-dot');

if (hsSlides.length > 0) {
    let hsCurrent = 0;
    const hsInterval = 4000;

    function hsGoTo(index) {
        hsSlides[hsCurrent].classList.remove('active');
        hsDots[hsCurrent].classList.remove('active');
        hsCurrent = index;
        hsSlides[hsCurrent].classList.add('active');
        hsDots[hsCurrent].classList.add('active');
    }

    function hsNext() {
        const next = (hsCurrent + 1) % hsSlides.length;
        hsGoTo(next);
    }

    setInterval(hsNext, hsInterval);

    hsDots.forEach((dot, i) => {
        dot.addEventListener('click', () => hsGoTo(i));
    });
}

// ============================================================
// CONTINUOUS SLIDER (untuk tentang_kami.html)
// ============================================================
const track = document.querySelector('.track-slider-mulus');
if (track) {
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
        isDown = false;
    });

    track.addEventListener('mouseup', () => {
        isDown = false;
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
    });
}

// ============================================================
// CONTACT FORM (untuk kontak.html)
// ============================================================
const form = document.getElementById('kontak-form');
if (form) {
    const EMAILJS_PUBLIC_KEY = '4pNUSHd4z-zxUZePc';
    const EMAILJS_SERVICE_ID = 'service_JasawebStore';
    const EMAILJS_TEMPLATE_ID = 'template_zo95hcs';

    emailjs.init(EMAILJS_PUBLIC_KEY);

    const btnKirim = document.getElementById('btn-kirim');
    const statusEl = document.getElementById('form-status');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nama = document.getElementById('nama').value.trim();
        const email = document.getElementById('email').value.trim();
        const subjek = document.getElementById('subjek').value.trim() || 'Pesan dari Website Jasaweb_Store';
        const pesan = document.getElementById('pesan').value.trim();

        btnKirim.disabled = true;
        btnKirim.textContent = 'Mengirim...';
        statusEl.textContent = '';
        statusEl.className = 'form-status';

        const templateParams = {
            name: nama,
            email: email,
            title: subjek,
            message: pesan
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function() {
                statusEl.textContent = '✅ Pesan berhasil terkirim! Kami akan segera menghubungi Anda.';
                statusEl.className = 'form-status status-sukses';
                form.reset();
            })
            .catch(function(error) {
                console.error('EmailJS error:', error);
                statusEl.textContent = '❌ Gagal mengirim pesan. Silakan coba lagi atau hubungi kami via WhatsApp.';
                statusEl.className = 'form-status status-gagal';
            })
            .finally(function() {
                btnKirim.disabled = false;
                btnKirim.textContent = 'Kirim Pesan';
            });
    });
}

// ============================================================
// FAQ ACCORDION (untuk faq.html)
// ============================================================
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = item.querySelector('.accordion-content');
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.accordion-content').style.maxHeight = null;
        });

        if (!isActive) {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});
