import Battleship from "../assets/Battleship";
import Carrier from "../assets/Carrier";
import Destroyer from "../assets/Destroyer";
import PatrolBoat from "../assets/PatrolBoat";
import Submarine from "../assets/Submarine";
import { Axis, CoordinateType, Fleet, ShipBowCoord, ShipNames } from "../types";

type SetupCoordinateEventHandlers = {
  onClick: (ship: ShipNames, id: string, axis: Axis, fleet: Fleet) => void;
  onMouseEnter: (ship: ShipNames, id: string, axis: Axis, fleet: Fleet) => void;
};

type SetupCoordinateProps = CoordinateType &
  SetupCoordinateEventHandlers & {
    carrierBowCoord: ShipBowCoord;
    battleshipBowCoord: ShipBowCoord;
    destroyerBowCoord: ShipBowCoord;
    submarineBowCoord: ShipBowCoord;
    patrolBoatBowCoord: ShipBowCoord;
    currentAxis: Axis;
    currentShip: ShipNames;
    fleet: Fleet;
  };

const SetupCoordinate = ({
  carrierBowCoord,
  battleshipBowCoord,
  destroyerBowCoord,
  submarineBowCoord,
  patrolBoatBowCoord,
  currentAxis,
  currentShip,
  fleet,
  hovered,
  id,
  isInvalidPlacement,
  isLabel,
  onClick,
  onMouseEnter,
}: SetupCoordinateProps) => {
  const generateSetupCoordinateStyles = () => {
    if (isLabel) return "bg-neutral-800";
    if (isInvalidPlacement) return "bg-red-700 opacity-70 cursor-not-allowed";
    if (hovered) return "bg-green-600 opacity-50";
  };

  return (
    <div
      className={`cursor-pointer ${generateSetupCoordinateStyles()} relative flex justify-center items-center border border-neutral-400 min-[375px]:h-8 min-[375px]:w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12`}
      onClick={() => {
        if (isLabel) return;
        onClick(currentShip, id, currentAxis, fleet);
      }}
      onMouseEnter={() => {
        if (isLabel) return;
        onMouseEnter(currentShip, id, currentAxis, fleet);
      }}
    >
      {id === carrierBowCoord.id && (
        <Carrier axis={carrierBowCoord.axis as Axis} />
      )}
      {id === battleshipBowCoord.id && (
        <Battleship axis={battleshipBowCoord.axis as Axis} />
      )}
      {id === destroyerBowCoord.id && (
        <Destroyer axis={destroyerBowCoord.axis as Axis} />
      )}
      {id === submarineBowCoord.id && (
        <Submarine axis={submarineBowCoord.axis as Axis} />
      )}
      {id === patrolBoatBowCoord.id && (
        <PatrolBoat axis={patrolBoatBowCoord.axis as Axis} />
      )}
      <span>{isLabel && id}</span>
    </div>
  );
};

export default SetupCoordinate;
