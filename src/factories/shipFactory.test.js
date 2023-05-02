import { Ship } from './shipFactory.js'

describe('Ship Factory', () => {

    test('creates ship with correct properties', () => {
        const ship = Ship(3);
        expect(ship.length).toBe(3);
        expect(ship.hits).toBe(0);
        expect(ship.isSunk()).toBe(false);
    });

    test('ship hits register', () => {
        const ship = Ship(3);
        ship.hit();
        expect(ship.hits).toBe(1);
    })

    test('ship with max hits is sunk', () => {
        const ship = Ship(3);
        for (let i = 0; i < 3; i++){
            ship.hit();
        }
        expect(ship.isSunk()).toBe(true);
    })

    test('ship with max hits can not be hit again', () => {
        const ship = Ship(3);
        for (let i = 0; i < 3; i++){
            ship.hit();
        }
        expect(() => ship.hit()).toThrow();
    })
})