import { Ship, GameBoard } from './game';

describe('ships', () => {
    test('hits increases when a ship is hit', () => {
        const ship = Ship(3);
        const oldHits = ship.hits;
        ship.hit();
        expect(ship.hits).toBe(oldHits + 1);
    });

    test('sinks when number of hits equals its length', () => {
        const ship = Ship(2);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});

describe('game board', () => {
    test('places ship when given valid coordinates', () => {
        const gb = GameBoard();
        gb.placeShip(0, true, 0, 0);
        expect(gb.board[0][0][0]).not.toBeNull();
        expect(gb.board[0][1][0]).not.toBeNull();
        expect(gb.board[0][2][0]).not.toBeNull();
        expect(gb.board[0][3][0]).not.toBeNull();
        expect(gb.board[0][4][0]).not.toBeNull();
    });

    test('receive attack calls hit when hits a ship', () => {
        const gb = GameBoard();
        const mockHit = jest.fn();
        gb.ships.push({ hit: mockHit, length: 1 });
        gb.placeShip(5, true, 0, 0);
        gb.receiveAttack(0, 0);
        expect(mockHit.mock.calls).toHaveLength(1);
        expect(gb.board[0][0][1]).toBe(true);
    });

    test('receive attack marks hit spot', () => {
        const gb = GameBoard();
        gb.receiveAttack(0, 0);
        expect(gb.board[0][0][1]).toBe(true);
    });

    test('all boats sunk works', () => {
        const gb = GameBoard();
        expect(gb.allShipsSunk()).toBe(false);
        for (let i = 0; i < 5; i++) {
            gb.placeShip(i, true, i, 0);
            for (let j = 0; j < gb.ships[i].length; j++) {
                gb.receiveAttack(i, j);
            }
        }
        expect(gb.allShipsSunk()).toBe(true);
    })
});
