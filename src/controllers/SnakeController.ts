import { GameMap } from './MapController';
import { Direction, Position } from 'src/base/Position';
import { PointType } from 'src/base/Point';

enum PathFoundType {
    Min,
    Max
}

export class Snake {

    private map: GameMap;
    private dead = false;
    private direction: Direction;

    static copy(snake: Snake): Snake {
        const snakeCopy = new Snake();
        if (!snake) {
            return snakeCopy;
        }
        snakeCopy.map = snake.map;
        snakeCopy.dead = snake.dead;
        snakeCopy.direction = snake.direction;
        return snakeCopy;
    }

    constructor() {
        
    }


    isDead(): boolean {
        return this.dead;
    }

    addBody() {
        
    }

    findMinPathToFood(path: Direction[]) {
        this.findPathTo(PathFoundType.Min, this.map.food, path)
    }

    findPathTo(type: PathFoundType, to: Position, path: Direction[]) {
        const originType = this.map.getPoint(to).type;
        this.map.getPoint(to).type = PointType.Empty;
        if (type === PathFoundType.Min) {
            // this.map.findMinPath();
        } else {
            // this.map.findMaxPath();
        }
    }

    next() {
        if (this.isDead()){
            return;
        } else if (!this.map.isExsitedFood()) {
            this.direction = Direction.None;
            return;
        }

        const snake = Snake.copy(this);
        
        const pathToFood: Direction[] = [];
        const pathToTail: Direction[] = [];

        snake.
    }
}