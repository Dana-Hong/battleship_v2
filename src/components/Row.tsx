import Coordinate from "./Coordinate";
import { RowType } from "../types";

type RowProps = {
    row: RowType;
    handleClick: (id: string) => void;
}

const Row = ({ row, handleClick }: RowProps) => {
    return (
        <div className="flex">
            {row.map(coordinate => (
                <Coordinate 
                    key={coordinate.id}
                    {...coordinate}
                    handleClick={handleClick}
                />
            ))}
        </div>
    )
}

export default Row;