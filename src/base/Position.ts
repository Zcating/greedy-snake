export enum Direction {
    None,
    Left,
    Up,
    Right,
    Down
}

export class Position {

    public static INVALID = new Position(-1, -1);

    public x = 0;
    public y = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(position: Position) {
        return new Position(this.x + position.x, this.y + position.y);
    }

    isEqual(position: Position) {
        return this.x === position.x && this.y === position.y;
    }

    getAllAdjPositions(): Array<Position> {
        const result: Array<Position> = [];
        const dxy = [
            0, -1,
            -1, 0,
            1, 0,
            0, 1
        ];
        for (let i = 0; i < dxy.length; i += 2) {
            result.push(new Position(this.x + dxy[i], this.x + dxy[i+1]));
        }

        return result;
    }

    getDirectionTo(position: Position): Direction {
        const dx = position.x - this.x;
        const dy = position.y - this.y;
        if (dx === 0 && dy === -1) {
            return Direction.Left;
        }
        else if (dx === 0 && dy === 1) {
            return Direction.Right;
        }
        else if (dx === -1 && dy === 0) {
            return Direction.Up;
        }
        else if (dx === 1 && dy === 0) {
            return Direction.Down;
        }
        else {
            return Direction.None;
        }
    }
}