// Главный файл инициализации
let isPaused = false;
let glitchMode = false;

// Элементы DOM
const statusText = document.getElementById('status-text');
const systemStatus = document.getElementById('system-status');
const pauseBtn = document.getElementById('pause-btn');
const glitchBtn = document.getElementById('glitch-btn');
const appState = {
    get isPaused() { return isPaused; },
    get glitchMode() { return glitchMode; }
};

window.appState = appState;

// Инициализация приложения
function init() {
    // Настраиваем обработчики кнопок
    pauseBtn.addEventListener('click', function() {
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? 'ПРОДОЛЖИТЬ' : 'ПАУЗА';
        systemStatus.textContent = isPaused ? 'ПАУЗА' : 'АКТИВНА';
        statusText.textContent = isPaused ? 'СИСТЕМА НА ПАУЗЕ' : 'ПОДКЛЮЧЕНИЕ К СЕТИ ETHEREUM...';
        pauseBtn.style.borderColor = isPaused ? 'var(--neon-pink)' : 'var(--neon-blue)';
        
        // Пауза/возобновление анимации куба
        const cubeContainer = document.querySelector('.cube-container');
        if (cubeContainer) {
            if (isPaused) {
                cubeContainer.style.animationPlayState = 'paused';
            } else {
                cubeContainer.style.animationPlayState = 'running';
            }
        }
    });
    
    glitchBtn.addEventListener('click', function() {
        glitchMode = !glitchMode;
        glitchBtn.textContent = glitchMode ? 'НОРМАЛЬНЫЙ РЕЖИМ' : 'ГЛИТЧ';
        glitchBtn.style.borderColor = glitchMode ? 'var(--neon-pink)' : 'var(--neon-blue)';
        document.body.classList.toggle('glitch-mode', glitchMode);
        
        if (glitchMode) {
            statusText.textContent = 'РЕЖИМ ГЛИТЧ АКТИВИРОВАН';
        } else {
            statusText.textContent = 'ПОДКЛЮЧЕНИЕ К СЕТИ ETHEREUM...';
        }
    });
    
    statusText.textContent = 'ПОДКЛЮЧЕНО. ОЖИДАНИЕ НОВЫХ ТРАНЗАКЦИЙ...';
    
    // Инициализация фона
    initBackground();
    
    // Инициализация куба
    initCube();
    
    // Инициализация симулятора блокчейна
    initBlockchainSimulator();
}

// Инициализация анимированного фона
function initBackground() {
    const particlesContainer = document.getElementById('particles-container');
    const dataStream = document.getElementById('data-stream');
    
    // Создание частиц
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particlesContainer.appendChild(particle);
    }
    
    // Создание потоков данных
    const streamTexts = [
        "0x1a2b3c4d5e6f7890...", "TRANSACTION COMPLETE", "BLOCK #19483294 MINED",
        "GAS: 21000", "VALUE: 1.5 ETH", "CONTRACT INTERACTION",
        "DECENTRALIZED FINANCE", "SMART CONTRACT EXECUTED", "NFT TRANSFER",
        "WEB3.0 ACTIVE", "NODE SYNCED", "BLOCKCHAIN VERIFIED"
    ];
    
    for (let i = 0; i < 8; i++) {
        const stream = document.createElement('div');
        stream.className = 'stream';
        stream.textContent = streamTexts[Math.floor(Math.random() * streamTexts.length)];
        stream.style.left = `${Math.random() * 90}%`;
        stream.style.animationDelay = `${Math.random() * 20}s`;
        stream.style.animationDuration = `${15 + Math.random() * 10}s`;
        dataStream.appendChild(stream);
    }
}

// Запуск приложения
window.onload = init;
