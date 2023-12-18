const gameLogic = (function(){
const startGame = () => {
    console.log("Welcome to Tic Tac Toe - Console Version")
    gameBoard.showBoard();
};

const gameTurn = () =>{
    let playerTurn = prompt("Please input a number from 1 to 9?")
    if(playerTurn <= 3){
        gameBoard.addToken(0, playerTurn - 1, "x")
    } else if (playerTurn <= 6){
        gameBoard.addToken(1, playerTurn - 4, "x")
    } else if (playerTurn <= 9){
        gameBoard.addToken(2, playerTurn - 7, "x")
    } else{
        console.log("Please enter correct number")
    }
}
return { startGame, gameTurn }
})();

const gameBoard = (function(){
    const boardRows = 3
    const boardColumns = 3
    let theBoard = [];

    for(let i = 0; i < boardRows; i++){
        theBoard[i] = []
    };
    theBoard.forEach(element => {
        for(let i = 0; i < boardColumns; i++){
            element[i] = ""
        };
        }
        );


    const showBoard = () => console.table(theBoard);

    const addToken = (row, column, player) => {
        if(theBoard[row][column] == "x" || theBoard[row][column] == "o"){
            console.log("Already used, please try again")
        } else{
            theBoard[row][column] = player
        }
        
    };

    return { showBoard, addToken };
})();

let gameOver = false;
let turnCounter = 0
gameLogic.startGame()
while (!gameOver && turnCounter < 6){
    gameLogic.gameTurn()
    turnCounter++
    gameBoard.showBoard()
}