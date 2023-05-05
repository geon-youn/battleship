export const Ship = function (n, name) {
    let hits = 0;
    let length = n;

    function hit() {
        this.hits++;
    }

    function isSunk() {
        return this.hits === this.length;
    }

    return { hits, hit, isSunk, length, name };
};

export const GameBoard = () => {
    let board = new Array(10)
        .fill(0)
        .map(() => new Array(10).fill([null, false]));
    let ships = [
        Ship(5, 'carrier'),
        Ship(4, 'battleship'),
        Ship(3, 'cruiser'),
        Ship(3, 'submarine'),
        Ship(2, 'destroyer'),
    ];

    function placeShip(idx, isHorizontal, row, col) {
        const len = ships[idx].length;
        if (isHorizontal) {
            for (let i = 0; i < len; i++) {
                this.board[row][col + i] = [idx, false];
            }
        } else {
            for (let i = 0; i < len; i++) {
                this.board[row + i][col] = [idx, false];
            }
        }
    }

    function receiveAttack(row, col) {
        let square = this.board[row][col];
        if (square[0] !== null) {
            this.ships[square[0]].hit();
        }
        square[1] = true;
    }

    function allShipsSunk() {
        return ships.reduce((p, c) => p && c.isSunk(), true);
    }

    return { board, ships, placeShip, receiveAttack, allShipsSunk };
};
