// Симулятор блокчейна для демо
let totalTransactions = 0;
let currentBlock = 19483294;
let avgFee = 0;
let simulatorIntervalId = null;

const currentBlockEl = document.getElementById('current-block');
const totalTransactionsEl = document.getElementById('total-transactions');
const avgFeeEl = document.getElementById('avg-fee');
const updateTimeEl = document.getElementById('update-time');

function randomHex(length) {
    const chars = '0123456789abcdef';
    let result = '0x';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

function generateTransaction() {
    const value = (Math.random() * 3.5 + 0.01).toFixed(3);
    const gas = Math.floor(21000 + Math.random() * 90000);
    const gasPrice = Math.floor(10 + Math.random() * 120);

    return {
        hash: randomHex(16),
        value,
        gas: gas.toString(),
        gasPrice: gasPrice.toString()
    };
}

function formatNumber(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function updateStats(transactionCount, lastGasPrice) {
    totalTransactions += transactionCount;
    if (Math.random() > 0.7) {
        currentBlock += 1;
    }

    avgFee = avgFee === 0
        ? lastGasPrice
        : avgFee * 0.8 + lastGasPrice * 0.2;

    if (currentBlockEl) currentBlockEl.textContent = formatNumber(currentBlock);
    if (totalTransactionsEl) totalTransactionsEl.textContent = formatNumber(totalTransactions);
    if (avgFeeEl) avgFeeEl.textContent = `${avgFee.toFixed(1)} GWEI`;
    if (updateTimeEl) updateTimeEl.textContent = new Date().toLocaleTimeString('ru-RU');
}

function updateCubeCells(transactions) {
    const cells = Array.from(document.querySelectorAll('.transaction-cell'));
    if (!cells.length) return;

    transactions.forEach((tx) => {
        const target = cells[Math.floor(Math.random() * cells.length)];
        if (!target) return;

        target.innerHTML = `
            <div class="tx-cell-hash">${tx.hash.substring(0, 10)}...</div>
            <div class="tx-cell-value">${tx.value} ETH</div>
            <div class="tx-cell-details">
                <span>G:${tx.gas}</span>
                <span>P:${tx.gasPrice}</span>
            </div>
        `;
    });
}

function tickSimulator() {
    if (window.appState && window.appState.isPaused) return;

    const batchSize = Math.floor(2 + Math.random() * 4);
    const transactions = [];
    for (let i = 0; i < batchSize; i++) {
        transactions.push(generateTransaction());
    }

    const lastGasPrice = Number(transactions[transactions.length - 1].gasPrice);
    updateStats(transactions.length, lastGasPrice);
    updateCubeCells(transactions);
}

function initBlockchainSimulator() {
    if (simulatorIntervalId) return;
    tickSimulator();
    simulatorIntervalId = setInterval(tickSimulator, 2000);
}

window.generateTransaction = generateTransaction;
window.initBlockchainSimulator = initBlockchainSimulator;
