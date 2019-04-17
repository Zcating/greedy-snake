import { Position } from "./Position";
enum PointType {
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
    private type = PointType.Empty;
    private dist = Infinity;
    private visited = false;
    private parent = new Position(-1, -1);

    constructor() {

    }


}