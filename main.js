// This file contains the JavaScript code that handles the logic for the crossword puzzle, including rendering the grid, checking answers, and managing user interactions.

document.addEventListener("DOMContentLoaded", function() {
    const gridElement = document.getElementById("crossword-grid");
    const cluesElement = document.getElementById("clues");
    const cluesData = [];

    // Function to create the crossword grid
    function createGrid() {
        const gridSize = 10; // Example grid size
        const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));

        // Example words and their positions
        const words = [
            { word: "puntillismo", row: 0, col: 0, direction: "horizontal" },
            { word: "perspectiva", row: 2, col: 0, direction: "horizontal" },
            { word: "punto de horizonte", row: 4, col: 0, direction: "horizontal" },
            { word: "artística", row: 6, col: 0, direction: "horizontal" },
            { word: "sombreado", row: 8, col: 0, direction: "horizontal" }
        ];

        // Place words in the grid
        words.forEach(({ word, row, col, direction }) => {
            for (let i = 0; i < word.length; i++) {
                if (direction === "horizontal") {
                    grid[row][col + i] = word[i];
                }
            }
        });

        // Render the grid
        renderGrid(grid);
    }

    // Function to render the grid in the HTML
    function renderGrid(grid) {
        grid.forEach(row => {
            const rowElement = document.createElement("div");
            rowElement.classList.add("grid-row");
            row.forEach(cell => {
                const cellElement = document.createElement("span");
                cellElement.classList.add("grid-cell");
                cellElement.textContent = cell || "";
                rowElement.appendChild(cellElement);
            });
            gridElement.appendChild(rowElement);
        });
    }

    // Function to load clues from JSON
    function loadClues() {
        fetch('./data/clues.json')
            .then(response => response.json())
            .then(data => {
                cluesData.push(...data);
                renderClues();
            });
    }

    // Function to render clues in the HTML
    function renderClues() {
        cluesData.forEach(clue => {
            const clueElement = document.createElement("li");
            clueElement.textContent = clue;
            cluesElement.appendChild(clueElement);
        });
    }

    // Initialize the crossword puzzle
    createGrid();
    loadClues();
});