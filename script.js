//your JS code here. If required.
// Game state
let player1 = "";
let player2 = "";
let currentPlayer = 1; // 1 for player1 (X), 2 for player2 (O)
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

// DOM elements
const playerForm = document.getElementById("player-form");
const gameBoard = document.getElementById("game-board");
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitBtn = document.getElementById("submit");
const messageEl = document.getElementById("message");

// Start game when names submitted
submitBtn.addEventListener("click", function () {
  player1 = player1Input.value.trim() || "Player 1";
  player2 = player2Input.value.trim() || "Player 2";

  if (player1 && player2) {
    // Hide form, show game
    playerForm.style.display = "none";
    gameBoard.style.display = "block";

    // Set initial message
    updateMessage();
  }
});

// Cell click handler
for (let i = 1; i <= 9; i++) {
  const cell = document.getElementById(i.toString());
  cell.addEventListener("click", function () {
    const index = parseInt(cell.id) - 1; // Convert to 0-based index

    if (board[index] === "" && gameActive) {
      // Place mark
      board[index] = currentPlayer === 1 ? "x" : "o";
      cell.textContent = board[index];
      cell.classList.add(board[index]);

      // Check for winner
      if (checkWinner()) {
        const winnerName = currentPlayer === 1 ? player1 : player2;
        messageEl.textContent = `${winnerName} congratulations you won!`;
        gameActive = false;
        return;
      }

      // Switch player
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      updateMessage();
    }
  });
}

function updateMessage() {
  const currentPlayerName = currentPlayer === 1 ? player1 : player2;
  const mark = currentPlayer === 1 ? "X" : "O";
  messageEl.textContent = `${currentPlayerName}, you're up! (${mark})`;
}

function checkWinner() {
  // All winning combinations (rows, columns, diagonals)
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}
