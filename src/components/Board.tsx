import { useState, useEffect } from "react";
import { generateCoordinates, generateFleet, generatePotentialShipCoordinates } from "../utils";
import Coordinate from "./Coordinate";
import { Axis, CoordinateType, Fleet, ShipNames } from "../types";

type BoardProps = {
  fleet: Fleet;
  setFleet: (fleet: Fleet) => void;
  coordinates: CoordinateType[];
  isPlayerCoordinate: boolean;
  setCoordinates: React.Dispatch<React.SetStateAction<CoordinateType[]>>;
  axis: Axis;
  ship: ShipNames;
};

const Board = ({
  fleet,
  setFleet,
  coordinates,
  isPlayerCoordinate,
  setCoordinates,
  axis,
  ship,
}: BoardProps) => {
  // const [fleet, setFleet] = useState(generateFleet);
  // const [coordinates, setCoordinates] = useState(generateCoordinates(fleet));
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

    const fleetCoordinateIds = newFleet.map((fleetCoordinate) => fleetCoordinate.id);

    setCoordinates((prevCoordinates) =>
      prevCoordinates.map((coordinate) =>
        coordinate.occupied ? { ...coordinate, occupied: false } : coordinate
      )
    );
    setCoordinates((prevCoordinates) =>
      prevCoordinates.map((coordinate) =>
        fleetCoordinateIds.includes(coordinate.id) ? { ...coordinate, occupied: true } : coordinate
      )
    );
  }

  function handleHover(ship: ShipNames, id: string, axis: Axis, fleet: Fleet) {
    const highlightedCoordinates = generatePotentialShipCoordinates(ship, id, axis, fleet);
    console.log(highlightedCoordinates.valid);
    console.log(highlightedCoordinates.coordinates);
    if (!highlightedCoordinates.valid) {
      setCoordinates((prevCoordinates) =>
        prevCoordinates.map((coordinate) =>
          highlightedCoordinates.coordinates.includes(coordinate.id)
            ? {
                ...coordinate,
                isInvalidPlacement: true,
                hovered: false
              }
            : {
                ...coordinate,
                isInvalidPlacement: false,
                hovered: false
              }
        )
      );
    } else {
      setCoordinates((prevCoordinates) =>
        prevCoordinates.map((coordinate) =>
          highlightedCoordinates.coordinates.includes(coordinate.id)
            ? {
                ...coordinate,
                hovered: true,
                isInvalidPlacement: false
              }
            : {
                ...coordinate,
                hovered: false,
                isInvalidPlacement: false
              }
        )
      );
    }
    console.log(highlightedCoordinates);
  }

  useEffect(() => {
    console.log(coordinates)
  })  

  function generateUIRows() {
    return coordinates.map((coordinate) => (
      <Coordinate
        key={coordinate.id}
        axis={axis}
        {...coordinate}
        fleet={fleet}
        isPlayerCoordinate={isPlayerCoordinate}
        ship={ship}
        onClick={handleClick}
        onMouseEnter={handleHover}
      />
    ));
  }
  function handleClick(id: string) {
    setFleet(
      fleet.map((ship) =>
        ship.id === id
          ? {
              ...ship,
              targeted: true,
            }
          : ship
      )
    );
    setCoordinates(
      coordinates.map((coordinate) =>
        coordinate.id === id
          ? {
              ...coordinate,
              targeted: true,
            }
          : coordinate
      )
    );
  }

  return (
    <>
      <div className="grid grid-cols-11 max-w-[440px]">{generateUIRows()}</div>
      <p
        onClick={() => {
          generateRandomFleet();
        }}
      >
        Place for me
      </p>
    </>
  );
};

export default Board;
