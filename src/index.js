import { Player } from './factories/player.js'
import { Gameboard } from './factories/gameboardFactory.js'
import { Ship } from './factories/shipFactory.js'
import { grids } from './gridMaker.js';

import './styles.css';
import { gridLoader } from './gridLoader.js';

grids();
main();

function main(){
    const player = new Player("Human", true);
    const opp = new Player("Opposition", false);

    const shipOne = Ship(2)
    const shipTwo = Ship(3)
    const shipThree = Ship(4)
    const shipOneB = Ship(2)
    const shipTwoB = Ship(3)
    const shipThreeB = Ship(4)


    player.gameboard.place(shipOne, 3, 6, true);
    player.gameboard.place(shipTwo, 2, 2, true);
    player.gameboard.place(shipThree, 1, 1, true);

    opp.gameboard.place(shipOneB, 4, 6, true);
    opp.gameboard.place(shipTwoB, 5, 1, true);
    opp.gameboard.place(shipThreeB, 6, 2, true);

    gridLoader(player, opp);

    let gameFinished = false;

    const gameloop = () => {
        if(player.isTurn == false){

            opp.randAttack(player)
            player.isTurn = true;

            if (player.gameboard.allSunk() || opp.gameboard.allSunk()) {
                gameFinished = true;
                console.log("Game Over!");
            }
            
            setTimeout(gameloop, 1000);
        }else{
            console.log('yourturn..')
        }
    }
      
    gameloop();
}