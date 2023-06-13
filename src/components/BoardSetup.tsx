import { Axis, CoordinateType, Fleet, ShipNames } from "../types";
import Board from "./Board";

type BoardSetupProps = {
  fleet: Fleet;
  setFleet: (fleet: Fleet) => void;
  coordinates: CoordinateType[];
  isPlayerCoordinate: boolean;
  handleShipPlacement?: (
    ship: ShipNames,
    id: string,
    axis: Axis,
    fleet: Fleet
  ) => void;
  setCoordinates: React.Dispatch<React.SetStateAction<CoordinateType[]>>;
  axis?: Axis;
  ship?: ShipNames;
};
const BoardSetup = ({
  axis,
  ship,
  fleet,
  coordinates,
  isPlayerCoordinate,
  handleShipPlacement,
  setCoordinates,
  setFleet,
}: BoardSetupProps) => {
  return (
    <div>
      <Board
        fleet={fleet}
        setFleet={setFleet}
        coordinates={coordinates}
        isPlayerCoordinate={isPlayerCoordinate}
        setCoordinates={setCoordinates}
        handleShipPlacement={handleShipPlacement}
        axis={axis}
        ship={ship}
      />
      {fleet.length === 17 && <p className="bg-emerald-600">Start Game</p>}
    </div>
  );
};

export default BoardSetup;
