const boxes = document.querySelectorAll('.box');
const statusText = document.querySelector('.status');
const resetBtn = document.querySelector('.btn');

let currentPlayer = 'X';
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

statusText.textContent = `Player ${currentPlayer}'s turn`;

boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    if (!gameActive || board[index] !== "") return;

    box.textContent = currentPlayer;
    board[index] = currentPlayer;

    if (checkWinner()) {
      statusText.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (board.every(cell => cell !== "")) {
      statusText.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  });
});

function checkWinner() {
  return winConditions.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

// reset
resetBtn.addEventListener('click', () => {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  boxes.forEach(box => box.textContent = "");
});