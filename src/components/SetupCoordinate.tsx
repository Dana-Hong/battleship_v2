import { Axis, CoordinateType, Fleet, ShipNames } from "../types";

type SetupCoordinateEventHandlers = {
  onClick: (ship: ShipNames, id: string, axis: Axis, fleet: Fleet) => void;
  onMouseEnter: (ship: ShipNames, id: string, axis: Axis, fleet: Fleet) => void;
};

type SetupCoordinateProps = CoordinateType &
  SetupCoordinateEventHandlers & {
    currentAxis: Axis;
    currentShip: ShipNames;
    fleet: Fleet;
  };

const SetupCoordinate = ({
  currentAxis,
  currentShip,
  fleet,
  hovered,
  id,
  isInvalidPlacement,
  isLabel,
  occupied,
  onClick,
  onMouseEnter,
}: SetupCoordinateProps) => {
  const generateSetupCoordinateStyles = () => {
    if (isLabel) return "bg-neutral-700";
    if (isInvalidPlacement) return "bg-red-700 opacity-70 cursor-not-allowed";
    if (hovered) return "bg-neutral-600";
    if (occupied) return "bg-neutral-600";
  };

  return (
    <div
      className={`cursor-pointer ${generateSetupCoordinateStyles()} flex justify-center items-center border border-neutral-300 min-[375px]:h-8 min-[375px]:w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12`}
      onClick={() => {
        if (isLabel) return;
        onClick(currentShip, id, currentAxis, fleet);
      }}
      onMouseEnter={() => {
        if (isLabel) return;
        onMouseEnter(currentShip, id, currentAxis, fleet);
      }}
    >
      <span>{isLabel && id}</span>
    </div>
  );
};

export default SetupCoordinate;
