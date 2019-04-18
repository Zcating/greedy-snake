import { Position } from "./Position";
export enum PointType {
    Empty,
    Wall,
    Food,
    SnakeHead,
    SnakeBody,
    SnakeTail,
    TestVisited,
    TestPath
}
export class Point {
    type = PointType.Empty;
    dist = Infinity;
    visited = false;
    parent = new Position(-1, -1);

    constructor() {

    }

    
}