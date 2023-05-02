import { BLANK_GAME_BOARD } from './gameboardFactory.test.js'
import { Player } from './player.js'
import { Gameboard } from './gameboardFactory.js'
import { Ship } from './shipFactory.js'

describe('Player test', () => {
    
    test('Create new player', () => {
        const player = new Player('dave');
        expect(player.name).toBe('dave');
        expect(player.gameboard.board).toEqual(BLANK_GAME_BOARD)
    })

    test('Create new player and place 3 ships', () => {
        const player = new Player('dave');
        const shipOne = Ship(3);
        const shipTwo = Ship(4);
        const shipThree = Ship(5);
        player.gameboard.place(shipOne, 1, 1, false);
        player.gameboard.place(shipTwo, 2, 1, false);
        player.gameboard.place(shipThree, 3, 1, false);
        expect(player.gameboard.board[3][2]).toBe(shipThree);
        expect(player.gameboard.board[2][2]).toBe(shipTwo);
        expect(player.gameboard.board[1][2]).toBe(shipOne);
    })

    test('Create two players', () => {
        const player = new Player('dave');
        const playerTwo = new Player('pc');
        
        const shipOneA = Ship(3);
        const shipOneB = Ship(3);
        
        player.gameboard.place(shipOneA, 1, 1, false);
        
        playerTwo.gameboard.place(shipOneB, 1, 1, false);

        expect(player.gameboard.board[1][2]).toBe(shipOneA);
        expect(playerTwo.gameboard.board[1][2]).toBe(shipOneB);
    })

    test('One player Sinks another players ship', () => {
        const player = new Player('dave');
        const playerTwo = new Player('pc');
        
        const shipOneA = Ship(3);
        const shipOneB = Ship(3);
        
        player.gameboard.place(shipOneA, 1, 1, false);
        playerTwo.gameboard.place(shipOneB, 1, 1, false);

        player.attack(playerTwo, 1, 2);
        player.attack(playerTwo, 1, 1);
        player.attack(playerTwo, 1, 3);

        expect(player.gameboard.board[1][2]).toBe(shipOneA);
        expect(playerTwo.gameboard.board[1][2].isSunk()).toBe(true);
    })

    test('turns change after attacks', () => {
            const player = new Player('dave', true);
            const playerTwo = new Player('pc', false);
            
            const shipOneA = Ship(3);
            const shipOneB = Ship(3);
            
            player.gameboard.place(shipOneA, 1, 1, false);
            playerTwo.gameboard.place(shipOneB, 1, 1, false);
    
            player.attack(playerTwo, 1, 2);
            player.changeTurn();
            playerTwo.changeTurn();
    
            expect(playerTwo.isTurn).toBe(true);
    })  

    test('randAttack should attack a random square', () => {
        const opponent = new Player('Test P2')

        const oppSpy = jest.spyOn(opponent.gameboard, 'receiveAttack');
        const randSpy = jest.spyOn(Math, 'random');
    
        const player = new Player('Test Player');
        player.randAttack(opponent);
        expect(oppSpy).toHaveBeenCalled();
        expect(randSpy).toHaveBeenCalled();
    
        randSpy.mockRestore();
        oppSpy.mockRestore();
      });

      test('randAttack should not shoot the same spot multiple times', () => {
        const player = new Player('Player');
        const opponent = new Player('Opponent');
        const receiveAttackSpy = jest.spyOn(opponent.gameboard, 'receiveAttack');
      
        for (let i = 0; i < 60; i++) {
          player.randAttack(opponent);
        }

        const calls = receiveAttackSpy.mock.calls;
        const coordinates = calls.map(call => call.slice(1));
        const uniqueCoordinates = new Set(coordinates);

        expect(uniqueCoordinates.size).toBe(calls.length);

      });
})