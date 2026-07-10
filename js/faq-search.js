/* =========================================================
   Jasaweb_Store — FAQ Search Bar
   Filter pertanyaan real-time + highlight kata kunci
   Selalu baca teks yang lagi tampil (aman dipakai bareng ganti bahasa)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('faq-search');
    const clearBtn = document.getElementById('faq-search-clear');
    const noResultEl = document.getElementById('faq-no-result');
    const items = document.querySelectorAll('.accordion-item');

    if (!searchInput || items.length === 0) return;

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function setText(el, keyword) {
        // el.textContent otomatis kasih teks bersih (tanpa tag highlight lama)
        const plain = el.textContent;

        if (!keyword) {
            el.textContent = plain;
            return plain.toLowerCase();
        }

        const regex = new RegExp('(' + escapeRegex(keyword) + ')', 'ig');
        if (regex.test(plain)) {
            el.innerHTML = plain.replace(regex, '<span class="faq-highlight">$1</span>');
        } else {
            el.textContent = plain;
        }
        return plain.toLowerCase();
    }

    function filterFaq() {
        const keyword = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        clearBtn.style.display = keyword ? 'flex' : 'none';

        items.forEach(function (item) {
            const questionEl = item.querySelector('.accordion-header span');
            const answerEl = item.querySelector('.accordion-content p');
            const contentEl = item.querySelector('.accordion-content');
            if (!questionEl || !answerEl || !contentEl) return;

            // Selalu ambil teks bersih (bebas dari highlight sebelumnya) dulu
            const questionPlain = questionEl.textContent.toLowerCase();
            const answerPlain = answerEl.textContent.toLowerCase();

            const matches = !keyword || questionPlain.includes(keyword) || answerPlain.includes(keyword);

            if (matches) {
                item.classList.remove('faq-hidden');
                visibleCount++;
                setText(questionEl, keyword);
                setText(answerEl, keyword);

                // Auto-expand jawaban kalau lagi nyari sesuatu
                if (keyword) {
                    item.classList.add('active');
                    contentEl.style.maxHeight = contentEl.scrollHeight + 'px';
                } else {
                    item.classList.remove('active');
                    contentEl.style.maxHeight = null;
                }
            } else {
                item.classList.add('faq-hidden');
                item.classList.remove('active');
                contentEl.style.maxHeight = null;
            }
        });

        noResultEl.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    searchInput.addEventListener('input', filterFaq);

    clearBtn.addEventListener('click', function () {
        searchInput.value = '';
        filterFaq();
        searchInput.focus();
    });
});
