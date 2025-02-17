//your JS code here. If required.
document.getElementById("submit").addEventListener("click", function () {
    let player1 = document.getElementById("player-1").value;
    let player2 = document.getElementById("player-2").value;

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names.");
        return;
    }

    document.getElementById("player-input").classList.add("hidden");
    document.getElementById("game-board").classList.remove("hidden");

    startGame(player1, player2);
});

function startGame(player1, player2) {
    let currentPlayer = player1;
    let currentSymbol = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let messageDiv = document.querySelector(".message");

    messageDiv.textContent = `${currentPlayer}, you're up!`;

    document.querySelectorAll(".cell").forEach((cell, index) => {
        cell.textContent = "";
        cell.addEventListener("click", function () {
            if (board[index] === "") {
                board[index] = currentSymbol;
                cell.textContent = currentSymbol;

                if (checkWin(board, currentSymbol)) {
                    messageDiv.textContent = `${currentPlayer} congratulations you won!`;
                    disableBoard();
                    return;
                }

                currentPlayer = currentPlayer === player1 ? player2 : player1;
                currentSymbol = currentSymbol === "X" ? "O" : "X";
                messageDiv.textContent = `${currentPlayer}, you're up!`;
            }
        });
    });
}

function checkWin(board, symbol) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === symbol)
    );
}

function disableBoard() {
    document.querySelectorAll(".cell").forEach(cell => cell.style.pointerEvents = "none");
}
