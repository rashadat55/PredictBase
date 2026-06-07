import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

const MATCHES = [
    { id: 1, home: { n: 'Mexico', c: 'MEX', f: '🇲🇽' }, away: { n: 'South Africa', c: 'RSA', f: '🇿🇦' }, stage: 'Group A' },
    { id: 8, home: { n: 'Australia', c: 'AUS', f: '🇦🇺' }, away: { n: 'Türkiye', c: 'TUR', f: '🇹🇷' }, stage: 'Group D' }
];

let ENV = 'web'; // 'farcaster' veya 'web'
let connectedAddress = null;

async function setupWallet() {
    try {
        if (ENV === 'farcaster') {
            const fcProvider = sdk.wallet.ethProvider;
            const accounts = await fcProvider.request({ method: 'eth_requestAccounts' });
            connectedAddress = accounts[0];
        } else {
            if (!window.ethereum) return alert("No wallet found");
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            connectedAddress = accounts[0];
        }
        document.getElementById('wallet-btn').innerText = connectedAddress.slice(0, 6) + '...';
    } catch (e) { console.error(e); }
}

function render(filter = "") {
    const list = document.getElementById('match-list');
    list.innerHTML = MATCHES.filter(m => m.home.n.toLowerCase().includes(filter.toLowerCase())).map(m => `
        <div class="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
            <div class="text-center w-1/3"><div class="text-2xl">${m.home.f}</div><div class="text-[10px] font-bold">${m.home.n}</div></div>
            <div class="text-xs font-black">VS</div>
            <div class="text-center w-1/3"><div class="text-2xl">${m.away.f}</div><div class="text-[10px] font-bold">${m.away.n}</div></div>
            <button onclick="window.openModal(${m.id})" class="bg-emerald-500 text-black px-3 py-1 rounded-lg text-[10px] font-bold">PREDICT</button>
        </div>
    `).join('');
}

window.openModal = (id) => {
    const m = MATCHES.find(x => x.id === id);
    document.getElementById('modal-title').innerText = `${m.home.c} VS ${m.away.c}`;
    document.getElementById('m-home-flag').innerText = m.home.f;
    document.getElementById('m-away-flag').innerText = m.away.f;
    document.getElementById('predict-modal').style.display = 'flex';
};

async function init() {
    render();
    document.getElementById('wallet-btn').onclick = setupWallet;
    document.getElementById('modal-close').onclick = () => document.getElementById('predict-modal').style.display = 'none';
    
    try {
        await sdk.actions.ready(); // Bu satır Frame'in içinde kalmasını sağlar
        const context = await sdk.context;
        if (context?.user) {
            ENV = 'farcaster';
            setupWallet(); // Otomatik bağlanmayı dene
        }
    } catch (e) {
        console.log("Running in browser mode");
    }
}

init();
