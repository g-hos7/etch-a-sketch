const GRIDMIN = 10;
const GRIDMAX = 100;
const GRIDDEFAULT = 32;

const container = document.querySelector('.container');
const resetBtn = document.querySelector('.reset');

function getGridSize() {
  let gridSize = parseInt(prompt('Choose a grid size between 10 and 100', GRIDDEFAULT));
  if (Number.isNaN(gridSize)) {
    return GRIDDEFAULT;
  } else if (Number.isInteger(gridSize) && gridSize >= GRIDMIN && gridSize <= GRIDMAX) {
    return gridSize;
  } else {
    alert("Please enter a number between 10 and 100!");
    location.reload();
  }
}

function createGrid(size) {
  container.style.setProperty('--grid-rows', size);
  container.style.setProperty('--grid-columns', size);
  populateGrid(size);
  resetPage();

}

function populateGrid(size) {
  for (i = 0; i < (size * size); i++) {
    let cell = document.createElement('div');
    container.appendChild(cell).className = 'cell';
    draw(cell);
  }
}

function draw(cell) {
  cell.addEventListener('mouseenter', () => {
    cell.style.background = 'rgba(0, 0, 0, 0.100)';
  });
}

function resetPage() {
  resetBtn.addEventListener('click', () => {
    location.reload();
  });
}

createGrid(getGridSize());