const nameModal = document.querySelector("#nameChanger")


let playerOneName
let playerTwoName

function createPlayer(symbol, number) {
    const playerSymbol = symbol;
    const playerNumber = number
    const nameInputField = document.querySelector('#nameField')
    const modalDescription = document.querySelector('#modalDescription')
    const submitName = document.querySelector('#submitName')
    const id = gameController.playerArray.length + 1

    modalDescription.textContent = `Player please input your name:`
    gameController.playerArray[id] = this
    submitName.addEventListener('click', askName.bind(symbol))

    submitName.addEventListener('click', (e)=>{
        e.preventDefault();
        const username = document.querySelector('#nameField').value
    })

    function askName(playerNumber) {
        const nameInputField = document.querySelector('#nameField')
        const playerOneField = document.querySelector('#playerOneField')
        const playerTwoField = document.querySelector('#playerTwoField')
        let newName
    
        nameModal.close()
        newName = nameInputField.value
    
        if (this == 1) {
            playerOneField.textContent = newName
            playerOneName = newName
            submitName.replaceWith(submitName.cloneNode(true));
            nameInputField.value = ''
            definePlayerName("Player Two", 2)
        } else if (this == 2) {
            playerTwoField.textContent = newName
            playerTwoName = newName
        }
    }

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
    let playerSelected
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
            for(let cells = 0; cells < rows; cells++){
                const btnBoard = document.createElement('input')
            btnBoard.type='button'
            btnBoard.classList.add('boardButtons')
            btnBoard.textContent = '-'
            btnBoard.value = '-'
            btnBoard.addEventListener('click', buttonPressed.bind(playerSelected))
            row.appendChild(btnBoard)
            }})
            
            }

    const buttonPressed = (e) =>{
        
        console.log(this)
        e.target.value = this
    }

    const addToken = (row, column, playerSymbol) => {
        if (theGameBoard[row][column] == "-") {
            theGameBoard[row][column] = playerSymbol
            return 1
        } else {
            console.log("please try again")
            return 0

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

    return { createGameBoard, theGameBoard, addToken, winnerCheck, playerSelected }

})();

const gameController = (function () {
    let turns = 1
    let playing = true
    let playerOneWins = 0
    let playerTwoWins = 0
    let playerArray = []

    const createModal=()=>{
        const newPlayerDialog = document.createElement('dialog')
        const newPlayerHeader = document.createElement('h2')
        const newPlayerNameLabel = document.createElement('label')
        const newPlayerNameEntry = document.createElement('input')
        const newPlayerNameButton = document.createElement('input')
        const mainBody = document.querySelector('body')

        newPlayerHeader.textContent = 'Please input your name'
        newPlayerHeader.classList.add('modalHeader')

        newPlayerNameLabel.textContent ="Username: "
        newPlayerNameLabel.classList.add('modalInput')

        newPlayerNameEntry.placeholder = 'Your username'

        newPlayerNameButton.type = 'button'
        newPlayerNameButton.value = 'Submit'


        newPlayerNameLabel.appendChild(newPlayerNameEntry)
        
        newPlayerDialog.appendChild(newPlayerHeader)
        newPlayerDialog.appendChild(newPlayerNameLabel)
        newPlayerDialog.appendChild(newPlayerNameButton)
        mainBody.appendChild(newPlayerDialog)
        newPlayerDialog.showModal()

    }




    const playLoop = () => {
        console.log(gameBoard.theGameBoard)
        while (turns < 5 && playing) {
            console.log(gameBoard.theGameBoard)
            // playing= false
            playerOne.selectToken()
            playerOneWins = checkBoard(playerOne.playerSymbol)
            if (playerOneWins == 0) {
                turns++
                playerTwo.selectToken()
                playerTwoWins = checkBoard(playerTwo.playerSymbol)
                console.log(gameBoard.theGameBoard)
            }
            // console.log(turns)

            if (playerOneWins == 1 || playerTwoWins == 1) {
                playing = false
            }
        };
        if (playerOneWins == 1) {
            console.log(`${playerOne.name} wins`)
        } else if (playerTwoWins == 1) {
            console.log(`${playerTwo.name} wins`)
        } else {
            console.log("Draw!")
        }
    };

    const checkBoard = (playerSymbol) => {
        return gameBoard.winnerCheck(playerSymbol)
    }
    return { playLoop, checkBoard, playerArray, createModal }
})();

gameController.createModal()




