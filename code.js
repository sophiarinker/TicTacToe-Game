// Setting the symbol for X and O players
const PLAYER_X_SYMBOL = "X";
const PLAYER_O_SYMBOL = "O";
let numPlayers = 0;
let difficulty = "easy";
const controlPanel = document.getElementById('controls');
const main = document.querySelector('main');
const r = document.querySelector(':root');
const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6,], [1, 4, 7], [2, 5, 8,], [0, 4, 8], [2, 4, 6]];


// Class that will hold all of the necessary methods for each game
class TicTacToeGame {

    //Method that handles clicking on a square by calling executeMove function with the target
    handleSquareClick(event){
            this.executeMove(event.target.id);
    }

    //Method that updates the board array when a certain index is clicked and then switches to next player symbol
    executeMove(moveIndex){
        if(this.board[moveIndex] == ""){
            this.board[moveIndex] = this.currentPlayer;
            this.updateBoard();
            if(!this.gameHasWinner()){
                    if(numPlayers == 2){
                        this.currentPlayer = (this.currentPlayer == PLAYER_X_SYMBOL ?
                            PLAYER_O_SYMBOL : PLAYER_X_SYMBOL);
                        }else if(this.board.includes("")){
                            if(difficulty =="easy"){
                                this.computerTurnEasy();
                            }else{
                                this.computerTurnHard();
                            }
                            setTimeout(this.updateBoard(), 1000)
                            
                            if(this.gameHasWinner()){
                                this.winnerMessage(PLAYER_O_SYMBOL);
                            }
                        }
                    if(this.gameTied()){
                        setTimeout(() => {
                            alert("It is a tie!");
                            this.start();
                            }, 100);
                    };
            }else{
                this.winnerMessage(this.currentPlayer)
            }
        }
    }
    winnerMessage(winner){
        setTimeout(() => {
            alert("Player " + winner + " is the winner!");
            this.start();
            }, 100);
    }

    computerTurnEasy(){
        let success = false;
        while(success == false){
            let randomNum = Math.floor(Math.random() * 10);
            if(this.board[randomNum] == ""){
                this.board[randomNum] = PLAYER_O_SYMBOL;
                success = true;
            }
        }
    }
    computerTurnHard(){
        
    }

    //Method that will check if each of the squares match their index in the board array and update it accordingly
    updateBoard(){
        let gameBoard = document.getElementById('gameBoard');
        let squareElements = gameBoard.childNodes;
        squareElements.forEach((element, index) => {
            if(element.innerText != this.board[index]){
                element.innerText = this.board[index];
            }
        })
    }

    //After each move, this method will check to see if any of the winning combos (indices of the three in a row) contain all the same letters
    gameHasWinner(){
        return winningCombos.find(combo => {
            if(this.board[combo[0]] != "" && this.board[combo[1]] != "" && this.board[combo[2]] != "" &&
             this.board[combo[0]] == this.board[combo[1]] && this.board[combo[1]] == this.board[combo[2]]){
                return true;
            }else{
                return false;
            }
        });
    }

    gameTied(){
        let emptyBox = this.board.find(square => square == "");
        if (emptyBox == undefined){
            return true;
        }else{
            return false;
        }
        };
    
    //Method that creates the gameboard on the DOM and listens for clicks
    drawBoard(){
        controlPanel.classList.add('visible');
        main.innerHTML = "";
        let gameBoard = document.createElement('div');
        gameBoard.id = 'gameBoard';
        gameBoard.classList.add('board');
        main.appendChild(gameBoard);                   //.bind(this) is NEW
        gameBoard.addEventListener('click', this.handleSquareClick.bind(this))

        let restartButton = document.getElementById('restart');
        restartButton.addEventListener('click', this.restartGame.bind(this))

        let blueButton = document.getElementById('blue-theme');
        blueButton.addEventListener('click', this.blueify.bind(this));
        let greenButton = document.getElementById('green-theme');
        greenButton.addEventListener('click', this.greenify.bind(this));
        let orangeButton = document.getElementById('orange-theme');
        orangeButton.addEventListener('click', this.orangify.bind(this));
        let pinkButton = document.getElementById('pink-theme');
        pinkButton.addEventListener('click', this.pinkify.bind(this))

        this.board.forEach((square, index) => {
            let squareElement = document.createElement('div');
            squareElement.id = index;
            squareElement.classList.add('square');
            gameBoard.appendChild(squareElement);
        });
    }

    //Method that represents the clear board at the start of the game, sets beginner player and calls the drawboard method
    start(){
        this.board = ["", "", "", 
                        "", "", "", 
                        "", "", "" ];
        this.currentPlayer = PLAYER_X_SYMBOL;
        this.drawBoard();
    }

    restartGame(){
        controlPanel.classList.remove('visible');
        gameSetup();
        
    }

    blueify(){
        r.style.setProperty("--background", "paleturquoise")
        r.style.setProperty("--board-color", "cornflowerblue")
        r.style.setProperty("--control-panel", "lightskyblue" )
    }
    greenify(){
        r.style.setProperty("--background", "lightgreen")
        r.style.setProperty("--board-color", "limegreen")
        r.style.setProperty("--control-panel", "yellowgreen" )
    }
    orangify(){
        r.style.setProperty("--background", "lightsalmon")
        r.style.setProperty("--board-color", "orange")
        r.style.setProperty("--control-panel", "indianred" )
    }
    pinkify(){
        r.style.setProperty("--background", "lavenderblush")
        r.style.setProperty("--board-color", "palevioletred")
        r.style.setProperty("--control-panel", "pink" )
    }

}
//When page first loads
const game = new TicTacToeGame();


function gameSetup(){
    main.innerHTML = "";
    let buttonList = document.createElement('ul');
    buttonList.id = 'button-list';
    let buttonOnePlayer = document.createElement('li');
    buttonOnePlayer.innerText = "One Player";
    let buttonTwoPlayer = document.createElement('li');
    buttonTwoPlayer.innerText = "Two Players";
    buttonList.append(buttonTwoPlayer, buttonOnePlayer);
    main.appendChild(buttonList);
    
    buttonOnePlayer.addEventListener('click', onePlayerGame);
    buttonTwoPlayer.addEventListener('click', twoPlayerGame);
}
gameSetup();

function twoPlayerGame(){
    numPlayers = 2;
    game.start();
}

function onePlayerGame(){
    console.log("yes")
    numPlayers = 1;
    let buttonEasy = document.createElement("li");
    buttonEasy.innerText = "Easy";
    let buttonHard = document.createElement("li");
    buttonHard.innerText = "Hard";
    buttonHard.setAttribute("title", "COMING SOON");
    let buttonList = document.getElementById('button-list');
    buttonList.append(buttonEasy, buttonHard);

    buttonEasy.addEventListener('click', makeEasy);
    buttonHard.addEventListener('click', makeHard);
}

function makeEasy(){
    difficulty = "easy";
    game.start()
}

function makeHard(){
    alert("Coming Soon! Please try easy for now.")
}



