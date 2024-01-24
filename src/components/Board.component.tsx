import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./Cell.component";
import {Cell} from "../models/Cell";
import {Colors} from "../models/Colors";
import {Player} from "../models/Player";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayers: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayers}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    useEffect(() => {
        highLightCells();
    }, [selectedCell])

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayers();
            setSelectedCell(null);
            updateBoard();
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    function highLightCells() {
        board.highLightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h3>Текущий игрок {currentPlayer?.color}</h3>
            <div className="Board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent click={click} cell={cell}
                                           selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                           key={cell.id}/>
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}

export default BoardComponent;
