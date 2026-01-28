console.log("Hello")

// Game Logic
const gameBoard = (function(){
    let gameArray = Array(9).fill('')
    function playRound(postion, symbol){
        gameArray[postion] = symbol;
        const winningSymbol = winConCheck();
        return winningSymbol;
    }

    function winConCheck(){
        const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2],
        ];

        for (const [a, b, c] of lines){
            if (gameArray[a] && gameArray[a] === gameArray[b] && gameArray[b] === gameArray[c]){
                return { symbol: gameArray[a], cells: [a, b, c] };
            }
        }
        return false;
    }

    function clearArray(){
        gameArray = Array(9).fill('');
    }

    return {playRound, gameArray, clearArray}
})();

// Handles Game Flow
const gameController = (function(){
    let playerTurn = 0  //start on player 1s turn
    let turnCount = 0
    gameOver = 0
    let players = [];
    let initialized = false;

    function createPlayers(player1, player2){
        players = [player1, player2];
        console.log(`Players Created ${players[0]} vs ${players[1]}`);
    }

   function handleMove(index){
        if (gameOver){
            return
        }

        if (turnCount === 8){
            displayController.announceTie();
        }
        const marker = playerTurn === 0? '✖️' : '⭕';
        const winner = gameBoard.playRound(index, marker);

        displayController.updateCell(index, marker);

        if (winner){
            gameOver = 1;
            displayController.announceWinner(winner);
        } else {
            playerTurn = (playerTurn + 1) % 2
            displayController.announcePlayerChange(playerTurn);
        }
        turnCount += 1;
   }

    function startGame(player1, player2){
        createPlayers(player1,player2);
        console.log(`${player1} vs. ${player2}`)

        if (!initialized){
            displayController.init(handleMove);
            displayController.initReset();
            initialized = true;
        }
    }

    function getPlayers(){
        return players;
    }

    function handleReset(){
        playerTurn = 0;
        gameOver = 0;
        turnCount = 0;
        gameBoard.clearArray();
        displayController.cleanUpForReset();
    }

    return {startGame, handleMove, getPlayers, handleReset}
})();

// handles UI
const displayController = (function(){

    // init event listeners for the buttons
    function init(handleMoveCallback){
        document.querySelectorAll('.cell').forEach((cell,index) =>{
            cell.addEventListener('click', () => {
                handleMoveCallback(index);
            })
        });
    }

    function initStart(){
        const submitButton = document.getElementById('submitButton');
        submitButton.addEventListener('click', () => {

            const announcementZone = document.getElementById('announcement-zone');
           
            //Init Game with player names
            player1Name = document.getElementById('player-1-input').value;
            player1Name = player1Name.charAt(0).toUpperCase() + player1Name.slice(1);

            player2Name = document.getElementById('player-2-input').value
            player2Name = player2Name.charAt(0).toUpperCase() + player2Name.slice(1);

            gameController.startGame(player1Name, player2Name);

            document.querySelector('.user-input-area').classList.add('hidden');
        
            announcementZone.classList.remove('hidden');
            document.getElementById('reset-button').classList.remove('hidden')

            announcementZone.textContent = `${player1Name}'s Turn`;
        })
    }

    function initReset(){
        const resetButton = document.getElementById('reset-button');
        resetButton.addEventListener('click', () => {
            gameController.handleReset();
        });
    }

    //update CurrentPlayer
    function announcePlayerChange(playerTurn){
        const announcementZone = document.getElementById('announcement-zone');
        playerArray = gameController.getPlayers();

        if (playerTurn === 0){
            announcementZone.textContent = `${playerArray[0]}'s Turn`;
        }else{
            announcementZone.textContent = `${playerArray[1]}'s Turn`;
        }
    }

    // update display marker
    function updateCell(index, marker){
        const cell = document.querySelectorAll('.cell')[index];
        cell.textContent = marker;
    }

    function announceWinner(winner){
        const announcementZone = document.getElementById('announcement-zone');
        playerArray = gameController.getPlayers();

        if (winner.symbol === '✖️'){
            announcementZone.textContent = `Winner is ${playerArray[0]}`;
        } else{
            announcementZone.textContent = `Winner is ${playerArray[1]}`;
        }

        //highlight winning cells
        const cellList = document.querySelectorAll('.cell');
        winner.cells.forEach(index => {
            cellList[index].classList.add('winner');
        });
    }

    function announceTie(){
        console.log("Tie Game");
    }


    function cleanUpForReset(){
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.textContent = '';
            cell.classList.remove('winner');
        });

        document.querySelector('.user-input-area').classList.remove('hidden');
        document.getElementById('announcement-zone').classList.add('hidden');
        document.getElementById('reset-button').classList.add('hidden');
    }

    document.addEventListener('DOMContentLoaded', initStart);

    return {init, updateCell, announceWinner, initStart, announcePlayerChange, announceTie, initReset, cleanUpForReset} 
})();

