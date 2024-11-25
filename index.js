const sudokuBoard = document.getElementById("sudoku-board");
const message = document.getElementById("message");
const analogClock = document.getElementById("analog-clock");
const digitalClock = document.getElementById("digital-clock");

const levels = {
    easy: [
        [5, 3, '', '', 7, '', '', '', ''],
        [6, '', '', 1, 9, 5, '', '', ''],
        ['', 9, 8, '', '', '', '', 6, ''],
        [8, '', '', '', 6, '', '', '', 3],
        [4, '', '', 8, '', 3, '', '', 1],
        [7, '', '', '', 2, '', '', '', 6],
        ['', 6, '', '', '', '', 2, 8, ''],
        ['', '', '', 4, 1, 9, '', '', 5],
        ['', '', '', '', 8, '', '', 7, 9],
    ],
    easySolution: [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
    medium: [
        [8, '', '', '', '', '', '', '', ''],
        ['', '', 3, 6, '', '', '', '', ''],
        ['', 7, '', '', 9, '', 2, '', ''],
        ['', 5, '', '', '', 7, '', '', ''],
        ['', '', '', '', 4, 5, 7, '', ''],
        ['', '', '', 1, '', '', '', 3, ''],
        ['', '', 1, '', '', '', '', 6, 8],
        ['', '', 8, 5, '', '', '', 1, ''],
        ['', 9, '', '', '', '', 4, '', ''],
    ],
    mediumSolution: [
        [8, 1, 2, 7, 5, 3, 6, 4, 9],
        [9, 4, 3, 6, 8, 2, 1, 7, 5],
        [6, 7, 5, 4, 9, 1, 2, 8, 3],
        [1, 5, 4, 2, 3, 7, 8, 9, 6],
        [3, 6, 9, 8, 4, 5, 7, 2, 1],
        [2, 8, 7, 1, 6, 9, 5, 3, 4],
        [5, 2, 1, 9, 7, 4, 3, 6, 8],
        [4, 3, 8, 5, 2, 6, 9, 1, 7],
        [7, 9, 6, 3, 1, 8, 4, 5, 2],
    ],
    hard: [
        ['', '', '', '', '', 7, '', '', 9],
        ['', 4, '', 8, '', '', '', '', ''],
        ['', '', '', '', '', '', 2, 8, ''],
        ['', '', '', '', 1, '', '', '', ''],
        [7, '', '', '', '', '', '', '', 8],
        ['', '', '', '', '', 6, '', 4, ''],
        ['', '', '', '', '', '', '', '', 6],
        [5, '', '', '', '', 9, '', '', ''],
        [8, '', 3, '', '', '', '', '', ''],
    ],
    hardSolution: [
        [1, 2, 6, 4, 5, 7, 3, 8, 9],
        [3, 4, 9, 8, 6, 2, 1, 7, 5],
        [5, 7, 8, 9, 3, 1, 2, 8, 4],
        [6, 9, 7, 3, 1, 8, 4, 5, 2],
        [7, 5, 4, 2, 9, 6, 8, 1, 3],
        [2, 3, 1, 5, 8, 6, 7, 4, 9],
        [4, 8, 5, 7, 2, 3, 6, 9, 1],
        [9, 6, 2, 1, 4, 5, 3, 2, 7],
        [8, 1, 3, 6, 7, 9, 5, 2, 1],
    ],
};

let currentLevel = "easy";
let isSolved = false;

function renderSudoku(grid) {
    sudokuBoard.innerHTML = "";
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const div = document.createElement("div");
            div.className = "cell";
            div.contentEditable = !cell;
            div.textContent = cell;
            div.dataset.row = rowIndex;
            div.dataset.col = colIndex;
            sudokuBoard.appendChild(div);
        });
    });
}

function checkSolution() {
    const cells = Array.from(document.querySelectorAll(".cell"));
    const userGrid = Array(9).fill(null).map(() => Array(9).fill(null));

    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        userGrid[row][col] = cell.textContent.trim() ? parseInt(cell.textContent.trim()) : null;
    });

    const isCorrect = JSON.stringify(userGrid) === JSON.stringify(levels[`${currentLevel}Solution`]);

    if (isCorrect) {
        isSolved = true;
        message.textContent = `Congratulations! Level ${currentLevel} complete!`;
        nextLevel();
    } else {
        message.textContent = "Incorrect solution. Keep trying!";
    }
}

function nextLevel() {
    const levelOrder = ["easy", "medium", "hard"];
    const currentIndex = levelOrder.indexOf(currentLevel);

    if (currentIndex < levelOrder.length - 1) {
        currentLevel = levelOrder[currentIndex + 1];
        renderSudoku(levels[currentLevel]);
        document.body.style.backgroundColor = currentIndex % 2 === 0 ? "#d3f8d3" : "#f0f8ff";
        analogClock.classList.toggle("hidden", currentIndex % 2 !== 0);
        digitalClock.classList.toggle("hidden", currentIndex % 2 === 0);
        message.textContent = `Welcome to level ${currentLevel}!`;
        isSolved = false;
    } else {
        message.textContent = "You have completed all levels! Well done!";
    }
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourRotation = (hours % 12) * 30 + minutes * 0.5;
    const minuteRotation = minutes * 6;
    const secondRotation = seconds * 6;

    document.querySelector(".hour-hand").style.transform = `rotate(${hourRotation}deg)`;
    document.querySelector(".minute-hand").style.transform = `rotate(${minuteRotation}deg)`;
    document.querySelector(".second-hand").style.transform = `rotate(${secondRotation}deg)`;

    digitalClock.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

sudokuBoard.addEventListener("input", () => {
    if (!isSolved) {
        checkSolution();
    }
});

renderSudoku(levels.easy);
setInterval(updateClock, 1000);
