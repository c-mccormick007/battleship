import { identity } from "lodash";


export function Gameboard(){
    const board = []

    for (let i = 0; i < 10; i++) {
        board.push(Array(10).fill(null));
      }

    function place(ship, row, col, isVert){
        const shipLength = ship.length;

        if (board[row][col] !== null){
            throw new Error('Cant place ship on top of another ship')
        }

        if (shipLength + col > 10 || shipLength + row > 10){
            throw new Error('Can not place outside 10x10.')
        }

        for (let i = 0; i < shipLength; i++){
            if (isVert){
                board[row + i][col] = ship;
            }else {
                board[row][col + i] = ship;
            }
        }
    }

    function receiveAttack(row, col){
        const spot = board[row][col]
        if (spot === null){

          board[row][col] = {shot: 'fired'};
          return null;

        }else if (spot.shot == 'fired'){

          return 'fired'

        }else{

          board[row][col] = {shot: 'fired'}
          spot.hit();

          return 'hit'
        }
    }

    function allSunk() {
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == null) {
              continue;
            } else if (board[i][j].shot != 'fired' && !board[i][j].isSunk()) {
              return false;
            }
          }
        }
        return true;
      }

    return { board , place , receiveAttack , allSunk }
}