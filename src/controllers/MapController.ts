import { Point } from "src/base/Point";
import { Position } from 'src/base/Position';

class Matrix<T> {
    private width: number;
    private height: number;
    private contents: Array<T>;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.contents = new Array(width * height);
    }

    at(x: number, y: number): T {
        return this.contents[x * this.width + y];
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}
export class GameMap {
    private matrix: Matrix<Point>;
    constructor(width: number, height: number) {
        this.matrix = new Matrix(width, height);
    }

    getPoint(position: Position): Point {
        return this.matrix.at(position.x, position.y);
    }

    isInside(position: Position) {
        return position.x > 0 
        && position.y > 0 
        && position.x < this.height - 1 
        && position.x < this.width - 1;
    }

    isSafe(position: Position) {
        return this.isInside && (this.getPoint(position).)
    }

    get width() {
        return this.matrix.getWidth();
    }
    get height() {
        return this.matrix.getHeight();
    }
}