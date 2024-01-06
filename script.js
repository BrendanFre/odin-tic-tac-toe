const nameModal = document.querySelector("#nameChanger")
let playerArray = []

function createPlayer(symbol, number, name) {
    const playerSymbol = symbol;
    const playerName = name;

    const selectToken = () => {
        let tokenPosition = prompt(`${name} it is your turn, please enter a number ranging from 1 to 9`);
        let playerRow = 0
        let playerColumn = 0
        if (tokenPosition < 4 && tokenPosition > 0) {
            playerColumn = tokenPosition - 1
            playerRow = 0

        } else if (tokenPosition < 7) {
            playerColumn = tokenPosition - 4
            playerRow = 1
        } else if (tokenPosition < 10) {
            playerColumn = tokenPosition - 7
            playerRow = 2
        } else {
            console.log('Please try again')
            selectToken()
        }
        let successfulToken = gameBoard.addToken(playerRow, playerColumn, symbol)
        if (successfulToken == 0) {
            selectToken()
        }
    }

    return { selectToken, playerName, playerSymbol }
}

const gameBoard = (function () {
    let theGameBoard = [];

    const createGameBoard = (rows, columns) => {
        const mainContainer = document.querySelector('.buttonContainer')

        const btnBoard = document.createElement('input')

        btnBoard.type = 'button'
        btnBoard.value = '-'

        for (let i = 0; i < rows; i++) {
            const rowBoard = document.createElement('div')
            rowBoard.classList.add('boardRows')
            mainContainer.appendChild(rowBoard)
        };

        const allBoardRows = document.querySelectorAll('.boardRows')
        console.log(allBoardRows)

        allBoardRows.forEach(row => {
            for (let cells = 0; cells < rows; cells++) {
                const btnBoard = document.createElement('input')
                btnBoard.type = 'button'
                btnBoard.classList.add('boardButtons')
                btnBoard.classList.add('emptyTile')
                btnBoard.textContent = '-'
                btnBoard.value = '-'
                row.appendChild(btnBoard)
            }
        })
        gameBoard.setButtonTokens(playerArray[0])
    }

    const setButtonTokens = (player) => {
        const remainingTiles = document.querySelectorAll('.emptyTile');
        const playerTurnIndicator = document.querySelector('.playerTurn')
        playerTurnIndicator.textContent = `${player.playerName}'s Turn.`
        remainingTiles.forEach(tile => {
            tile.addEventListener('click', () => {
                tile.value = player.playerSymbol
                tile.classList.remove('emptyTile')
                tile.classList.add(player.playerSymbol)
                gameBoard.checkWin(player)
            })
        });

    }

    const checkWin = (player)=>{
        const playerSelected = document.querySelectorAll(`.${player.playerSymbol}`)
        if(playerSelected.length >= 3){
            const allTiles = document.querySelectorAll('.boardButtons')
            console.log(allTiles)
            
            if(allTiles[0].value == player.playerSymbol){
                if(allTiles[1].value == player.playerSymbol){
                    if(allTiles[2].value == player.playerSymbol){
                        console.log('Winner')
                    }
                }
            }
            
            if(allTiles[3].value == player.playerSymbol){
                if(allTiles[4].value == player.playerSymbol){
                    if(allTiles[5].value == player.playerSymbol){
                        console.log('Winner')
                    }}}
            if(allTiles[6].value == player.playerSymbol){
                if(allTiles[7].value == player.playerSymbol){
                    if(allTiles[8].value == player.playerSymbol){
                        console.log('Winner')
                    }}}
            if(allTiles[0].value == player.playerSymbol){
                if(allTiles[3].value == player.playerSymbol){
                    if(allTiles[6].value == player.playerSymbol){
                        console.log('Winner')
                    }}}
            if(allTiles[1].value == player.playerSymbol){
                if(allTiles[4].value == player.playerSymbol){
                    if(allTiles[7].value == player.playerSymbol){
                        console.log('Winner')
                    }}}
            if(allTiles[2].value == player.playerSymbol){
                if(allTiles[5].value == player.playerSymbol){
                    if(allTiles[8].value == player.playerSymbol){
                        console.log('Winner')
                    }}}
            if(allTiles[0].value == player.playerSymbol){
                if(allTiles[4].value == player.playerSymbol){
                    if(allTiles[8].value == player.playerSymbol){
                        console.log('Winner')
                    }}}
            if(allTiles[2].value == player.playerSymbol){
                if(allTiles[4].value == player.playerSymbol){
                    if(allTiles[6].value == player.playerSymbol){
                        console.log('Winner')
                    }
                }
            }
        }
        let playerOneTokens = document.querySelectorAll(`.x`)
        let playerTwoTokens = document.querySelectorAll(`.o`)
        console.log(playerArray)
        let totalTurns = playerOneTokens.length + playerTwoTokens.length
        if(totalTurns == 9){
            console.log('game Over')
        } else if(player.playerName == playerArray[0].playerName){
            setButtonTokens(playerArray[1])
        } else {
            setButtonTokens(playerArray[0])
        }
    }

    const winnerCheck = (playerSymbol) => {
        console.log(`${playerSymbol} is currently being checked`)
        for (let row = 0; row < 3; row++) {

            if (theGameBoard[row][0] == playerSymbol && theGameBoard[row][1] == playerSymbol && theGameBoard[row][2] == playerSymbol) {
                return 1
            }
        };
        for (let column = 0; column < 3; column++) {
            if (theGameBoard[0][column] == playerSymbol) {
                if (theGameBoard[1][column] == playerSymbol) {
                    if (theGameBoard[2][column] == playerSymbol) {
                        console.log(`${playerSymbol} won using column ${column}`)
                        return 1
                    }
                }
            }
        };
        if (theGameBoard[0][0] == playerSymbol && theGameBoard[1][1] == playerSymbol && theGameBoard[2][2] == playerSymbol) {
            return 1
        };
        if (theGameBoard[0][2] == playerSymbol && theGameBoard[1][1] == playerSymbol && theGameBoard[2][0] == playerSymbol) {
            return 1
        };
        return 0;
    }

    return { createGameBoard, winnerCheck, setButtonTokens, checkWin }

})();

const gameController = (function () {

    const createModal = () => {
        const newPlayerDialog = document.createElement('dialog')
        const newPlayerHeader = document.createElement('h2')
        const newPlayerNameLabel = document.createElement('label')
        const newPlayerNameEntry = document.createElement('input')
        const newPlayerNameButton = document.createElement('input')
        const mainBody = document.querySelector('body')

        newPlayerHeader.textContent = 'Please input your name'
        newPlayerHeader.classList.add('modalHeader')

        newPlayerNameLabel.textContent = "Username: "
        newPlayerNameLabel.classList.add('modalInput')

        newPlayerNameEntry.placeholder = 'Your username'

        newPlayerNameButton.type = 'button'
        newPlayerNameButton.value = 'Submit'
        newPlayerNameButton.addEventListener('click', () => {
            let newPlayer
            if (playerArray.length == 0) {
                newPlayer = createPlayer('x', 1, newPlayerNameEntry.value)
                playerArray.push(newPlayer)

                gameController.updateNameFields(1, newPlayer.playerName)
                newPlayerNameEntry.value = ""
            } else if (playerArray.length == 1) {
                newPlayer = createPlayer('y', 2, newPlayerNameEntry.value)
                playerArray.push(newPlayer)
                gameController.updateNameFields(2, newPlayer.playerName)
                newPlayerDialog.remove()
                gameBoard.createGameBoard(3, 3)

            }
        })


        newPlayerNameLabel.appendChild(newPlayerNameEntry)

        newPlayerDialog.appendChild(newPlayerHeader)
        newPlayerDialog.appendChild(newPlayerNameLabel)
        newPlayerDialog.appendChild(newPlayerNameButton)
        mainBody.appendChild(newPlayerDialog)
        newPlayerDialog.showModal()

    };

    const updateNameFields = (player, name) => {
        let playerLabel
        if (player == 1) {
            playerLabel = document.querySelector('#playerOneField')

        } else if (player == 2) {
            playerLabel = document.querySelector('#playerTwoField')

        } else { console.log('Incorrect player number.') }

        playerLabel.textContent = name;

    }

    const checkBoard = (playerSymbol) => {
        return gameBoard.winnerCheck(playerSymbol)
    }
    return { checkBoard, createModal, updateNameFields }
})();

gameController.createModal()




