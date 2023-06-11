import { useState, useEffect } from "react";
import { generateCoordinates, generateFleet } from "../utils";
import Coordinate from "./Coordinate";

const Board = () => {
    const [fleet, setFleet] = useState(generateFleet);
    const [coordinates, setCoordinates] = useState(generateCoordinates(fleet));
    // function generateUIRows() {
    //     const rows = [];
       
    //     for (let i = 0; i < 11; i++) {
    //         const row = [];

    //         for (let j = 0; j < 11; j++) {
    //             const currentIndex = Number(`${i}${j}`)
    //             row
    //                 .push(
    //                     <Coordinate 
    //                         key={coordinates[currentIndex].id}
    //                         {...coordinates[currentIndex]}
    //                         onClick={handleClick}
    //                     />
    //                 );
    //         }
    //         rows.push(row);
    //     }
        
    //     return rows;
    // }
    // console.log(generateCoordinates());
    // const UIRows = generateUIRows().map((row, index)=> <div key={index} className="flex">{row}</div>); 
    /**
     * loop over all coordinates
     * for every coordinate in coordinates
     *  compare the coordinate with each fleet coordinate in fleetCoordinates
     *      if the coordinate is in fleetCoordinates, update "occupied" to true.
     *      if the coordinate is not in fleetCoordinates, don't change anything.
     *  
     */



    /**
     * Generates new fleet positions and updates the Fleet and Coordinates states.
     */
    function generateRandomFleet() {
        const newFleet = generateFleet();
        setFleet(newFleet);

        const fleetCoordinateIds = newFleet.map(fleetCoordinate => fleetCoordinate.id);

        setCoordinates(prevCoordinates => (prevCoordinates.map(coordinate => (
                coordinate.occupied
                ? { ...coordinate, occupied: false }
                : coordinate
            ))
        ));
        setCoordinates(prevCoordinates => (prevCoordinates.map(coordinate => fleetCoordinateIds.includes(coordinate.id) 
            ? { ...coordinate, occupied: true } 
            : coordinate)));
    }

    function generateUIRows() {
        return coordinates.map(coordinate => <Coordinate key={coordinate.id} {...coordinate} onClick={handleClick} />)
    }
    function handleClick(id: string) {
        // const updatedFleet = fleet.map(ship => (
        //     ship.position.find(coordinate => coordinate === id)
        //     ?
        //     :
        // ))
        setCoordinates(coordinates.map(coordinate => (
            coordinate.id === id
            ? {
                ...coordinate,
                targeted: true
            }
            : coordinate
        )));
        console.log(id);
    }

    console.log(coordinates);
    console.log(fleet);

    return (
        <div className="grid grid-cols-11"> 
            {generateUIRows()}
            <p onClick={() => {
                generateRandomFleet();
            }}>Place for me</p>
        </div>
    )
}

export default Board;