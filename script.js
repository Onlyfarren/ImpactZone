console.log("JS aktif");
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
            // save to localStorage (for later retrieval/server submission)
            storeOpinion(opini);
            if (outputMessage) outputMessage.textContent = 'Terima kasih atas opini Anda!';
            if (opiniField) opiniField.value = '';
        }
    });
}

// opinions are collected but not displayed; storage remains available for sending elsewhere
function storeOpinion(opini) {
    const stored = JSON.parse(localStorage.getItem('opinions') || '[]');
    stored.push(opini);
    localStorage.setItem('opinions', JSON.stringify(stored));
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
    // apply slide-out on navigation links as well as any primary button with href
    const link = e.target.closest('a[href]');
    if (link && (link.matches('.nav-links a') || link.matches('.btn-primary'))) {
        e.preventDefault();
        const href = link.getAttribute('href');
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
        requestAnimationFrame(() => {
            detail.classList.add('show');
            // scroll only on small devices where card might be off-screen
            if (window.innerWidth <= 768) {
                detail.scrollIntoView({behavior: 'smooth', block: 'center'});
            }
        });
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
        const messages = [
            'aktivitas tambang mulai berdampak pada pohon yang ditebang',
            'satwa kehilangan habitat dan suara mesin makin ramai',
            'erosi tanah terlihat di sekeliling lokasi tambang',
            'kualitas udara menurun karena debu dan asap',
            'area hutan terambil lebih dari separuh',
            'sungai mulai keruh oleh sedimentasi',
            'beberapa spesies ikan menyusut populasinya',
            'jalan tambang meluas, pemukiman terganggu',
            'banjir kecil terjadi akibat kurangnya vegetasi',
            'muncul masalah kesehatan pernapasan di desa terdekat',
        ];
        // pilih deskripsi dari array berdasarkan tahun; gunakan year‑index untuk variasi
        const desc = messages[(tahun - 1) % messages.length];
        let hasil = `Tahun ke-${tahun}: ${desc}`;
        // tambahkan keterangan khusus untuk angka genap/kelipatan tertentu agar tiap teks unik
        if (tahun % 5 === 0) hasil += ' (angka kelipatan 5)';
        if (tahun % 100 === 0) hasil += ' [ini milestone seabad]';
        const output = document.getElementById('hasil-simulasi');
        if (output) output.textContent = hasil;
    });
}

// ...existing code...

// interaksi halaman detail
document.addEventListener('DOMContentLoaded', () => {
    // if any buttons still carry the clicked animation class, remove it
    document.querySelectorAll('.btn-clicked').forEach(el => el.classList.remove('btn-clicked'));

    // tombol fakta
    document.querySelectorAll('.fact-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const txt = btn.nextElementSibling;
            if (txt) {
                if (txt.style.display === 'none' || txt.style.display === '') {
                    txt.style.display = 'block';
                    txt.classList.add('slide-up');
                    // remove the animation class after finished so it can replay later
                    setTimeout(() => txt.classList.remove('slide-up'), 500);
                } else {
                    txt.style.display = 'none';
                }
            }
        });
    });

    // buat modal tunggal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = '<div class="modal-content"><span class="modal-close">&times;</span><div class="modal-body"></div></div>';
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });

    document.querySelectorAll('.impact-image').forEach(img => {
        img.addEventListener('click', () => {
            const info = img.getAttribute('data-info') || '';
            // include both info text and a copy of the image in the modal body
            const body = modal.querySelector('.modal-body');
            body.innerHTML = '';
            if (info) {
                const p = document.createElement('p');
                p.textContent = info;
                body.appendChild(p);
            }
            const clone = document.createElement('img');
            clone.src = img.src;
            clone.alt = img.alt || '';
            clone.style.width = '100%';
            clone.style.maxWidth = '400px';
            clone.style.marginTop = '1rem';
            body.appendChild(clone);

            // animate modal content from bottom
            const mc = modal.querySelector('.modal-content');
            mc.classList.remove('slide-up');
            modal.style.display = 'flex';
            requestAnimationFrame(() => mc.classList.add('slide-up'));
        });
    });

    // logika kuis sederhana
    // setiap pertanyaan bertindak sendiri
    // before wiring the click handlers, adjust paragraph text so number floats left
    document.querySelectorAll('.quiz-question p').forEach(p => {
        const match = p.textContent.match(/^Pertanyaan\s+(\d+):\s*(.*)/);
        if (match) {
            const num = match[1];
            const rest = match[2];
            p.innerHTML = `<span class="q-num">${num}.</span><span class="q-text">${rest}</span>`;
        }
    });

    document.querySelectorAll('.quiz-question').forEach(q => {
        q.addEventListener('click', e => {
            if (e.target.classList.contains('quiz-option')) {
                const resultEl = q.querySelector('.quiz-result');
                const correct = e.target.getAttribute('data-correct') === 'true';
                resultEl.textContent = correct ? 'Benar!' : 'Salah!';
                resultEl.style.color = correct ? 'green' : 'red';
            }
        });
    });

    // comparison page: swap right/left images when clicked and animate
    const leftImg = document.querySelector('.images-compare div:first-child img');
    const rightImg = document.querySelector('.images-compare div:last-child img');
    function makeSwapper(img) {
        if (!img) return;
        const original = img.src;
        img.setAttribute('data-original-src', original);
        // allow comma-separated list of alternates
        const altList = img.getAttribute('data-alt-src') || '';
        const alts = altList.split(',').map(s => s.trim()).filter(s => s);
        let index = 0; // tracks how many times clicked
        img.addEventListener('click', () => {
            if (alts.length === 0) return;
            index = (index + 1) % (alts.length + 1);
            const next = index === 0 ? original : alts[index - 1];
            img.classList.add('fading');
            setTimeout(() => {
                img.src = next;
                img.classList.remove('fading');
            }, 300);
        });
    }
    makeSwapper(leftImg);
    makeSwapper(rightImg);
});