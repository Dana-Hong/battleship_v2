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
    if (isLabel) return "bg-blue-500";
    if (isInvalidPlacement) return "bg-red-500 cursor-not-allowed";
    if (hovered) return "bg-green-500";
    if (occupied) return "bg-gray-600";
  };

  return (
    <div
      className={`cursor-pointer ${generateSetupCoordinateStyles()} flex justify-center items-center border h-10 w-10`}
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
