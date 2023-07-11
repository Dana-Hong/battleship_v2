import { Axis, CoordinateType, Fleet, ShipBowCoord, ShipNames } from "../types";

import Battleship from "../assets/Battleship";
import Carrier from "../assets/Carrier";
import Destroyer from "../assets/Destroyer";
import PatrolBoat from "../assets/PatrolBoat";
import Submarine from "../assets/Submarine";
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
    carrierBowCoord: ShipBowCoord;
    battleshipBowCoord: ShipBowCoord;
    destroyerBowCoord: ShipBowCoord;
    submarineBowCoord: ShipBowCoord;
    patrolBoatBowCoord: ShipBowCoord;
    destroyedShips: ShipNames[] | null;
    isPlayerCoordinate: boolean;
    winner?: string | null;
  };

const Coordinate = ({
  hovered,
  id,
  carrierBowCoord,
  battleshipBowCoord,
  destroyerBowCoord,
  submarineBowCoord,
  patrolBoatBowCoord,
  destroyedShips,
  isPlayerCoordinate,
  targeted,
  occupied,
  isLabel,
  winner,
  onClick,
  onMouseEnter,
}: CoordinateProps) => {
  function generateCoordinateStyles() {
    if (isLabel) return "bg-neutral-800";
    if (hovered && isPlayerCoordinate) return "bg-green-500";
    return "";
  }

  const carrierDestroyed = id === carrierBowCoord.id && destroyedShips?.includes("carrier");
  const battleshipDestroyed =
    id === battleshipBowCoord.id && destroyedShips?.includes("battleship");
  const destroyerDestroyed = id === destroyerBowCoord.id && destroyedShips?.includes("destroyer");
  const submarineDestroyed = id === submarineBowCoord.id && destroyedShips?.includes("submarine");
  const patrolBoatDestroyed =
    id === patrolBoatBowCoord.id && destroyedShips?.includes("patrolboat");

  const displayShipSVG = (ship: ShipNames) => {
    switch (ship) {
      case "carrier":
        if (
          (isPlayerCoordinate && id === carrierBowCoord.id) ||
          (!isPlayerCoordinate && carrierDestroyed)
        ) {
          return <Carrier axis={carrierBowCoord.axis as Axis} />;
        }
        return null;

      case "battleship":
        if (
          (isPlayerCoordinate && id === battleshipBowCoord.id) ||
          (!isPlayerCoordinate && battleshipDestroyed)
        ) {
          return <Battleship axis={battleshipBowCoord.axis as Axis} />;
        }
        return null;
      case "destroyer":
        if (
          (isPlayerCoordinate && id === destroyerBowCoord.id) ||
          (!isPlayerCoordinate && destroyerDestroyed)
        ) {
          return <Destroyer axis={destroyerBowCoord.axis as Axis} />;
        }
        return null;
      case "submarine":
        if (
          (isPlayerCoordinate && id === submarineBowCoord.id) ||
          (!isPlayerCoordinate && submarineDestroyed)
        ) {
          return <Submarine axis={submarineBowCoord.axis as Axis} />;
        }
        return null;
      case "patrolboat":
        if (
          (isPlayerCoordinate && id === patrolBoatBowCoord.id) ||
          (!isPlayerCoordinate && patrolBoatDestroyed)
        ) {
          return <PatrolBoat axis={patrolBoatBowCoord.axis as Axis} />;
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div
      className={`${
        !isPlayerCoordinate && !isLabel ? "cursor-pointer" : ""
      } ${generateCoordinateStyles()} relative flex justify-center items-center border border-neutral-400 min-[375px]:h-8 min-[375px]:w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12`}
      onClick={() => {
        if (isLabel || targeted || winner) return;
        onClick(id);
      }}
      onMouseEnter={() => {
        if (isLabel) return;
        onMouseEnter(id);
      }}
    >
      {displayShipSVG("carrier")}
      {displayShipSVG("battleship")}
      {displayShipSVG("destroyer")}
      {displayShipSVG("submarine")}
      {displayShipSVG("patrolboat")}
      {hovered && !isPlayerCoordinate && <TargetIcon className="absolute h-6 w-6 fill-red-600" />}
      {targeted && !occupied && <TargetedIcon className="h-4 w-4 fill-neutral-100" />}
      {targeted && occupied && <FireIcon className="absolute h-6 w-6 fill-red-500" />}
      <span>{isLabel && id}</span>
    </div>
  );
};

export default Coordinate;
