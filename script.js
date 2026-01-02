// Get DOM elements
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const submitBtn = document.getElementById('submit');
const messageEl = document.querySelector('.message');
const cells = Array.from({ length: 9 }, (_, i) =>
  document.getElementById(String(i + 1))
);

// Game state
let player1Name = '';
let player2Name = '';
let currentPlayer = 'x'; // 'x' or 'o'
let currentPlayerName = '';
let board = Array(9).fill('');
let gameOver = false;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function setMessage(text) {
  // NO extra spaces, NO extra text; exact text for Cypress
  messageEl.textContent = text;
}

function startGame() {
  // Read names (tests type "Player1" and "Player2")
  player1Name = player1Input.value || 'Player1';
  player2Name = player2Input.value || 'Player2';

  // Reset state
  currentPlayer = 'x';
  currentPlayerName = player1Name;
  gameOver = false;
  board = Array(9).fill('');

  // Clear board UI
  cells.forEach(cell => {
    cell.textContent = '';
  });

  // EXACT message for first assertion:
  // cy.get('.message').should('contain', "Player1, you're up")
  setMessage(`${player1Name}, you're up`);
}

function checkWinner() {
  for (const [a, b, c] of winningCombos) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // 'x' or 'o'
    }
  }
  return null;
}

function checkDraw() {
  return board.every(cell => cell !== '');
}

function handleCellClick(index) {
  if (gameOver) return;
  if (board[index] !== '') return;

  // Put mark on board
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    gameOver = true;
    // EXACT win messages for Cypress:
    // "Player1 congratulations you won!" or "Player2 congratulations you won!"
    if (winner === 'x') {
      setMessage(`${player1Name} congratulations you won!`);
    } else {
      setMessage(`${player2Name} congratulations you won!`);
    }
    return;
  }

  if (checkDraw()) {
    gameOver = true;
    setMessage('Game ended in a draw');
    return;
  }

  // Switch player and set EXACT message:
  // after first move: "Player2, you're up"
  if (currentPlayer === 'x') {
    currentPlayer = 'o';
    currentPlayerName = player2Name;
  } else {
    currentPlayer = 'x';
    currentPlayerName = player1Name;
  }

  setMessage(`${currentPlayerName}, you're up`);
}

// Event listeners
submitBtn.addEventListener('click', startGame);

cells.forEach((cell, idx) => {
  cell.addEventListener('click', () => handleCellClick(idx));
});
