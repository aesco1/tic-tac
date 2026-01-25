console.log("Hello")

const gameBoard = (function(){
    const gameArray = Array(9).fill(' ')

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

const gameController = (function(){
    let playerTurn = 0  //start on player 1s turn
    let players = []

    function createPlayers(player1, player2){
        players = [player1, player2];
        console.log(`${players[0]} vs ${players[1]}`);
    }

    function announceWinner(winnersSymbol){
        if (winnersSymbol === "X"){
            console.log(`Winner is ${players[0]}`);
        }
        else{
            console.log(`Winner is ${players[1]}`);
        }
    }

    function startGame(player1, player2){
        createPlayers(player1,player2);

        let winner = false;

        while (!winner){
            if (playerTurn === 0){
                const position = prompt('Enter your postion player 1:');
                winner = gameBoard.playRound(position, "X");
            }
            else{
                const position = prompt('Enter your postion player 2:');
                winner = gameBoard.playRound(position, "O"); 
            }
            playerTurn = (playerTurn + 1) %  2;
        }
        announceWinner(winner);
    }

    

    return {startGame}
})();

gameController.startGame("Joe", "Bob");