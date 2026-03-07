// Simulasi Dampak
const tahunElement = document.getElementById('tahun');
if (tahunElement) {
    tahunElement.addEventListener('change', function() {
        const tahun = this.value;
        let hasil = '';
        if (tahun == 5) {
            hasil = 'Dalam 5 tahun, kerusakan lingkungan dapat meningkat hingga 30% jika tidak ada tindakan pencegahan.';
        } else {
            hasil = 'Dalam 10 tahun, kerusakan lingkungan bisa mencapai 60% dan berdampak besar pada ekosistem serta kehidupan masyarakat.';
        }
        const output = document.getElementById('hasil-simulasi');
        if (output) output.textContent = hasil;
    });
}

// Kalkulator Dampak
const kalkulatorForm = document.getElementById('form-kalkulator');
if (kalkulatorForm) {
    kalkulatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const jumlah = parseInt(document.getElementById('jumlah-tambang').value);
        const kerusakan = parseInt(document.getElementById('kerusakan-bulan').value);
        const durasi = parseInt(document.getElementById('durasi-tahun').value);
        const hasilOutput = document.getElementById('hasil-kalkulator');
        if (isNaN(jumlah) || isNaN(kerusakan) || isNaN(durasi)) {
            if (hasilOutput) hasilOutput.textContent = 'Mohon isi semua data dengan benar.';
            return;
        }
        const total = jumlah * kerusakan * 12 * durasi;
        if (hasilOutput) hasilOutput.textContent =
            `Perkiraan total kerusakan: ${total} hektar selama ${durasi} tahun.`;
    });
}

// Polling Suara Masyarakat
const pollYes = document.getElementById('poll-ya');
const pollNo = document.getElementById('poll-tidak');
const sendOpinion = document.getElementById('kirim-opini');
const outputMessage = document.getElementById('pesan-suara');
if (pollYes) {
    pollYes.addEventListener('click', function() {
        if (outputMessage) outputMessage.textContent = 'Terima kasih atas suara Anda: YA';
    });
}
if (pollNo) {
    pollNo.addEventListener('click', function() {
        if (outputMessage) outputMessage.textContent = 'Terima kasih atas suara Anda: TIDAK';
    });
}
if (sendOpinion) {
    sendOpinion.addEventListener('click', function() {
        const opiniField = document.getElementById('opini');
        const opini = opiniField ? opiniField.value.trim() : '';
        if (opini.length === 0) {
            if (outputMessage) outputMessage.textContent = 'Silakan tulis opini Anda terlebih dahulu.';
        } else {
            if (outputMessage) outputMessage.textContent = 'Terima kasih atas opini Anda!';
            if (opiniField) opiniField.value = '';
        }
    });
}

// page sliding transitions

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('page-content');
    if (content) {
        content.classList.add('slide-in');
        requestAnimationFrame(() => content.classList.add('show'));
        setTimeout(() => content.classList.remove('slide-in','show'), 500);
    }
});

document.addEventListener('click', e => {
    if (e.target.matches('.nav-links a')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        const content = document.getElementById('page-content');
        if (content) {
            content.classList.add('slide-out');
            setTimeout(() => { window.location = href; }, 400);
        } else {
            window.location = href;
        }
    }
});

// ----- detail loading for dampak using inline sections -----
const gridContainer = document.getElementById('grid-container');
const detailContainer = document.getElementById('detail-container');

function showDetail(id) {
    const detail = document.getElementById(id);
    if (detail && gridContainer) {
        // mark active
        detail.classList.add('active');
        // slide grid out
        gridContainer.classList.add('slide-out');
        // prepare detail
        detail.classList.add('slide-in');
        detail.style.display = 'block';
        requestAnimationFrame(() => detail.classList.add('show'));
        // after animation, hide grid completely and clean slide-in
        setTimeout(() => {
            if (gridContainer) gridContainer.style.display = 'none';
            detail.classList.remove('slide-in');
        }, 400);
        if (detailContainer) detailContainer.style.display = 'block';
    }
}

function hideDetails() {
    const active = detailContainer ? detailContainer.querySelector('.detail-dampak.active') : null;
    if (active) {
        active.classList.add('slide-out');
        active.classList.remove('show');
        setTimeout(() => {
            active.style.display = 'none';
            active.classList.remove('slide-out','active');
            if (gridContainer) {
                gridContainer.style.display = '';
                gridContainer.classList.remove('slide-out');
            }
            if (detailContainer) detailContainer.style.display = 'none';
        }, 400);
    }
}

// attach click handlers on dampak cards
const dampakCards = document.querySelectorAll('.dampak-card[data-detail]');
dampakCards.forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const id = card.getAttribute('data-detail');
        if (id) showDetail(id);
    });
});

// back button listeners
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('back-btn')) {
        hideDetails();
    }
});

// ------------------

// universal click animation handler - add temporary class
document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.matches('.btn-primary, .nav-links a, .dampak-card, .back-btn')) {
        el.classList.add('btn-clicked');
        setTimeout(() => el.classList.remove('btn-clicked'), 150);
    }
});


// ...animasi mulai eksplorasi...

// The homepage no longer uses in-page smooth scroll, links navigate to separate pages.

// ...animasi mulai eksplorasi...

// ...animasi kanan atas...

// No in-page navbar scrolling needed since navigation uses separate HTML files.

// ...animasi kanan atas...

// ...existing code...

// Isi dropdown tahun dari 1 sampai 500
const tahunSelect = document.getElementById('tahun');
if (tahunSelect) {
    for (let i = 1; i <= 500; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i + ' Tahun';
        tahunSelect.appendChild(opt);
    }

    // Simulasi Dampak
    tahunSelect.addEventListener('change', function() {
        const tahun = parseInt(this.value);
        let hasil = '';
        if (tahun <= 5) {
            hasil = `Dalam ${tahun} tahun, kerusakan lingkungan mulai terlihat, namun masih bisa dipulihkan jika ada tindakan cepat.`;
        } else if (tahun <= 10) {
            hasil = `Dalam ${tahun} tahun, kerusakan lingkungan dapat meningkat hingga 60% dan mulai berdampak pada ekosistem lokal.`;
        } else if (tahun <= 50) {
            hasil = `Dalam ${tahun} tahun, kerusakan lingkungan semakin parah, banyak area hutan hilang dan kualitas air menurun drastis.`;
        } else if (tahun <= 100) {
            hasil = `Dalam ${tahun} tahun, sebagian besar ekosistem alami rusak, banyak spesies punah, dan lingkungan sulit dipulihkan.`;
        } else {
            hasil = `Dalam ${tahun} tahun, kerusakan lingkungan sangat parah dan hampir tidak bisa dipulihkan, dampak sosial dan ekonomi sangat besar.`;
        }
        const output = document.getElementById('hasil-simulasi');
        if (output) output.textContent = hasil;
    });
}

// ...existing code...