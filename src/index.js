import { BLANK_GAME_BOARD } from '../tests/gameboardFactory.test.js'
import { Player } from './factories/player.js'
import { Gameboard } from './factories/gameboardFactory.js'
import { Ship } from './factories/shipFactory.js'

function main(){
    const player = new Player("Human");
    const opp = new Player("Opposition");

    const shipOne = Ship(2)
    const shipTwo = Ship(3)
    const shipThree = Ship(4)

    player.gameboard.place(shipOne, 3, 6, true);
    player.gameboard.place(shipTwo, 2, 2, true);
    player.gameboard.place(shipThree, 1, 1, true);

    opp.gameboard.place(shipOne, 4, 6, true);
    opp.gameboard.place(shipTwo, 5, 1, true);
    opp.gameboard.place(shipThree, 6, 2, true);

    console.log(player,opp)

}