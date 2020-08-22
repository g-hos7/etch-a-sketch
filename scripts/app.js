const CANVASMIN = 10;
const CANVASMAX = 100;
const CANVASDEFAULT = 32;

const container = document.querySelector('.container');
const resetBtn = document.querySelector('.reset');
const resizeBtn = document.querySelector('.resize');
const sizeDisplay = document.querySelector('.size');
const pencilBtn = document.querySelector('.pencil');
const randomBtn = document.querySelector('.random');
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

function getRandomColor() {
  let randomNum = Math.round(0xffffff * Math.random());
  let red = randomNum >> 16;
  let green = randomNum >> 8 & 255;
  let blue = randomNum & 255;
  return `rgb(${red}, ${green}, ${blue})`;
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
    cell.style.background = 'rgb(218, 218, 218)';
    container.appendChild(cell).className = 'cell';
  });
}

function populateCanvas(size) {
  for (i = 0; i < (size * size); i++) {
    let cell = document.createElement('div');
    cell.style.background = 'rgb(218, 218, 218)';
    container.appendChild(cell).className = 'cell';

    pencilBtn.addEventListener('click', () => {
      drawBlack(cell);
    });
    randomBtn.addEventListener('click', () => {
      drawRandom(cell);
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

function drawRandom(cell) {
  cell.addEventListener('mouseenter', () => {
    cell.style.background = getRandomColor();
  });
}

function drawEraser(cell) {
  cell.addEventListener('mouseenter', () => {
    cell.style.background = 'rgb(218, 218, 218)';
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