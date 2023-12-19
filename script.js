function createPlayer(name, symbol){
    const playerName = name;
    const playerSymbol = symbol;

    const selectToken = ()=>{
        let tokenPosition = prompt("1-9");
        let playerRow = 0
        let playerColumn = 0
        if(tokenPosition < 4){
            playerColumn = tokenPosition - 1
            playerRow = 0

        } else if(tokenPosition < 7){
            playerColumn = tokenPosition - 4
            playerRow = 1
        } else if(tokenPosition < 10){
            playerColumn = tokenPosition - 7
            playerRow = 2
        }
        let successfulToken = gameBoard.addToken(playerRow, playerColumn, symbol)
        if (successfulToken == 0){
            selectToken()
        }
    }

    return{ selectToken }
}

const gameBoard = (function(){
    let theGameBoard = [];

    const createGameBoard = (rows, columns)=>{
        for(let i = 0; i < rows; i++){
            theGameBoard[i] = []
        };
        theGameBoard.forEach(row => {
            for(let counter = 0; counter < columns; counter++){
                row[counter] = "-"
            }
            
        });
    };

    const addToken = (row, column, playerSymbol)=>{
        if(theGameBoard[row][column] == "-"){
            theGameBoard[row][column] = playerSymbol
            return 1
        } else{
            console.log("please try again")
            return 0

        }
        
    };
 
    return{ createGameBoard, theGameBoard, addToken }

})();

const gameController = (function(){
    let turns = 1
    let playing = true
    const playLoop = ()=>{
        while(turns < 5 && playing)
{        playerOne.selectToken()
        turns++
        playerTwo.selectToken()
        console.log(gameBoard.theGameBoard)}
    }
    return{ playLoop}
})();

gameBoard.createGameBoard(3, 3)
const playerOne = createPlayer("brendan", "x")
const playerTwo = createPlayer("brendan", "o")
gameController.playLoop()
console.log(gameBoard.theGameBoard)


