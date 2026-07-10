/* =========================================================
   Jasaweb_Store — Live Chat Widget (sederhana)
   Bubble mengambang -> klik -> panel popup -> tombol lanjut ke WhatsApp
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
    const widget = document.getElementById('chat-widget');
    const bubbleBtn = document.getElementById('chat-bubble-btn');
    const closeBtn = document.getElementById('chat-panel-close');

    if (!widget || !bubbleBtn) return;

    function openWidget() {
        widget.classList.add('open');
    }

    function closeWidget() {
        widget.classList.remove('open');
    }

    bubbleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        widget.classList.contains('open') ? closeWidget() : openWidget();
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            closeWidget();
        });
    }

    // Klik di luar widget otomatis nutup panel
    document.addEventListener('click', function (e) {
        if (!widget.contains(e.target)) closeWidget();
    });

    // Cegah klik di dalam panel ikut nutup panel
    const panel = document.getElementById('chat-panel');
    if (panel) {
        panel.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    // Kasih perhatian dikit ke pengunjung baru: bubble "mikir" pelan 4 detik setelah halaman kebuka
    setTimeout(function () {
        if (!widget.classList.contains('open')) {
            bubbleBtn.classList.add('chat-attention');
            setTimeout(function () {
                bubbleBtn.classList.remove('chat-attention');
            }, 1600);
        }
    }, 4000);
});
