<!DOCTYPE html>
<html>
<head>
    <title>Farcaster Frame</title>
    <!-- Tailwind CSS (Görünüm için) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        #predict-modal { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.7); align-items: center; justify-content: center; z-index: 50; }
    </style>
</head>
<body class="bg-gray-100">

    <div class="p-4 max-w-md mx-auto">
        <div id="user-display" class="mb-4 text-center font-bold text-purple-700"></div>
        <input type="text" id="match-search" placeholder="Search matches..." class="w-full p-2 mb-4 border rounded">
        
        <div id="match-list"></div>
    </div>

    <!-- Modal Yapısı -->
    <div id="predict-modal">
        <div class="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
            <h2 id="modal-title" class="font-bold mb-4"></h2>
            <div class="flex justify-around text-2xl mb-4">
                <span id="m-home-flag"></span>
                <span>VS</span>
                <span id="m-away-flag"></span>
            </div>
            <div class="flex justify-around text-xs mb-4">
                <span id="m-home-code"></span>
                <span id="m-away-code"></span>
            </div>
            <button id="confirm-btn" class="bg-green-500 text-white px-4 py-2 rounded w-full mb-2">Confirm</button>
            <button id="modal-close" class="text-gray-500 text-sm">Cancel</button>
        </div>
    </div>

    <!-- ✅ ÖNEMLİ: type="module" eklenmeli -->
    <script type="module" src="game.js"></script>
</body>
</html>
