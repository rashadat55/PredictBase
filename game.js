
import sdk from "https://esm.sh/@farcaster/frame-sdk";

// Maç listesi (Verdiğiniz listenin aynısı)
const MATCHES = [
    { id: 1, date: 'Thu 11 June 2026', time: '23:00', stage: 'Group A', stadium: 'Mexico City', home: { n: 'Mexico', c: 'MEX', f: '🇲🇽' }, away: { n: 'South Africa', c: 'RSA', f: '🇿🇦' } },
    { id: 8, date: 'Sun 14 June 2026', time: '08:00', stage: 'Group D', stadium: 'Vancouver', home: { n: 'Australia', c: 'AUS', f: '🇦🇺' }, away: { n: 'Türkiye', c: 'TUR', f: '🇹🇷' } },
    // ... diğer maçlar
];

// ✅ MODÜL KAPSAMI ÇÖZÜMÜ: Fonksiyonu pencereye bağla
window.openModal = (id) => {
    const m = MATCHES.find(x => x.id === id);
    if(!m) return;
    
    document.getElementById('modal-title').innerText = `${m.home.c} VS ${m.away.c}`;
    document.getElementById('m-home-flag').innerText = m.home.f;
    document.getElementById('m-away-flag').innerText = m.away.f;
    document.getElementById('m-home-code').innerText = m.home.c;
    document.getElementById('m-away-code').innerText = m.away.c;
    
    const modal = document.getElementById('predict-modal');
    modal.style.display = 'block'; 
};

function render(filter = "") {
    const list = document.getElementById('match-list');
    if(!list) return;

    const filtered = MATCHES.filter(m => 
        m.home.n.toLowerCase().includes(filter.toLowerCase()) || 
        m.away.n.toLowerCase().includes(filter.toLowerCase())
    );

    list.innerHTML = filtered.map(m => `
        <div class="bg-[#111] p-4 rounded-xl border border-white/10">
            <div class="flex justify-between text-[10px] text-gray-500 mb-2">
                <span>${m.stage}</span>
                <span>${m.date}</span>
            </div>
            <div class="flex justify-between items-center">
                <div class="text-center w-1/3">
                    <div class="text-2xl">${m.home.f}</div>
                    <div class="text-xs font-bold">${m.home.n}</div>
                </div>
                <div class="text-xl font-black">VS</div>
                <div class="text-center w-1/3">
                    <div class="text-2xl">${m.away.f}</div>
                    <div class="text-xs font-bold">${m.away.n}</div>
                </div>
            </div>
            <button onclick="openModal(${m.id})" class="w-full mt-4 bg-green-600 py-2 rounded-lg text-xs font-bold uppercase">Predict</button>
        </div>
    `).join('');
}

async function init() {
    try {
        render(); // Önce maçları göster
        
        // Farcaster SDK'yı başlat
        console.log("SDK initializing...");
        await sdk.actions.ready();
        const context = await sdk.context;
        
        if (context?.user) {
            document.getElementById('user-display').innerText = context.user.username;
        }
    } catch (e) {
        console.error("SDK Error:", e);
    }
}

// Event Listeners
document.getElementById('modal-close').onclick = () => {
    document.getElementById('predict-modal').style.display = 'none';
};

document.getElementById('match-search').oninput = (e) => render(e.target.value);

document.getElementById('confirm-btn').onclick = () => {
    alert("Prediction Saved!");
    document.getElementById('predict-modal').style.display = 'none';
};

// Başlat
init();
