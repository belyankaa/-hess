import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blacklogo from "../../assets/black-king.png";
import whitelogo from "../../assets/white-king.png";

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blacklogo : whitelogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell) {
        if (!super.canMove(target)) {
            return false;
        }

        const mayX = Math.abs(target.x - this.cell.x) > 1
        const mayY = Math.abs(target.y - this.cell.y) > 1

        if (mayX || mayY) {
            return false;
        }

        return true;
    }

    //реализовать маркеровку (условие свободного хода +- 2)
    //реализовать запрещение хода на область проигрыша
}