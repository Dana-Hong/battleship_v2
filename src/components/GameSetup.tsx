import { useState } from "react";

// Components
import AxisSelector from "./AxisSelector";
import Button from "./Button";
import SetupBoard from "./SetupBoard";
import ShipSelector from "./ShipSelector";

// utils
import { generateCoordinates, generateFleet, generateShip } from "../utils";

// types
import { Axis, CoordinateType, Fleet, ShipNames } from "../types";

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

  const resetBoard = () => {
    setPlayerFleet([]);
    setPlayerCoordinates((pc) => pc.map((coordinate) => ({ ...coordinate, occupied: null }))); // occupied: false })));
  };

  const generateRandomFleet = () => {
    const newFleet = generateFleet();
    setPlayerFleet(newFleet);

    const fleetCoordinateIds = newFleet.map((fleetCoordinate) => fleetCoordinate.id);

    setPlayerCoordinates((prevCoordinates) =>
      prevCoordinates.map(
        (coordinate) => (coordinate.occupied ? { ...coordinate, occupied: null } : coordinate) // occupied: false } : coordinate
      )
    );

    setPlayerCoordinates((prevCoordinates) => {
      return prevCoordinates.map((coordinate) => {
        const coordinateId = coordinate.id;
        const ship = newFleet.find((fleetCoordinate) => fleetCoordinate.id === coordinateId)?.ship ?? null;
        return fleetCoordinateIds.includes(coordinateId)
          ? { ...coordinate, occupied: ship }
          : coordinate;
      });
    });
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
    <div className="w-full max-w-7xl flex flex-col xl:flex-row items-center justify-evenly gap-8">
      <SetupBoard
        currentAxis={currentAxis}
        currentShip={currentShip}
        coordinates={coordinates}
        fleet={fleet}
        onClick={handleShipPlacement}
        setCoordinates={setPlayerCoordinates}
        setFleet={setPlayerFleet}
      />
      <div className="flex flex-col gap-4 w-full min-[375px]:max-w-[352px] sm:max-w-[440px] lg:max-w-[528px]">
        <div className="flex gap-6">
          <div className="flex flex-col gap-3 grow justify-between">
            <AxisSelector currentAxis={currentAxis} onClick={handleAxisSelect} />
            <div className="flex flex-col gap-3">
              <Button>
                <button className="w-full h-full" onClick={() => generateRandomFleet()}>
                  Random Placement
                </button>
              </Button>
              <Button>
                <button className="w-full h-full" onClick={() => resetBoard()}>
                  Reset Board
                </button>
              </Button>
            </div>
          </div>
          <ShipSelector currentShip={currentShip} onClick={handleShipSelect} />
        </div>
        <Button className="max-w-xs mx-auto">
          <button
            className={`${fleet.length === 17 ? "text-neutral-200" : "text-neutral-800"}`}
            onClick={() => {
              if (fleet.length !== 17) return;
              setPlayerCoordinates((prevCoordinates) =>
                prevCoordinates.map((coordinate) => ({ ...coordinate, hovered: false }))
              );
              setGameStart(true);
            }}
          >
            Start Game
          </button>
        </Button>
      </div>
    </div>
  );
};

export default GameSetup;
