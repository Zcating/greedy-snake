enum Direction {
    None,
    Left,
    Up,
    Right,
    Down
}

class Coordinate {
    private x = 0;
    private y = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }


    setX(x: number) {
        this.x = x;
    }

    setY(y: number) {
        this.y = y;
    }

    add(coordinate: Coordinate) {
        return new Coordinate(this.x + coordinate.x, this.y + coordinate.y);
    }

    isEqual(coordinate: Coordinate) {
        return this.x === coordinate.x && this.y === coordinate.y;
    }

    getAllAdjCoordinates(): Array<Coordinate> {
        const result: Array<Coordinate> = [];
        const dxy = [
            0, -1,
            -1, 0,
            1, 0,
            0, 1
        ];
        for (let i = 0; i < dxy.length; i += 2) {
            result.push(new Coordinate(this.x + dxy[i], this.x + dxy[i+1]));
        }

        return result;
    }

    getDirectionTo(coordinate: Coordinate): Direction {
        const dx = coordinate.x - this.x;
        const dy = coordinate.y - this.y;
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