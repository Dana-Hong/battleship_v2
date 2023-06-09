import { useState } from "react";
import Row from "./Row";
import { generateCoordinates } from "../utils";

const Board = () => {
    const [coordinates, setCoordinates] = useState(generateCoordinates);
    const rows = coordinates.map((row, index) => <Row key={index} row={row} handleClick={handleClick} />) 
    console.log(rows)
    
    function handleClick(id: string) {
        console.log(id)
    }

    return (
        <div>
            {rows}
        </div>
    )
}

export default Board;