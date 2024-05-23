const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let gameActive = true;
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameActive && clickedCell.innerText === '') {
    clickedCell.innerText = currentPlayer;
    clickedCell.classList.add(currentPlayer);
    checkWin();
    checkDraw();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      cells[a].innerText &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      cells[a].classList.add('win');
      cells[b].classList.add('win');
      cells[c].classList.add('win');
      message.innerText = `Игрок ${cells[a].innerText} победил!`;
      gameActive = false;
      return;
    }
  }
}

function checkDraw() {
  let draw = true;
  for (const cell of cells) {
    if (cell.innerText === '') {
      draw = false;
      break;
    }
  }
  if (draw) {
    message.innerText = 'Ничья!';
    gameActive = false;
  }
}

function resetGame() {
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('X', 'O', 'win');
  });
  message.innerText = '';
  currentPlayer = 'X';
  gameActive = true;
}

