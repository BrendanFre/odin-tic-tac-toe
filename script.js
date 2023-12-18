const gameLogic = (function () {
    const whoWins = (player1, player2) => {
        if (player1 || player2) {
            return true
        }
    }
    const startGame = () => {
        console.log("Welcome to Tic Tac Toe - Console Version")
        gameBoard.show();
        setTimeout(gameLogic.gameLoop(), 4000);
    }

    const gameLoop = () => {
        let isWinner = false;
        let gameTurns = 0
        while (!isWinner && gameTurns < 5) {
            let playerTurn
            gameBoard.show()
            playerTurn = "o"
            gameLogic.gameTurn("o")
            isWinner = gameLogic.winChecker("o")
            if (!isWinner) {
                gameBoard.show()
                playerTurn = "x"
                gameLogic.gameTurn("x")
                isWinner = gameLogic.winChecker("x")
            }
            gameTurns++
            console.log(`${playerTurn} wins`)
        }
        
    }

    const winChecker = (playerName) => {
        let didTheyWin = false
        didTheyWin = gameBoard.check(playerName)

        return didTheyWin;

    };

    const gameTurn = (playerSymbol) => {
        let playerTurn = prompt(`Player ${playerSymbol}: Please input a number from 1 to 9?`)
        if (playerTurn <= 3) {
            gameBoard.addToken(0, playerTurn - 1, playerSymbol)
        } else if (playerTurn <= 6) {
            gameBoard.addToken(1, playerTurn - 4, playerSymbol)
        } else if (playerTurn <= 9) {
            gameBoard.addToken(2, playerTurn - 7, playerSymbol)
        } else {
            console.log("Please enter correct number")
        }
    };
    return { startGame, gameTurn, winChecker, whoWins, gameLoop };

}
)
    ();

const gameBoard = (function () {
    const boardRows = 3
    const boardColumns = 3
    let theBoard = [];

    for (let i = 0; i < boardRows; i++) {
        theBoard[i] = []
    };
    theBoard.forEach(element => {
        for (let i = 0; i < boardColumns; i++) {
            element[i] = ""
        };
    }
    );


    const show = () => console.table(theBoard);

    const addToken = (row, column, playerSymbol) => {
        console.log(`Arguments of add token row: ${row} column: ${column} player: ${playerSymbol}`)
        if (theBoard[row][column] == "x" || theBoard[row][column] == "o") {
            console.log("Already used, please try again")
        } else {
            theBoard[row][column] = playerSymbol;
        }
    };

    const check = (playerName) => {
        for (let row = 0; row < 2; row++) {
            if (theBoard[row][0] == playerName && theBoard[row][1] == playerName && theBoard[row][2] == playerName) {
                console.log(`${playerName} wins the game.`)
                return true
            };
            for (let column = 0; column < 2; column++) {
                if (theBoard[0][column] == playerName && theBoard[1][column] == playerName && theBoard[2][column]) {
                    console.log(`${playerName} wins the game.`)
                    return true
                }
            };
            if (theBoard[0][0] = playerName && theBoard[1][1] == playerName && theBoard[2][2] == playerName) {
                console.log(`${playerName} wins the game.`)
                return true
            };
            if (theBoard[0][2] = playerName && theBoard[1][1] == playerName && theBoard[2][0] == playerName) {
                console.log(`${playerName} wins the game.`)
                return true
            };


            //Win condition 1: row 0 column 0 1 2
            //Win condition 2: row 1 column 0 1 2
            //Win condition 3: row 2 column 0 1 2
            //Win condition 4: row 0 1 2 column 0
            //Win condition 5: row 0 1 2 column 1
            //Win condition 6: row 0 1 2 column 2
            //Win condition 7: cell c0 r0, c1 r1, c2 r2
            //Win condition 8: cell c2 r0, c1 r1, c0 r2
        }
    }
    return { show, addToken, check };
})();

gameBoard.show()
gameLogic.startGame()