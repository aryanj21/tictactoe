let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let player1Name = '';
let player2Name = '';
let isSinglePlayer = false; // To track if it's a single player game
const boardElement = document.getElementById('board');
const winnerPopup = document.getElementById('winnerPopup');
const partyPopper = document.getElementById('partyPopper');
const boardContainer = document.getElementById('boardContainer');
const nameInputs = document.getElementById('nameInputs');
const modeSelection = document.getElementById('modeSelection');
const player2Label = document.getElementById('player2Label');
const backBtn = document.getElementById('backBtn');

// Select game mode
function chooseMode(mode) {
    isSinglePlayer = (mode === 'single');
    modeSelection.style.display = 'none';
    nameInputs.style.display = 'block';
    backBtn.style.display = 'block';

    // Show player 2 name input only if multiplayer is selected
    if (isSinglePlayer) {
        player2Label.style.display = 'none';
        document.getElementById('player2Name').style.display = 'none';
    } else {
        player2Label.style.display = 'inline';
        document.getElementById('player2Name').style.display = 'inline';
    }
}

// Go back to mode selection
function goBack() {
    modeSelection.style.display = 'block';
    nameInputs.style.display = 'none';
    backBtn.style.display = 'none';
}

// Start the game
function startGame() {
    player1Name = document.getElementById('player1Name').value;
    player2Name = isSinglePlayer ? 'Computer' : document.getElementById('player2Name').value;

    if (!player1Name) {
        alert('Please enter a name!');
        return;
    }

    nameInputs.style.display = 'none';
    boardContainer.style.display = 'block';
    createBoard();
}

// Create the game board
function createBoard() {
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => makeMove(i));
        boardElement.appendChild(cell);
    }
}

// Make a move
function makeMove(index) {
    if (gameOver || board[index] !== '') return;
    board[index] = currentPlayer;
    updateBoard();
    if (checkWin()) {
        setTimeout(() => {
            showWinnerPopup();
        }, 200);
        gameOver = true;
    } else if (board.every(cell => cell !== '')) {
        setTimeout(() => {
            showDrawPopup();
        }, 200);
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (isSinglePlayer && currentPlayer === 'O' && !gameOver) {
            setTimeout(() => {
                computerMove();
            }, 500);
        }
    }
}

// Update the board UI
function updateBoard() {
    const cells = boardElement.getElementsByClassName('cell');
    for (let i = 0; i < board.length; i++) {
        cells[i].textContent = board[i];
    }
}

// Check for a win
function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        if (board[pattern[0]] === board[pattern[1]] && board[pattern[1]] === board[pattern[2]] && board[pattern[0]] !== '') {
            return true;
        }
    }
    return false;
}

// Show the winner popup
function showWinnerPopup() {
    winnerPopup.style.display = 'block';
    winnerPopup.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} wins!`;
    partyPopper.style.display = 'block';
}

// Show draw popup
function showDrawPopup() {
    winnerPopup.style.display = 'block';
    winnerPopup.textContent = 'It\'s a draw!';
}

// Reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    winnerPopup.style.display = 'none';
    partyPopper.style.display = 'none';
    createBoard();
    boardContainer.style.display = 'none';
    modeSelection.style.display = 'block';
    backBtn.style.display = 'none';
}

// Computer move (Single Player only)
function computerMove() {
    let emptyCells = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') emptyCells.push(i);
    }

    let randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomMove] = 'O';
    updateBoard();

    if (checkWin()) {
        setTimeout(() => {
            showWinnerPopup();
        }, 200);
        gameOver = true;
    } else if (board.every(cell => cell !== '')) {
        setTimeout(() => {
            showDrawPopup();
        }, 200);
        gameOver = true;
    } else {
        currentPlayer = 'X';
    }
}
