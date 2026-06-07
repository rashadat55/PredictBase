import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

// --- YAPILANDIRMA ---
const TARGET_WALLET = "0xEA61090CB8351b44D8207674dD6d89742dca857E"; // Paranın gideceği senin adresin
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // Base Mainnet USDC Kontratı
const BASE_CHAIN_ID = 8453;

// --- MAÇ LİSTESİ (104 Maçın Hepsi - Kısa kesiyorum, sendeki tam listeyi buraya koy) ---
const MATCHES = [
    { id: 1, date: 'Thu 11 June 2026', time: '23:00', stage: 'Group A', stadium: 'Mexico City', home: { n: 'Mexico', c: 'MEX', f: '🇲🇽' }, away: { n: 'South Africa', c: 'RSA', f: '🇿🇦' } },
    { id: 2, date: 'Fri 12 June 2026', time: '06:00', stage: 'Group A', stadium: 'Guadalajara', home: { n: 'Korea Republic', c: 'KOR', f: '🇰🇷' }, away: { n: 'Czechia', c: 'CZE', f: '🇨🇿' } },
    // ... Buraya diğer 102 maçı ekle
];

let ENV = 'web';
let connectedAddress = null;

// --- CÜZDAN BAĞLAMA ---
async function setupWallet() {
    const btn = document.getElementById('wallet-btn');
    btn.innerText = "CONNECTING...";
    try {
        if (ENV === 'farcaster') {
            const fcProvider = sdk.wallet.ethProvider;
            const accounts = await fcProvider.request({ method: 'eth_requestAccounts' });
            connectedAddress = accounts[0];
        } else {
            if (!window.ethereum) { alert("Please use a Web3 browser"); return; }
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            connectedAddress = accounts[0];
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (parseInt(chainId, 16) !== BASE_CHAIN_ID) {
                await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x2105' }] });
            }
        }
        if (connectedAddress) {
            btn.innerText = `${connectedAddress.slice(0, 5)}...${connectedAddress.slice(-4)}`;
            btn.style.color = "#10b981";
        }
    } catch (e) { btn.innerText = "CONNECT"; }
}

// --- USDC İŞLEMİ GÖNDERME (2 USDC) ---
async function handleTransaction() {
    if (!connectedAddress) { await setupWallet(); if (!connectedAddress) return; }

    const confirmBtn = document.getElementById('confirm-btn');
    confirmBtn.disabled = true;
    confirmBtn.innerText = "APPROVING USDC...";

    try {
        /* 
           ERC-20 Transfer Verisi Oluşturma:
           Method ID (transfer): 0xa9059cbb
           Param 1: Alıcı adresi (32 byte padding)
           Param 2: Miktar (0.002 USDC = 2,000 = 0x1e8480) (32 byte padding)
        */
        const cleanAddress = TARGET_WALLET.toLowerCase().replace("0x", "");
        const abiMethod = "0xa9059cbb"; 
        const paddedAddress = cleanAddress.padStart(64, "0");
        const amountHex = (2000).toString(16).padStart(64, "0"); // 0.002 USDC (6 Decimals)
        
        const transactionData = abiMethod + paddedAddress + amountHex;

        const txParams = {
            from: connectedAddress,
            to: USDC_ADDRESS, // İşlem USDC kontratına gidiyor
            data: transactionData, // Transfer komutu burada
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

        alert("2 USDC Prediction Payment Sent! Hash: " + txHash);
        document.getElementById('predict-modal').style.display = 'none';
    } catch (err) {
        console.error(err);
        alert("Transaction failed! Make sure you have USDC on Base.");
    } finally {
        confirmBtn.disabled = false;
        confirmBtn.innerText = "CONFIRM PREDICTION";
    }
}

// --- RENDER VE MODAL (Aynı kalabilir) ---
function render(filter = "") {
    const list = document.getElementById('match-list');
    if (!list) return;
    const filtered = MATCHES.filter(m => m.home.n.toLowerCase().includes(filter.toLowerCase()) || m.away.n.toLowerCase().includes(filter.toLowerCase()));
    list.innerHTML = filtered.map(m => `
        <div class="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center relative mb-4">
            <div class="flex flex-col items-center w-1/3">
                <div class="text-3xl mb-1">${m.home.f}</div>
                <div class="text-[10px] font-black text-white text-center">${m.home.n}</div>
            </div>
            <div class="flex flex-col items-center">
                <div class="text-[7px] text-emerald-400 font-bold uppercase">${m.stage}</div>
                <div class="text-lg font-black text-white/30">VS</div>
                <div class="text-[7px] text-gray-500 font-bold">${m.date}</div>
            </div>
            <div class="flex flex-col items-center w-1/3">
                <div class="text-3xl mb-1">${m.away.f}</div>
                <div class="text-[10px] font-black text-white text-center">${m.away.n}</div>
            </div>
            <button onclick="window.openModal(${m.id})" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"></button>
        </div>
    `).join('');
}

window.openModal = (id) => {
    const m = MATCHES.find(x => x.id === id);
    if (!m) return;
    document.getElementById('modal-title').innerText = `${m.home.c} VS ${m.away.c}`;
    document.getElementById('m-home-flag').innerText = m.home.f;
    document.getElementById('m-away-flag').innerText = m.away.f;
    document.getElementById('predict-modal').style.display = 'flex';
};

// --- INIT ---
async function init() {
    render();
    document.getElementById('match-search').oninput = (e) => render(e.target.value);
    document.getElementById('wallet-btn').onclick = setupWallet;
    document.getElementById('modal-close').onclick = () => document.getElementById('predict-modal').style.display = 'none';
    document.getElementById('confirm-btn').onclick = handleTransaction;

    try {
        await sdk.actions.ready();
        const context = await sdk.context;
        if (context?.user) {
            ENV = 'farcaster';
            document.getElementById('user-display').innerText = context.user.username.toUpperCase();
            setupWallet();
        }
    } catch (e) {
        ENV = 'web';
        document.getElementById('user-display').innerText = "WEB MODE";
    }
}

init();
