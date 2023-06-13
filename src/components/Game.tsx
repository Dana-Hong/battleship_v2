import { useState } from "react";
import { generateCoordinates, generateFleet, generateShip } from "../utils";
import AxisSelector from "./AxisSelector";
import Board from "./Board";
import { Axis, CoordinateType, Fleet, ShipNames } from "../types";
import ShipSelector from "./ShipSelector";
import BoardSetup from "./BoardSetup";

const Game = () => {
  const [computerFleet, setComputerFleet] = useState(generateFleet);
  const [computerCoordinates, setComputerCoordinates] = useState(
    generateCoordinates(computerFleet)
  );
  const [playerFleet, setPlayerFleet] = useState<Fleet>([]);
  const [playerCoordinates, setPlayerCoordinates] = useState<CoordinateType[]>(
    generateCoordinates()
  );
  const [ship, setShip] = useState<ShipNames>("carrier");
  const [axis, setAxis] = useState<Axis>("X");

  /**
   * Dangerous - will result in infinite calls because it will keep checking for a winner.
   * @param playerName 
   * @param playerFleet 
   * @param opponentName 
   * @param opponentFleet 
   * @returns 
   */
  function calculateWinner(
    playerName: string,
    playerFleet: Fleet,
    opponentName?: string,
    opponentFleet?: Fleet
  ) {
    const winner = playerFleet.every((fleetPosition) => fleetPosition.targeted) ? `${playerName} wins!`: null;
    return winner
      ? winner
      : calculateWinner("Computer", opponentFleet as Fleet);
  }

  // const winner = calculateWinner();
  const handleShipSelect = (ship: ShipNames) => {
    setShip(ship);
  };

  const handleShipPlacement = (
    ship: ShipNames,
    id: string,
    axis: Axis,
    fleet: Fleet
  ) => {
    const shipObject = generateShip(ship, id, axis, fleet);
    const shipAlreadyPlaced = fleet.map(coordinate => coordinate.ship).includes(ship);
    if (shipObject && !shipAlreadyPlaced) {
        const fleetCoordinates: Fleet = [...fleet, ...shipObject.position.map(coordinate => ({ id: coordinate, ship: shipObject.name, targeted: false }))];
        setPlayerFleet(fleetCoordinates);
        setPlayerCoordinates(generateCoordinates(fleetCoordinates))
      return;
    }
    return console.log("Cannot place ship here.");
  };

  const handleAxisSelect = (axis: Axis) => {
    setAxis(axis);
  };

  return (
    <div>
        <BoardSetup 
            fleet={playerFleet}
            coordinates={playerCoordinates}
            isPlayerCoordinate={true}
            axis={axis}
            ship={ship}
            setCoordinates={setPlayerCoordinates}
            setFleet={setPlayerFleet}
            handleShipPlacement={handleShipPlacement}
        />
      {/* <Board
        fleet={playerFleet}
        setFleet={setPlayerFleet}
        coordinates={playerCoordinates}
        setCoordinates={setPlayerCoordinates}
        isPlayerCoordinate={true}
        handleShipPlacement={handleShipPlacement}
        axis={axis}
        ship={ship}
      /> */}
      {/* <Board 
                fleet={computerFleet} 
                setFleet={setComputerFleet}
                coordinates={computerCoordinates}  
                isPlayerCoordinate={true}
                setCoordinates={setComputerCoordinates}
                axis={axis}
                ship={ship}
            /> */}
      <AxisSelector currentAxis={axis} onAxisSelect={handleAxisSelect} />
      <ShipSelector currentShip={ship} onShipSelect={handleShipSelect} />
      {/* <Board fleet={[]} coordinates={playerCoordinates} /> */}
    </div>
  );
};

export default Game;
