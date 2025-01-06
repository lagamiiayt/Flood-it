const SIZE = 12;
const COLORS = 5;
const MAX_MOVES = 19;
let moves = 0;
let map = [];
let colorButtons = [];
let gameBoard = document.getElementById('game-board');
let attemptsLabel = document.getElementById('attempts');

// Функция для генерации случайной карты
function generateMap() {
    map = [];
    for (let i = 0; i < SIZE; i++) {
        map[i] = [];
        for (let j = 0; j < SIZE; j++) {
            map[i][j] = Math.floor(Math.random() * COLORS);
        }
    }
}

// Функция для получения цвета по индексу
function getColor(index) {
    switch (index) {
        case 0: return 'red';
        case 1: return 'blue';
        case 2: return 'green';
        case 3: return 'yellow';
        case 4: return 'black';
        default: return 'gray';
    }
}

// Функция для обновления отображения поля
function updateBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.backgroundColor = getColor(map[i][j]);
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.onclick = () => handleCellClick(i, j);
            gameBoard.appendChild(cell);
        }
    }
}

// Обработчик нажатия на клетку
function handleCellClick(i, j) {
    let targetColor = map[0][0];
    let selectedColor = map[i][j];
    if (selectedColor !== targetColor) {
        floodFill(0, 0, targetColor, selectedColor);
        moves++;
        updateBoard();
        updateAttempts();
        if (isUniform()) {
            alert(`Вы победили за ${moves} ходов!`);
            resetGame();
        } else if (moves >= MAX_MOVES) {
            alert('Вы проиграли!');
            resetGame();
        }
    }
}

// Алгоритм заливки (flood fill)
function floodFill(x, y, targetColor, newColor) {
    if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) return;
    if (map[x][y] !== targetColor || map[x][y] === newColor) return;

    map[x][y] = newColor;

    floodFill(x - 1, y, targetColor, newColor);
    floodFill(x + 1, y, targetColor, newColor);
    floodFill(x, y - 1, targetColor, newColor);
    floodFill(x, y + 1, targetColor, newColor);
}

// Проверка, является ли поле одноцветным
function isUniform() {
    let color = map[0][0];
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (map[i][j] !== color) return false;
        }
    }
    return true;
}

// Обновление количества оставшихся ходов
function updateAttempts() {
    attemptsLabel.textContent = `Осталось ходов: ${MAX_MOVES - moves}`;
}

// Обработчик выбора цвета
function chooseColor(colorIndex) {
    let targetColor = map[0][0];
    if (targetColor !== colorIndex) {
        floodFill(0, 0, targetColor, colorIndex);
        moves++;
        updateBoard();
        updateAttempts();
        if (isUniform()) {
            alert(`Вы победили за ${moves} ходов!`);
            resetGame();
        } else if (moves >= MAX_MOVES) {
            alert('Вы проиграли!');
            resetGame();
        }
    }
}

// Сброс игры
function resetGame() {
    generateMap();
    moves = 0;
    updateBoard();
    updateAttempts();
}

// Запуск игры
generateMap();
updateBoard();
updateAttempts();
