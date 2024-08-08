const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cellSize = 20;
let brushColor = 'black';
let maze = [];
let start = null;
let end = null;
let rows, cols;
let isDrawing = false;

// Fonction pour dessiner sur le canvas
function drawOnCanvas(e) {
    const [x, y] = getCanvasCoordinates(e);
    if (x >= 0 && x < cols && y >= 0 && y < rows) {
        maze[y][x] = brushColor;
        drawMaze();
    }
}

// Fonction pour obtenir les coordonnées de la cellule dans le canvas
function getCanvasCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);
    return [x, y];
}

// Initialisation du labyrinthe
function initMaze() {
    rows = Math.floor(canvas.height / cellSize);
    cols = Math.floor(canvas.width / cellSize);
    maze = Array.from({ length: rows }, () => Array(cols).fill('white'));
    drawMaze();
}

// Fonction pour dessiner le labyrinthe sur le canvas
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            ctx.fillStyle = maze[r][c];
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
            ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
    }
    if (start) {
        ctx.fillStyle = 'orange';
        ctx.fillRect(start.col * cellSize, start.row * cellSize, cellSize, cellSize);
    }
    if (end) {
        ctx.fillStyle = 'red';
        ctx.fillRect(end.col * cellSize, end.row * cellSize, cellSize, cellSize);
    }
}

// Fonction pour définir la couleur du pinceau
function setBrushColor(color) {
    brushColor = color;
    document.querySelectorAll('.color-box').forEach(box => {
        box.classList.remove('selected');
        if (box.style.backgroundColor === color) {
            box.classList.add('selected');
        }
    });
}

// Fonction pour définir l'entrée
function setStart() {
    canvas.addEventListener('click', setStartPosition, { once: true });
}

function setStartPosition(event) {
    const [x, y] = getCanvasCoordinates(event);
    start = { row: y, col: x };
    maze[y][x] = 'white';
    drawMaze();
}

// Fonction pour définir la sortie
function setEnd() {
    canvas.addEventListener('click', setEndPosition, { once: true });
}

function setEndPosition(event) {
    const [x, y] = getCanvasCoordinates(event);
    end = { row: y, col: x };
    maze[y][x] = 'white';
    drawMaze();
}

// Fonction pour générer un labyrinthe aléatoire
function generateRandomMaze() {
    initMaze();
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            maze[r][c] = Math.random() < 0.3 ? 'black' : 'white';
        }
    }
    start = { row: 0, col: 0 };
    end = { row: rows - 1, col: cols - 1 };
    maze[start.row][start.col] = 'white';
    maze[end.row][end.col] = 'white';
    drawMaze();
}

// Fonction pour résoudre le labyrinthe
function solveMaze() {
    if (!start || !end) {
        alert('Please place an entry and an exit.');
        return;
    }
    
    console.log('Start:', start);
    console.log('End:', end);

    let path = findPath(start, end);
    if (path) {
        ctx.strokeStyle = 'green';
        ctx.lineWidth = cellSize / 2;
        ctx.beginPath();
        ctx.moveTo(start.col * cellSize + cellSize / 2, start.row * cellSize + cellSize / 2);
        path.forEach(([row, col]) => {
            ctx.lineTo(col * cellSize + cellSize / 2, row * cellSize + cellSize / 2);
        });
        ctx.stroke();
    } else {
        alert('No path was found');
    }
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
}

// Fonction pour trouver un chemin dans le labyrinthe
function findPath(start, end) {
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let queue = [[start.row, start.col]];
    let cameFrom = new Map();
    cameFrom.set(`${start.row},${start.col}`, null);

    while (queue.length > 0) {
        let [row, col] = queue.shift();
        if (row === end.row && col === end.col) {
            let path = [];
            while (cameFrom.get(`${row},${col}`)) {
                path.push([row, col]);
                [row, col] = cameFrom.get(`${row},${col}`);
            }
            path.push([start.row, start.col]);
            return path.reverse();
        }
        for (let [dr, dc] of directions) {
            let newRow = row + dr;
            let newCol = col + dc;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && maze[newRow][newCol] !== 'black' && !cameFrom.has(`${newRow},${newCol}`)) {
                queue.push([newRow, newCol]);
                cameFrom.set(`${newRow},${newCol}`, [row, col]);
            }
        }
    }
    return null;
}

// Événements pour dessiner en maintenant la souris enfoncée
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    drawOnCanvas(e);
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        drawOnCanvas(e);
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

initMaze(); // Initialiser le labyrinthe au chargement de la page
