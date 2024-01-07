import React, {FC} from 'react';
import {Cell} from "../models/Cell";

interface CellProps {
    cell: Cell
}

const CellComponent: FC<CellProps> = ({cell}) => {
    return (
        <div className={['Cell', cell.color].join(' ')}>
            {cell.figure}
        </div>
    );
}

export default CellComponent;
