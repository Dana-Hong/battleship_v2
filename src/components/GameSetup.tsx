import { useState } from "react";
import AxisSelector from "./AxisSelector";
import SetupBoard from "./SetupBoard";
import ShipSelector from "./ShipSelector";
import { Axis, CoordinateType, Fleet, ShipNames } from "../types";
import { generateCoordinates, generateFleet, generateShip } from "../utils";

type GameSetup = {
  coordinates: CoordinateType[];
  fleet: Fleet;
  setPlayerCoordinates: React.Dispatch<React.SetStateAction<CoordinateType[]>>;
  setPlayerFleet: (fleet: Fleet) => void;
  setGameStart: (gameStart: boolean) => void;
};
const GameSetup = ({
  fleet,
  coordinates,
  setPlayerCoordinates,
  setPlayerFleet,
  setGameStart,
}: GameSetup) => {
  const [currentAxis, setCurrentAxis] = useState<Axis>("X");
  const [currentShip, setCurrentShip] = useState<ShipNames>("carrier");

  const generateRandomFleet = () => {
    const newFleet = generateFleet();
    setPlayerFleet(newFleet);

    const fleetCoordinateIds = newFleet.map((fleetCoordinate) => fleetCoordinate.id);

    setPlayerCoordinates((prevCoordinates) =>
      prevCoordinates.map((coordinate) =>
        coordinate.occupied ? { ...coordinate, occupied: false } : coordinate
      )
    );
    setPlayerCoordinates((prevCoordinates) =>
      prevCoordinates.map((coordinate) =>
        fleetCoordinateIds.includes(coordinate.id) ? { ...coordinate, occupied: true } : coordinate
      )
    );
  };

  const handleShipPlacement = (ship: ShipNames, id: string, axis: Axis, fleet: Fleet) => {
    const shipObject = generateShip(ship, id, axis, fleet);
    const shipAlreadyPlaced = fleet.map((coordinate) => coordinate.ship).includes(ship);
    if (shipObject && !shipAlreadyPlaced) {
      const fleetCoordinates: Fleet = [
        ...fleet,
        ...shipObject.position.map((coordinate) => ({
          id: coordinate,
          ship: shipObject.name,
          targeted: false,
        })),
      ];
      setPlayerFleet(fleetCoordinates);
      setPlayerCoordinates(generateCoordinates(fleetCoordinates));
      return;
    }
    return console.log("Cannot place ship here.");
  };

  const handleShipSelect = (ship: ShipNames) => {
    setCurrentShip(ship);
  };

  const handleAxisSelect = (axis: Axis) => {
    setCurrentAxis(axis);
  };

  return (
    <div>
      <SetupBoard
        currentAxis={currentAxis}
        currentShip={currentShip}
        coordinates={coordinates}
        fleet={fleet}
        onClick={handleShipPlacement}
        setCoordinates={setPlayerCoordinates}
        setFleet={setPlayerFleet}
      />
      <p onClick={() => generateRandomFleet()}>Random Placement</p>
      <AxisSelector currentAxis={currentAxis} onClick={handleAxisSelect} />
      <ShipSelector currentShip={currentShip} onClick={handleShipSelect} />
      {fleet.length === 17 && (
        <p
          className="bg-emerald-600"
          onClick={() => {
            setPlayerCoordinates((prevCoordinates) =>
              prevCoordinates.map((coordinate) => ({ ...coordinate, hovered: false }))
            );
            setGameStart(true);
          }}
        >
          Start Game
        </p>
      )}
    </div>
  );
};

export default GameSetup;
