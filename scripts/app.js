const CANVASMIN = 10;
const CANVASMAX = 100;
const CANVASDEFAULT = 32;

const container = document.querySelector('.container');
const resetBtn = document.querySelector('.reset');
const resizeBtn = document.querySelector('.resize');
const sizeDisplay = document.querySelector('.size');
const pencilBtn = document.querySelector('.pencil');
const eraserBtn = document.querySelector('.eraser');

function getCanvasSize() {
  let validSelection = false;

  while (!validSelection) {
    let canvasSize = prompt('Choose a new size between 10 and 100', CANVASDEFAULT);
    console.log(canvasSize);
    if (canvasSize === null) {
      return CANVASDEFAULT;
    } else if (Number.isInteger(parseInt(canvasSize)) && parseInt(canvasSize) >= CANVASMIN && parseInt(canvasSize) <= CANVASMAX) {
      validSelection = true;
      return canvasSize;
    } else {
      alert("Please enter a whole number between 10 and 100!");
      validSelection = false;
    }
  }
}

function createCanvas(size) {
  container.style.setProperty('--grid-rows', size);
  container.style.setProperty('--grid-columns', size);
  populateCanvas(size);
  sizeDisplay.textContent = `This Canvas is ${size} x ${size}`;
}

function clearCanvas() {
  let cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.style.background = 'rgb(255, 255, 255)';
    container.appendChild(cell).className = 'cell'
  });
}

function populateCanvas(size) {
  for (i = 0; i < (size * size); i++) {
    let cell = document.createElement('div');
    container.appendChild(cell).className = 'cell';
    pencilBtn.addEventListener('click', () => {
      drawBlack(cell);
    });
    eraserBtn.addEventListener('click', () => {
      drawEraser(cell);
    });
  }
}

function drawBlack(cell) {
  cell.addEventListener('mouseenter', () => {
    cell.style.background = 'rgb(0, 0, 0)';
  });
}

function drawEraser(cell) {
  cell.addEventListener('mouseenter', () => {
    cell.style.background = 'rgb(255, 255, 255)';
  });
}

function resetCanvas() {
  resetBtn.addEventListener('click', () => {
    clearCanvas();
  });
}

function resizeCanvas() {
  resizeBtn.addEventListener('click', () => {
    clearCanvas();
    createCanvas(getCanvasSize());
  });
}

createCanvas(CANVASDEFAULT);
resetCanvas();
resizeCanvas();