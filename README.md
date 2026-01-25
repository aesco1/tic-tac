# tic-tac
Tic-Tac-Toe game to practice IIFE 


# Notes
gameboard should be one obj (maintain the choices in an array)w
within it have 2 objects (1 for each player)
Then write function to display array
Then function that handles user clicks and handles them in array (should have check to see if empty)
Add input for names, start/stop button, then display game results

How to check for win? check for 3 consecutive horizontal, diagonal, and vertical (maybe dont run check until 2nd play)
keep a need to win array for each player to make check quick. 

const lines = [
  // rows
  [board[0][0], board[0][1], board[0][2]],
  [board[1][0], board[1][1], board[1][2]],
  [board[2][0], board[2][1], board[2][2]],
  // columns
  [board[0][0], board[1][0], board[2][0]],
  [board[0][1], board[1][1], board[2][1]],
  [board[0][2], board[1][2], board[2][2]],
  // diagonals
  [board[0][0], board[1][1], board[2][2]],
  [board[0][2], board[1][1], board[2][0]],
];