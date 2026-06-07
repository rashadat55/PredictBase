import sdk from 'https://esm.sh/@farcaster/frame-sdk';

const MATCHES = [
    { id: 1, date: '11 June', time: '23:00', stage: 'Group A', stadium: 'Mexico City', home: { n: 'Mexico', c: 'MEX', f: '🇲🇽' }, away: { n: 'South Africa', c: 'RSA', f: '🇿🇦' } },
    { id: 2, date: '12 June', time: '06:00', stage: 'Group A', stadium: 'Guadalajara', home: { n: 'Korea Rep.', c: 'KOR', f: '🇰🇷' }, away: { n: 'Czechia', c: 'CZE', f: '🇨🇿' } },
    { id: 3, date: '12 June', time: '23:00', stage: 'Group B', stadium: 'Toronto', home: { n: 'Canada', c: 'CAN', f: '🇨🇦' }, away: { n: 'Bosnia', c: 'BIH', f: '🇧🇦' } },
    { id: 4, date: '13 June', time: '05:00', stage: 'Group D', stadium: 'Los Angeles', home: { n: 'USA', c: 'USA', f: '🇺🇸' }, away: { n: 'Paraguay', c: 'PAR', f: '🇵🇾' } }
    // Diğer maçlar dökümandaki gibi buraya eklenebilir.
];

async function init() {
    try {
        await sdk.actions.ready();
        const context = await sdk.context;
        if (context?.user) {
            document.getElementById('user-display').innerText = context.user.username;
        }
    } catch (e) {
        console.error("Farcaster SDK Error", e);
        document.getElementById('user-display').innerText = "Guest Mode";
    }
}

function render(filter = "") {
    const list = document.getElementById('match-list');
    const filtered = MATCHES.filter(m => 
        m.home.n.toLowerCase().includes(filter.toLowerCase()) || 
        m.away.n.toLowerCase().includes(filter.toLowerCase()) ||
        m.stage.toLowerCase().includes(filter.toLowerCase())
    );

    list.innerHTML = filtered.map(m => `
        <div class="card p-4 flex flex-col gap-3">
            <div class="flex justify-between items-start text-[8px] font-bold text-gray-500 uppercase tracking-widest">
                <div>${m.stage} • ${m.stadium}</div>
                <div class="text-green-500">${m.date} • ${m.time}</div>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex flex-col items-center w-[40%] gap-1">
                    <div class="team-orb">${m.home.f}</div>
                    <div class="font-display text-[11px] font-black uppercase text-center leading-tight">${m.home.n}</div>
                </div>
                <div class="font-display text-xl font-black text-gray-800">VS</div>
                <div class="flex flex-col items-center w-[40%] gap-1">
                    <div class="team-orb">${m.away.f}</div>
                    <div class="font-display text-[11px] font-black uppercase text-center leading-tight">${m.away.n}</div>
                </div>
            </div>
            <div class="flex justify-between items-center border-t border-white/5 pt-3">
                <div class="text-[8px] font-bold text-gray-600 uppercase">Pool: Live on Base</div>
                <button onclick="window.openModal(${m.id})" class="btn-primary px-6 py-2 text-[10px] uppercase">Predict</button>
            </div>
        </div>
    `).join('');
}

window.openModal = (id) => {
    const m = MATCHES.find(x => x.id === id);
    document.getElementById('modal-title').innerText = `${m.home.c} VS ${m.away.c}`;
    document.getElementById('m-home-flag').innerText = m.home.f;
    document.getElementById('m-away-flag').innerText = m.away.f;
    document.getElementById('m-home-code').innerText = m.home.c;
    document.getElementById('m-away-code').innerText = m.away.c;
    document.getElementById('predict-modal').classList.add('open');
};

document.getElementById('confirm-btn').onclick = async () => {
    // Burada ileride sdk.actions.sendTransaction eklenebilir
    alert("Prediction Saved! Sending to Base Network...");
    document.getElementById('predict-modal').classList.remove('open');
};

document.getElementById('modal-close').onclick = () => document.getElementById('predict-modal').classList.remove('open');
document.getElementById('match-search').oninput = (e) => render(e.target.value);

init();
render();
