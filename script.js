console.log("Hello")

// Game Logic
const gameBoard = (function(){
    const gameArray = Array(9).fill('')

    function playRound(postion, symbol){
        gameArray[postion] = symbol;
        const winningSymbol = winConCheck();
        return winningSymbol;
    }

    function winConCheck(){
        const lines = [
        // rows
        [gameArray[0], gameArray[1], gameArray[2]],
        [gameArray[3], gameArray[4], gameArray[5]],
        [gameArray[6], gameArray[7], gameArray[8]],
        // columns
        [gameArray[0], gameArray[3], gameArray[6]],
        [gameArray[1], gameArray[4], gameArray[7]],
        [gameArray[2], gameArray[5], gameArray[8]],
        // diagonals
        [gameArray[0], gameArray[4], gameArray[8]],
        [gameArray[6], gameArray[4], gameArray[2]],
        ];

        for (const [a, b, c] of lines){
            if (a && a === b && b === c){
                return a
            }
        }
        return false
    }


    return {playRound, gameArray}
})();

// Handles Game Flow
const gameController = (function(){
    let playerTurn = 0  //start on player 1s turn
    let turnCount = 0
    let players = [];

    function createPlayers(player1, player2){
        players = [player1, player2];
        console.log(`Players Created ${players[0]} vs ${players[1]}`);
    }

   function handleMove(index){
        if (turnCount === 8){
            displayController.announceTie();
        }
        const marker = playerTurn === 0? '✖️' : '⭕';
        const winner = gameBoard.playRound(index, marker);

        displayController.updateCell(index, marker);

        if (winner){
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
        displayController.init(handleMove);
        displayController.initStart();
    }

    return {startGame, handleMove}
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
            
            //Init Game with player names
            player1Name = document.getElementById('player-1-input').value;
            player2Name = document.getElementById('player-2-input').value
            gameController.startGame(player1Name, player2Name);

            // Changes button/input area to an announcement area
            const announcementZone = document.createElement('h1');
            announcementZone.classList.add('announcment-zone');

            const playerInfoAndStart = document.querySelector('.user-input-area');
            
            player1Name = player1Name.charAt(0).toUpperCase() + player1Name.slice(1);
            announcementZone.textContent = `${player1Name}'s Turn`;

            playerInfoAndStart.replaceChildren(announcementZone);
        })
    }

    //update CurrentPlayer
    function announcePlayerChange(playerTurn){

    }

    // update display marker
    function updateCell(index, marker){
        const cell = document.querySelectorAll('.cell')[index];
        cell.textContent = marker;
    }

    function announceWinner(winner){
        //manip dom element to show winner or tie (tie happens when)
    }

    function announceTie(){
        console.log("Tie Game");
    }

    document.addEventListener('DOMContentLoaded', initStart);

    return {init, updateCell, announceWinner, initStart, announcePlayerChange, announceTie} 
})();

