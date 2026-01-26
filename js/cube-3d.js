// 3D куб с транзакциями

// Создание куба с 6 гранями по 9 транзакций
function createCube() {
    const cubeContainer = document.getElementById('cube-container');
    if (!cubeContainer) return;
    
    const faces = [
        { name: 'front', class: 'face-front' },
        { name: 'back', class: 'face-back' },
        { name: 'right', class: 'face-right' },
        { name: 'left', class: 'face-left' },
        { name: 'top', class: 'face-top' },
        { name: 'bottom', class: 'face-bottom' }
    ];
    
    faces.forEach(face => {
        const faceElement = document.createElement('div');
        faceElement.className = `cube-face cube-face-${face.name} ${face.class}`;
        faceElement.id = `face-${face.name}`;
        
        // Создаем 9 ячеек для транзакций на каждой грани
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'transaction-cell';
            cell.id = `cell-${face.name}-${i}`;
            
            // Используем функцию из blockchain-simulator.js
            const transaction = window.generateTransaction ? window.generateTransaction() : {
                hash: '0x0000000000000000',
                value: '0.00',
                gas: '21000',
                gasPrice: '20'
            };
            
            cell.innerHTML = `
                <div class="tx-cell-hash">${transaction.hash.substring(0, 10)}...</div>
                <div class="tx-cell-value">${transaction.value} ETH</div>
                <div class="tx-cell-details">
                    <span>G:${transaction.gas}</span>
                    <span>P:${transaction.gasPrice}</span>
                </div>
            `;
            
            faceElement.appendChild(cell);
        }
        
        cubeContainer.appendChild(faceElement);
    });
}

// Инициализация куба
function initCube() {
    createCube();
}

// Экспортируем функцию инициализации
window.initCube = initCube;