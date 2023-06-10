import { useState } from "react";
import Row from "./Row";
import { generateCoordinates, generateCoordinatesV2 } from "../utils";
import Coordinate from "./Coordinate";

const Board = () => {
    const [coordinates, setCoordinates] = useState(generateCoordinatesV2);
    
    function generateUIRows() {
        let rows = [];
       
        for (let i = 0; i < 10; i++) {
            const row = [];

            for (let j = 0; j < 10; j++) {
                const currentIndex = Number(`${i}${j}`)
                row.push(<Coordinate key={coordinates[currentIndex].id}{...coordinates[currentIndex]} onClick={handleClick}/>)
            }

            rows.push(row);
        }
        
        return rows;
    }

    const UIRows = generateUIRows().map((row, index)=> <div key={index} className="flex">{row}</div>); 

    // const rows = coordinates.map((row, index) => <Row key={index} row={row} handleClick={handleClick} />) 
    console.log(UIRows);
    
    function handleClick(id: string) {
        console.log(id);
        setCoordinates(coordinates.map(coordinate => (
            coordinate.id === id
            ? {
                ...coordinate,
                targeted: true
            }
            : coordinate
        )));
        // console.log(coordinates.filter((row, index) => index === Number(yCoordinate)));
    }

    // console.log(coordinates);

    return (
        <div>
            {UIRows}
        </div>
    )
}

export default Board;