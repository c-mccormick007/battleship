import { Gameboard } from '../src/factories/gameboardFactory.js'
import { Ship } from '../src/factories/shipFactory.js'

export const BLANK_GAME_BOARD = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null]
  ]

describe('gameboard factory', () => {
    test('empty gameboard', () => {
        const gameboard = Gameboard();
        expect(gameboard.board).toEqual(BLANK_GAME_BOARD);
    })

    test('place a ship on coordinates 3,5 horizontal', () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        gameboard.place(ship, 3, 5, false);
        expect(gameboard.board[3][5]).toEqual(ship);
        expect(gameboard.board[3][6]).toEqual(ship);
        expect(gameboard.board[3][7]).toEqual(ship);
    })
    test('place a ship on coordinates 3,5 vertical', () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        gameboard.place(ship, 7, 5, true);
        expect(gameboard.board[7][5]).toEqual(ship);
        expect(gameboard.board[8][5]).toEqual(ship);
        expect(gameboard.board[9][5]).toEqual(ship);
    })
    test('cant place ship outside board horizontally', () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        expect(() => {
            gameboard.place(ship, 3, 8, false);
        }).toThrowError('Can not place outside 10x10.');
    })
    test('cant place ship outside board vertically', () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        expect(() => {
            gameboard.place(ship, 8, 5, true);
        }).toThrowError('Can not place outside 10x10.');
    })
    test('cant place ship on same space as another ship', () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        const shipTwo = Ship(3);
        gameboard.place(ship, 3, 5, false);

        expect(() => {
            gameboard.place(shipTwo, 3, 5, false);
        }).toThrowError('Cant place ship on top of another ship');
    })

    test('recieve attack works properly', () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        gameboard.place(ship, 3, 5, false);
        gameboard.receiveAttack(3, 6);
        expect(gameboard.board[3][6].hits).toBe(1);
    })
    test('recieve attack works properly twice', () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        gameboard.place(ship, 3, 5, false);
        gameboard.receiveAttack(3, 6);
        gameboard.receiveAttack(3, 5);
        expect(gameboard.board[3][7].hits).toBe(2);
        expect(gameboard.board[3][7].isSunk()).toBe(false);
    })
    test('ship gets sunk', () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        gameboard.place(ship, 3, 5, false);
        gameboard.receiveAttack(3, 6);
        gameboard.receiveAttack(3, 5);
        gameboard.receiveAttack(3, 7);
        expect(gameboard.board[3][7].isSunk()).toBe(true);
    })
    test('shot misses', () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        gameboard.place(ship, 3, 5, false);
        gameboard.receiveAttack(4, 6);
        expect(gameboard.board[4][6] == {shot: 'fired'})
        expect(gameboard.board[3][5].hits).toBe(0);
    })
    test('allsunk works correctly', () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        const shipTwo = Ship(2);
        gameboard.place(shipTwo, 4, 5, false);
        gameboard.place(ship, 3, 5, false);
        gameboard.receiveAttack(3, 6);
        gameboard.receiveAttack(3, 5);
        gameboard.receiveAttack(3, 7);
        gameboard.receiveAttack(4, 6);
        gameboard.receiveAttack(4, 5);
        expect(gameboard.allSunk()).toBe(true);
    })
    test('allsunk works correctly', () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        const shipTwo = Ship(2);
        gameboard.place(shipTwo, 4, 5, false);
        gameboard.place(ship, 3, 5, false);
        gameboard.receiveAttack(3, 6);
        gameboard.receiveAttack(3, 5);
        gameboard.receiveAttack(3, 7);
        gameboard.receiveAttack(4, 6);
        gameboard.receiveAttack(4, 1);
        expect(gameboard.allSunk()).toBe(false);
    })
})