function createPlayer(name, symbol){
    const playerName = name;
    const playerSymbol = symbol;

    const playerTurn = ()=>{
        /**
         * Player selects the position they want to add their sybmol.
         * */
        let playerSelection = prompt("Please choose a number between 1 to 9 inclusive.")
        let row
        let column
        
        if(playerSelection >= 3){
            row = 0;
            column = playerSelection;
        } else if(playerSelection >= 6){
            row = 1;
            column = playerSelection - 4;
        } else if(playerSelection >= 9){
            row = 2;
            column = playerSelection - 7;
        }
        gameBoard.addToken(row, column, playerSymbol)
    }


    return { playerName, playerSymbol, playerTurn }
}

const gameLogic = (function () {

    const startGame = (playerOne, playerTwo) => {
        console.log("Welcome to Tic Tac Toe - Console Version")
        gameBoard.resetBoard();
        gameBoard.show();
        gameLogic.gameLoop(playerOne, playerTwo);
    }

    const gameLoop = (playerOne, playerTwo) => {
        let gameTurns = 1
        let noWinner = true

        while(gameTurns < 9 && noWinner){
            playerOne.playerTurn()
            gameBoard.show()
            gameTurns++
            playerTwo.playerTurn()
            gameBoard.show()
            gameTurns++
        }
    }

    const gameTurn = (playerSymbol) => {
        let playerTurn = prompt("Please enter your next position between 1 - 9")
        if (playerTurn <= 3) {
            gameBoard.addToken(0, playerTurn - 1, playerSymbol)
        } else if (playerTurn <= 6) {
            gameBoard.addToken(1, playerTurn - 4, playerSymbol)
        } else if (playerTurn <= 9) {
            gameBoard.addToken(2, playerTurn - 7, playerSymbol)
        } else {
            console.log("Please enter correct number")
            gameLogic.gameTurn(playerSymbol)
        }
    };
    return { startGame, gameTurn, gameLoop };
}
)
    ();

const gameBoard = (function () {
    let theBoard = [];

    const resetBoard = () =>{
        
        const boardRows = 3
        const boardColumns = 3
        
        for (let i = 0; i < boardRows; i++) {
            theBoard[i] = []
        };
        theBoard.forEach(element => {
            for (i = 0; i < boardColumns; i++) {
                element[i] = "-"
            }
        }
            )
            }

    const show = () => console.table(theBoard);

    const addToken = (row, column, playerSymbol) => {
        if (theBoard[row][column] == "-") {
            console.log("Already used, please try again")
            gameLogic.gameTurn(playerSymbol)
        } else {
            theBoard[row][column] = playerSymbol;
            gameLogic.isWinner = !gameBoard.check(playerSymbol)
        }
    };

    const check = (playerName) => {
        for (let row = 0; row < 2; row++) {
            if (theBoard[row][0] == playerName && theBoard[row][1] == playerName && theBoard[row][2] == playerName) {
                console.log(`${playerName} wins the game.`)
                gameLogic.noWinner = false;
            };
            for (let column = 0; column < 2; column++) {
                if (theBoard[0][column] == playerName && theBoard[1][column] == playerName && theBoard[2][column]) {
                    console.log(`${playerName} wins the game.`)
                    gameLogic.noWinner = false;
                }
            };
            if (theBoard[0][0] = playerName && theBoard[1][1] == playerName && theBoard[2][2] == playerName) {
                console.log(`${playerName} wins the game.`)
                gameLogic.noWinner = false;
            };
            if (theBoard[0][2] = playerName && theBoard[1][1] == playerName && theBoard[2][0] == playerName) {
                console.log(`${playerName} wins the game.`)
                gameLogic.noWinner = false;
            };
        }
    }
    return { show, addToken, check, resetBoard, theBoard };
})();


const player1 = createPlayer("Player 1", "x")
const player2 = createPlayer("Player 2", "o")
gameLogic.startGame(player1, player2)