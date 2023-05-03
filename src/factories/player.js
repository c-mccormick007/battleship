import { Gameboard } from './gameboardFactory.js'

export class Player {
    constructor(name, isTurn) {
        this.name = name;
        this.gameboard = new Gameboard();
        this.isTurn = isTurn;
    }

    randAttack(opponent){
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        if(JSON.stringify(opponent.gameboard.board[x][y]) === JSON.stringify({ shot: 'fired' })){
            this.randAttack(opponent)
            return 0;
        }else{
            console.log(x,y)
            this.attack(opponent, x, y);
        }
    }

    changeTurn(){
        if (this.isTurn == true){
            this.isTurn = false;
        }else {
            this.isTurn = true;
        }
    }

    attack(opponent, row, col){
            opponent.gameboard.receiveAttack(row,col);   
    }
}