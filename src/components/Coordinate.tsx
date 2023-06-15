import { Axis, CoordinateType, Fleet, ShipNames } from "../types";
import Battleship from "../assets/battleship.svg";
import TargetedIcon from "../assets/TargetedIcon";
import FireIcon from "../assets/FireIcon";
import TargetIcon from "../assets/TargetIcon";

type CoordinateEventHandlers = {
  onClick: (id: string) => void;
  onShipPlacement?: (ship: ShipNames, id: string, axis: Axis, fleet: Fleet) => void;
  onMouseEnter: (id: string) => void;
};

type CoordinateProps = CoordinateType &
  CoordinateEventHandlers & {
    isPlayerCoordinate: boolean;
    fleet: Fleet;
    winner?: string | null;
  };

const Coordinate = ({
  hovered,
  id,
  isInvalidPlacement,
  isPlayerCoordinate,
  targeted,
  occupied,
  isLabel,
  winner,
  onClick,
  onMouseEnter,
}: CoordinateProps) => {
  function generateCoordinateStyles() {
    if (isLabel) return "bg-blue-500";
    if (isInvalidPlacement) return "bg-red-500 cursor-not-allowed";
    if (hovered && isPlayerCoordinate) return "bg-green-500";
    if (occupied && isPlayerCoordinate) return "bg-gray-600";
  }

  return (
    <div
      className={`${!isPlayerCoordinate && !isLabel && "cursor-pointer"} ${generateCoordinateStyles()} flex justify-center items-center border min-[375px]:h-8 min-[375px]:w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12`}
      onClick={() => {
        if (isLabel || targeted || winner) return;
          onClick(id);
      }}
      onMouseEnter={() => {
        if (isLabel) return;
          onMouseEnter(id);
      }}
    >
      {hovered && !isPlayerCoordinate && <TargetIcon className="absolute h-6 w-6 fill-red-600"/>}
      {targeted && !occupied && <TargetedIcon className="h-4 w-4 fill-neutral-100" />}
      {targeted && occupied && <FireIcon className="h-6 w-6 fill-red-500" />}
      <span>{isLabel && id}</span>
    </div>
  );
};

export default Coordinate;
