import { gameboardFactory } from "./factories/gameboardFactory";

export function gridLoader(player1, player2){
    const boardOne = player1.gameboard.board;
    const boardTwo = player2.gameboard.board;
    let count = 1;

    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
            const cell = document.getElementById(`cell1-${count}`)
            count++;

            cell.addEventListener("click", () => {
                if(player2.isTurn){
                    player1.gameboard.receiveAttack(i,j);
                }else{
                    console.log("not yo turn")
                }
              });


            if(boardOne[i][j] === null){
                cell.style.backgroundColor = "#59baff";
            }else{
                cell.style.backgroundColor = "#6c8291";
            }
        }
    }
    count = 1;

    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
            const cell = document.getElementById(`cell2-${count}`)
            count++;
            cell.addEventListener("click", () => {
                if(player1.isTurn){
                    const result = player2.gameboard.receiveAttack(i,j);
                    if (result === null){
                        cell.style.backgroundColor = "#d9fac5";
                    }else if (result === 'hit'){
                        cell.style.backgroundColor = "#db2a82";
                    }
                    player1.isTurn = false;
                }else{
                    console.log("not yo turn")
                }
              });
            cell.style.backgroundColor = "#59baff";
        }
    }



}