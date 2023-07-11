import SetupCoordinate from "./SetupCoordinate";
import { Axis, CoordinateType, Fleet, ShipNames } from "../types";
import { generatePotentialShipCoordinates } from "../utils";

type SetupBoardProps = {
  currentAxis: Axis;
  currentShip: ShipNames;
  coordinates: CoordinateType[];
  fleet: Fleet;
  onClick: (ship: ShipNames, id: string, axis: Axis, fleet: Fleet) => void;
  setCoordinates: React.Dispatch<React.SetStateAction<CoordinateType[]>>;
  setFleet: (fleet: Fleet) => void;
};

const SetupBoard = ({
  currentAxis,
  currentShip,
  coordinates,
  fleet,
  onClick,
  setCoordinates,
}: SetupBoardProps) => {
  function handleHover(ship: ShipNames, id: string, axis: Axis, fleet: Fleet) {
    const highlightedCoordinates = generatePotentialShipCoordinates(
      ship,
      id,
      axis,
      fleet
    );
    if (!highlightedCoordinates.valid) {
      setCoordinates((prevCoordinates) =>
        prevCoordinates.map((coordinate) =>
          highlightedCoordinates.coordinates.includes(coordinate.id)
            ? {
                ...coordinate,
                isInvalidPlacement: true,
                hovered: false,
              }
            : {
                ...coordinate,
                isInvalidPlacement: false,
                hovered: false,
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
                isInvalidPlacement: false,
              }
            : {
                ...coordinate,
                hovered: false,
                isInvalidPlacement: false,
              }
        )
      );
    }
  }

  const getShipAxis = (fleet: Fleet, ship: ShipNames): Axis | null => {
    if (!fleet.length) return null;
    const shipPos = fleet.filter((positions) => positions.ship === ship);
    const axis = shipPos[0]?.id[0] === shipPos[1]?.id[0] ? "Y" : "X";

    return axis;
  };

  const getShipBowCoordinate = (fleet: Fleet, ship: ShipNames) => {
    const id = fleet?.filter(fleetCoordinate => fleetCoordinate.ship === ship)[0]?.id ?? "";
    const axis = getShipAxis(fleet, ship);

    return {
      id: id,
      axis: axis,
    }

  }

  function generateUIRows() {
    return coordinates.map((coordinate) => (
      <SetupCoordinate
        key={coordinate.id}
        carrierBowCoord={getShipBowCoordinate(fleet, "carrier")}
        battleshipBowCoord={getShipBowCoordinate(fleet, "battleship")}
        destroyerBowCoord={getShipBowCoordinate(fleet, "destroyer")}
        submarineBowCoord={getShipBowCoordinate(fleet, "submarine")}
        patrolBoatBowCoord={getShipBowCoordinate(fleet, "patrolboat")}
        currentAxis={currentAxis}
        currentShip={currentShip}
        {...coordinate}
        fleet={fleet}
        onClick={onClick}
        onMouseEnter={handleHover}
      />
    ));
  }

  return (
    <div className="grid grid-cols-11 min-[375px]:max-w-[352px] sm:max-w-[440px] lg:max-w-[528px] bg-board bg-cover">
      {generateUIRows()}
    </div>
  );
};

export default SetupBoard;
