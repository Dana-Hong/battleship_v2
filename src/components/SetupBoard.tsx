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
    const highlightedCoordinates = generatePotentialShipCoordinates(ship, id, axis, fleet);
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

  function generateUIRows() {
    return coordinates.map((coordinate) => (
      <SetupCoordinate
        key={coordinate.id}
        currentAxis={currentAxis}
        currentShip={currentShip}
        {...coordinate}
        fleet={fleet}
        onClick={onClick}
        onMouseEnter={handleHover}
      />
    ));
  }

  return <div className="grid grid-cols-11 min-[375px]:max-w-[352px] sm:max-w-[440px] lg:max-w-[528px]">{generateUIRows()}</div>;
};

export default SetupBoard;
