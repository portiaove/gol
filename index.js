const gameIntervalMs = 100;
const canvasWidth = 160;
const canvasHeight = 60;
const cellSize = 10;

let board = [];
let isGamePlaying = false;
let gameInterval;

window.onload = function () {
  const canvas = document.getElementById("canvas");
  createGame(canvas);

  const startLifeBtn = document.getElementById("startLife");
  startLifeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    isGamePlaying = !isGamePlaying;
    isGamePlaying ? startGame() : pauseGame();
  });
};

const createBoard = (width = 160, height = 60) =>
  Array.from({ length: height }, () =>
    Array.from({ length: width }, () => getRandomIntInclusive(1, 2) % 2 === 0)
  );

const createCanvas = (canvas, board) => {
  board.forEach((boardRow) => {
    const row = document.createElement("div");
    row.classList.add("row");
    canvas.appendChild(row);
    boardRow.forEach((boardCell) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (boardCell) {
        cell.classList.add("active");
      }
      row.appendChild(cell);
    });
  });
};

const updateCanvas = (canvas, board, className = "active") => {
  const rows = canvas.children;
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].children;
    for (let j = 0; j < cells.length; j++) {
      board[i][j]
        ? cells[j].classList.add(className)
        : cells[j].classList.remove(className);
    }
  }
};

const clearCanvas = (canvas, className = "active") => {
  const rows = canvas.children;
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].children;
    for (let j = 0; j < cells.length; j++) {
      cells[j].classList.remove(className);
    }
  }
};

const applyRules = (board) =>
  board.map((row, rowIdx) =>
    row.map((cell, cellIdx) => {
      const neighbours = getNeighbours(board, rowIdx, cellIdx);
      if (cell) {
        // Underpopulation
        if (neighbours < 2) {
          return false;
        }
        if (neighbours === 2 || neighbours === 3) {
          return true;
        }
        // Overpopulation
        if (neighbours > 3) {
          return false;
        }
        // Reproduction
      } else if (neighbours === 3) {
        return true;
      }
    })
  );

const getNeighbours = (board, row, cell) => {
  let neighbours = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const neighborRow = row + i;
      const neighborCell = cell + j;

      if (
        neighborRow >= 0 &&
        neighborRow < board.length &&
        neighborCell >= 0 &&
        neighborCell < board[neighborRow].length &&
        board[neighborRow][neighborCell]
      ) {
        neighbours++;
      }
    }
  }

  return neighbours;
};

const startGame = () => {
  const startBtn = document.getElementById("startLife");
  startBtn.innerText = "Pause";
  gameInterval = setInterval(() => {
    const updatedBoard = applyRules(board);
    board = updatedBoard;

    const canvas = document.getElementById("canvas");
    updateCanvas(canvas, board);
  }, gameIntervalMs);
};

const pauseGame = () => {
  const startBtn = document.getElementById("startLife");
  startBtn.innerText = "Start";
  clearInterval(gameInterval);
};

const createGame = (canvas) => {
  const { height, width } = getViewportGrid(cellSize);
  board = createBoard(width, height);
  createCanvas(canvas, board);
};

const refreshGame = () => {
  const canvas = document.getElementById("canvas");
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
  createGame(canvas);
};
