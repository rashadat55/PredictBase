import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

// Yapılandırma
const RECEIVER_ADDRESS = "0x6B5C4E1E11217318e039eE40B26174316f896a7D"; // Kendi cüzdan adresinle değiştir
const BASE_CHAIN_ID = 8453; // Base Mainnet

const MATCHES = [
    { id: 1, date: 'Thu 11 June 2026', time: '23:00', stage: 'Group A', stadium: 'Mexico City', home: { n: 'Mexico', c: 'MEX', f: '🇲🇽' }, away: { n: 'South Africa', c: 'RSA', f: '🇿🇦' } },
    { id: 2, date: 'Fri 12 June 2026', time: '06:00', stage: 'Group A', stadium: 'Guadalajara', home: { n: 'Korea Republic', c: 'KOR', f: '🇰🇷' }, away: { n: 'Czechia', c: 'CZE', f: '🇨🇿' } },
    { id: 8, date: 'Sun 14 June 2026', time: '08:00', stage: 'Group D', stadium: 'Vancouver', home: { n: 'Australia', c: 'AUS', f: '🇦🇺' }, away: { n: 'Türkiye', c: 'TUR', f: '🇹🇷' } },
    // Diğer maçları buraya eklemeye devam edebilirsin...
];

let ENV = 'web'; // 'farcaster' veya 'web'
let connectedAddress = null;

// ─── CÜZDAN YÖNETİMİ ──────────────────────────────────────────────────────────

async function setupWallet() {
    const btn = document.getElementById('wallet-btn');
    btn.innerText = "CONNECTING...";

    try {
        if (ENV === 'farcaster') {
            // Farcaster Provider'ı kullan
            const fcProvider = sdk.wallet.ethProvider;
            const accounts = await fcProvider.request({ method: 'eth_requestAccounts' });
            connectedAddress = accounts[0];
        } else {
            // Standart Tarayıcı Provider'ı kullan (Metamask, Coinbase vb.)
            if (!window.ethereum) throw new Error("No wallet found");
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            connectedAddress = accounts[0];
            
            // Base ağına geçiş kontrolü (Sadece web modunda)
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (parseInt(chainId, 16) !== BASE_CHAIN_ID) {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x2105' }], // 8453 in hex
                });
            }
        }

        if (connectedAddress) {
            btn.innerText = `${connectedAddress.slice(0, 4)}...${connectedAddress.slice(-4)}`;
            btn.classList.add('border-emerald-500');
            console.log("Connected:", connectedAddress);
        }
    } catch (e) {
        console.error("Wallet Error:", e);
        btn.innerText = "CONNECT WALLET";
    }
}

// ─── İŞLEM GÖNDERME (BASE NETWORK) ──────────────────────────────────────────

async function handleTransaction() {
    if (!connectedAddress) {
        await setupWallet();
        return;
    }

    const confirmBtn = document.getElementById('confirm-btn');
    confirmBtn.innerText = "SENDING...";
    confirmBtn.disabled = true;

    try {
        const txParams = {
            from: connectedAddress,
            to: RECEIVER_ADDRESS,
            value: "0x38D7EA4C68000", // 0.001 ETH (Hex formatında)
            chainId: BASE_CHAIN_ID
        };

        let txHash;
        if (ENV === 'farcaster') {
            txHash = await sdk.wallet.ethProvider.request({
                method: 'eth_sendTransaction',
                params: [txParams]
            });
        } else {
            txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [txParams]
            });
        }

        alert("Prediction sent to Base! Hash: " + txHash);
        document.getElementById('predict-modal').style.display = 'none';
    } catch (e) {
        console.error("TX Error:", e);
        alert("Transaction failed!");
    } finally {
        confirmBtn.innerText = "CONFIRM PREDICTION";
        confirmBtn.disabled = false;
    }
}

// ─── UI RENDER ───────────────────────────────────────────────────────────────

function render(filter = "") {
    const list = document.getElementById('match-list');
    if (!list) return;

    const filtered = MATCHES.filter(m => 
        m.home.n.toLowerCase().includes(filter.toLowerCase()) || 
        m.away.n.toLowerCase().includes(filter.toLowerCase())
    );

    list.innerHTML = filtered.map(m => `
        <div class="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center transition-all active:scale-95">
            <div class="flex flex-col items-center w-1/3">
                <div class="text-3xl mb-1">${m.home.f}</div>
                <div class="text-[10px] font-black uppercase text-center text-white">${m.home.n}</div>
            </div>
            <div class="flex flex-col items-center justify-center">
                <div class="text-[8px] text-emerald-500 font-black mb-1 uppercase tracking-widest">${m.stage}</div>
                <div class="text-xl font-black text-gray-400">VS</div>
                <div class="text-[8px] text-gray-500 mt-1 font-bold">${m.time}</div>
            </div>
            <div class="flex flex-col items-center w-1/3">
                <div class="text-3xl mb-1">${m.away.f}</div>
                <div class="text-[10px] font-black uppercase text-center text-white">${m.away.n}</div>
            </div>
            <button onclick="window.openModal(${m.id})" class="absolute inset-0 w-full h-full opacity-0">Predict</button>
            <div class="absolute right-4 bg-emerald-500/10 p-2 rounded-full border border-emerald-500/20">
                 <svg class="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path></svg>
            </div>
        </div>
    `).join('');
}

// Global modal açma fonksiyonu (HTML'den erişilebilmesi için)
window.openModal = (id) => {
    const m = MATCHES.find(x => x.id === id);
    if (!m) return;

    document.getElementById('modal-title').innerText = `${m.home.c} VS ${m.away.c}`;
    document.getElementById('m-home-flag').innerText = m.home.f;
    document.getElementById('m-away-flag').innerText = m.away.f;
    document.getElementById('m-home-code').innerText = m.home.c;
    document.getElementById('m-away-code').innerText = m.away.c;
    
    document.getElementById('predict-modal').style.display = 'flex';
};

// ─── BAŞLATMA (INIT) ──────────────────────────────────────────────────────────

async function init() {
    console.log("App Initializing...");
    
    // 1. Önce içeriği çiz
    render();

    // 2. Event Listeners
    document.getElementById('match-search').oninput = (e) => render(e.target.value);
    document.getElementById('wallet-btn').onclick = setupWallet;
    document.getElementById('modal-close').onclick = () => document.getElementById('predict-modal').style.display = 'none';
    document.getElementById('confirm-btn').onclick = handleTransaction;

    // 3. Farcaster SDK Bağlantısı
    try {
        await sdk.actions.ready(); // Farcaster Splash Screen'i kapatır
        
        const context = await sdk.context;
        if (context?.user) {
            ENV = 'farcaster';
            console.log("Farcaster Mode Active:", context.user.username);
            document.getElementById('user-display').innerText = context.user.username.toUpperCase();
            
            // Otomatik cüzdan bağlamayı dene
            setupWallet();
        }
    } catch (e) {
        console.warn("Running in standard browser mode.");
        ENV = 'web';
        document.getElementById('user-display').innerText = "BROWSER MODE";
    }
}

// Uygulamayı çalıştır
init();
