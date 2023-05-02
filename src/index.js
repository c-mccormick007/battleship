import { BLANK_GAME_BOARD } from './gameboardFactory.test.js'
import { Player } from './player.js'
import { Gameboard } from './gameboardFactory.js'
import { Ship } from './shipFactory.js'

function main(){
    const playerBoard = new Gameboard();
    const oppBoard = new Gameboard();
    const player = new Player("Human");
    const opp = new Player("Opposition");
}