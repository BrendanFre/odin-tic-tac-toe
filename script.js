const nameModal = document.querySelector("#nameChanger")
let playerArray = []

function createPlayer(symbol, number, name) {
    const playerSymbol = symbol;
    const playerName = name;

    return { playerName, playerSymbol }
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
            
            if(allTiles[0].value == player.playerSymbol){
                if(allTiles[1].value == player.playerSymbol){
                    if(allTiles[2].value == player.playerSymbol){
                        gameController.winnerScreen(player.playerName)
                    }
                }
            }
            
            if(allTiles[3].value == player.playerSymbol){
                if(allTiles[4].value == player.playerSymbol){
                    if(allTiles[5].value == player.playerSymbol){
                        gameController.winnerScreen(player.playerName)
                    }}}
            if(allTiles[6].value == player.playerSymbol){
                if(allTiles[7].value == player.playerSymbol){
                    if(allTiles[8].value == player.playerSymbol){
                        gameController.winnerScreen(player.playerName)
                    }}}
            if(allTiles[0].value == player.playerSymbol){
                if(allTiles[3].value == player.playerSymbol){
                    if(allTiles[6].value == player.playerSymbol){
                        gameController.winnerScreen(player.playerName)
                    }}}
            if(allTiles[1].value == player.playerSymbol){
                if(allTiles[4].value == player.playerSymbol){
                    if(allTiles[7].value == player.playerSymbol){
                        gameController.winnerScreen(player.playerName)
                    }}}
            if(allTiles[2].value == player.playerSymbol){
                if(allTiles[5].value == player.playerSymbol){
                    if(allTiles[8].value == player.playerSymbol){
                        gameController.winnerScreen(player.playerName)
                    }}}
            if(allTiles[0].value == player.playerSymbol){
                if(allTiles[4].value == player.playerSymbol){
                    if(allTiles[8].value == player.playerSymbol){
                        gameController.winnerScreen(player.playerName)
                    }}}
            if(allTiles[2].value == player.playerSymbol){
                if(allTiles[4].value == player.playerSymbol){
                    if(allTiles[6].value == player.playerSymbol){
                        gameController.winnerScreen(player.playerName)
                    }
                }
            }
        }
        
        let playerOneTokens = document.querySelectorAll(`.x`)
        let playerTwoTokens = document.querySelectorAll(`.o`)
        let totalTurns = playerOneTokens.length + playerTwoTokens.length

        if(totalTurns == 9){
         gameController.winnerScreen('draw')
        } else if(player.playerName == playerArray[0].playerName){
            setButtonTokens(playerArray[1])
        } else {
            setButtonTokens(playerArray[0])
        }
    }

    return { createGameBoard, setButtonTokens, checkWin }

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

    const winnerScreen = (winner)=>{
        const winnerModal = document.createElement('dialog')
        const winnerText = document.createElement('h2')
        const body = document.querySelector('body')
        if(winner == 'draw'){
            winnerText.textContent = 'Game over, It\'s a draw!'
        } else {winnerText.textContent = `${winner} has won!`}
        
        winnerText.classList.add('winModal')

        winnerModal.appendChild(winnerText)
        body.appendChild(winnerModal)
        winnerModal.showModal()
    }
    return { checkBoard, createModal, updateNameFields, winnerScreen }
})();

gameController.createModal()




