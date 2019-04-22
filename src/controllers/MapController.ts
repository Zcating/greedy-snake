import { Point, PointType } from "src/base/Point";
import { Position, Direction } from 'src/base/Position';

class Queue<T> {
    private content : T[] = [];
    constructor() {
    }

    public front() {
        return this.content[0];
    }

    public push(value:T) {
        this.content.push(value);
    }

    public pop() {
        this.content.splice(0, 1);
    }

    public isEmpty() {
        return this.content.length === 0;
    }

}

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

    getContents() {
        return this.contents;
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

    private food = Position.INVALID;

    constructor(width: number, height: number) {
        this.matrix = new Matrix(width, height);
    }

    getPoint(position: Position): Point {
        return this.matrix.at(position.x, position.y);
    }

    // Food Operation

    createRandomFood() {
        const emptyPositions = this.getEmptyPositions();
        if (!emptyPositions.length) {
            const randomIndex = Math.floor(Math.random() * 100) % emptyPositions.length;
            this.createFood(emptyPositions[randomIndex]);
        }
    }

    createFood(position: Position) {
        this.food = position;
        this.matrix.at(this.food.x, this.food.y).type = PointType.Food;
    }

    removeFood() {
        if (!this.food.isEqual(Position.INVALID)) {
            this.matrix.at(this.food.x, this.food.y).type = PointType.Empty;
            this.food = Position.INVALID;
        }
    }
    
    isExsitedFood() {
        return this.food.isEqual(Position.INVALID);
    }

    isSafe(position: Position): boolean {
        const point = this.getPoint(position);
        return this.isInside(position) && (point.type === PointType.Empty || point.type === PointType.Food); 
    }

    isHead(position: Position): boolean {
        return this.typeCheck(position, PointType.SnakeHead);
    }

    isTail(position: Position): boolean {
        return this.typeCheck(position, PointType.SnakeTail);
    }

    isEmpty(position: Position): boolean {
        return this.typeCheck(position, PointType.Empty);
    }

    isInside(position: Position) {
        return position.x > 0 
        && position.y > 0 
        && position.x < this.height - 1 
        && position.x < this.width - 1;
    }

    typeCheck(position: Position, type: PointType) {
        return this.isInside(position) && this.matrix.at(position.x, position.y).type === type;
    }

    isAllBody(): boolean {
        const width = this.width;
        const height = this.height;
        for (let x = 0; x < width - 1; x++) {
            for(let y = 0; y < height - 1; y++) {
                const type = this.matrix.at(x, y).type;
                if (!(type === PointType.SnakeHead || type === PointType.SnakeBody || type === PointType.SnakeTail)) {
                    return false;
                }
            }
        }
        return true;
    }


    private getEmptyPositions() {
        const emptyPositions = [];
        const width = this.width;
        const height = this.height;
        for (let x = 0; x < width - 1; x++) {
            for(let y = 0; y < height - 1; y++) {
                if (this.matrix.at(x, y).type === PointType.Empty) {
                    emptyPositions.push(new Position(x, y));
                }
            }
        }
        return emptyPositions;
    }

    private estimateDestination(from: Position, to: Position) {
        const dx = Math.abs(from.x - to.x);
        const dy = Math.abs(from.y - to.y);
        return dx + dy;
    }

    private constructPath(from: Position, to: Position, path: Array<Direction>) {
        let tmp = to;
        while (!tmp.isEqual(Position.INVALID) && !(tmp.isEqual(from)) ) {
            const parent = this.getPoint(tmp).parent;
            path.unshift(parent.getDirectionTo(tmp));
            tmp = parent;
        }
    }


    private findMinPath(from: Position, to: Position, direction: Direction, path: Array<Direction>) {
        if (!(this.isInside(from) && this.isInside(to))) {
            return;
        }

        this.reset();
        this.getPoint(from).dist = 0;
        
        const queue = new Queue<Position>();
        queue.push(from);
        while (!queue.isEmpty()) {
            const currentPosition = queue.front();
            queue.pop();

            if (currentPosition.isEqual(to)) {
                this.constructPath(from, to, path);
                break;
            }

            const currentPoint = this.getPoint(currentPosition);
            const bestDirection = currentPosition.isEqual(from) ? direction : currentPoint.parent.getDirectionTo(currentPosition);
            const adjPositions = currentPosition.getAllAdjPositions();

            // find the current best direction.
            for (let i = 0; i < adjPositions.length; i++) {
                if (bestDirection === currentPosition.getDirectionTo(adjPositions[i])) {
                    const tmp = adjPositions[0];
                    adjPositions[0] = adjPositions[i];
                    adjPositions[i] = tmp;
                    break;
                }
            }

            for (const adjPosition of adjPositions) {
                const adjPoint = this.getPoint(adjPosition);
                // to judge the point if acceptable.
                if (this.isEmpty(adjPosition) && adjPoint.dist === Infinity) {
                    adjPoint.parent = currentPosition;
                    adjPoint.dist = currentPoint.dist + 1;
                    queue.push(adjPosition);
                }
            }
        }    
    }

    public findMaxPath(from: Position, to: Position, direction: Direction, path: Direction[]) {
        if (!(this.isInside(from) && this.isInside(to))) {
            return;
        }
        this.reset();
        

    }

    private reset () {
        const width = this.width;
        const height = this.height; 
        for (let i = 1; i < width - 1; ++i) {
            for (let j = 1; j < height - 1; ++j) {
                this.matrix.at(i, j).dist = Infinity; // INF == INT_MAX
                this.matrix.at(i, j).visited = false;
            }
        }
    }

    // GETTER 

    get width() {
        return this.matrix.getWidth();
    }
    get height() {
        return this.matrix.getHeight();
    }
}
