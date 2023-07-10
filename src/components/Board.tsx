import Coordinate from "./Coordinate";
import { Axis, CoordinateType, Fleet, ShipNames } from "../types";
import { SHIP_LENGTH_MAP, SHIP_NAMES } from "../constants/ships";

type BoardProps = {
  fleet: Fleet;
  setFleet: (fleet: Fleet) => void;
  coordinates: CoordinateType[];
  playerCoordinates?: CoordinateType[];
  isPlayerCoordinate: boolean;
  untargetedCoordinates?: CoordinateType[];
  setCoordinates: React.Dispatch<React.SetStateAction<CoordinateType[]>>;
  setPlayerCoordinates?: React.Dispatch<React.SetStateAction<CoordinateType[]>>;
  winner?: string | null;
};

const Board = ({
  fleet,
  setFleet,
  coordinates,
  playerCoordinates,
  isPlayerCoordinate,
  untargetedCoordinates,
  winner,
  setCoordinates,
  setPlayerCoordinates,
}: BoardProps) => {

  const handleHover = (id: string) => {
    if (isPlayerCoordinate) return;
    setCoordinates(
      coordinates.map((coordinate) =>
        coordinate.id === id ? { ...coordinate, hovered: true } : { ...coordinate, hovered: false }
      )
    );
  };

  const handleClick = (id: string) => {
    const targetedCoordinate = coordinates.filter(coordinate => coordinate.id === id)[0];
    if (targetedCoordinate.targeted) return 'Already targeted';
    setFleet(
      fleet.map((ship) =>
        ship.id === id
          ? {
              ...ship,
              targeted: true,
            }
          : ship
      )
    );
    setCoordinates(
      coordinates.map((coordinate) =>
        coordinate.id === id
          ? {
              ...coordinate,
              targeted: true,
            }
          : coordinate
      )
    );
    if (!isPlayerCoordinate && playerCoordinates && untargetedCoordinates && setPlayerCoordinates) {
      const randomCoordinateId = untargetedCoordinates[Math.floor(Math.random() * untargetedCoordinates.length)].id;
      setPlayerCoordinates((pc) =>
        pc.map((coordinate) =>
          coordinate.id === randomCoordinateId ? { ...coordinate, targeted: true } : coordinate
        )
      );
    }
  };

  const getShipAxis = (coordinates: CoordinateType[], ship: ShipNames): Axis | null => {
    if (!fleet.length) return null;
    const shipPos = coordinates.filter((coordinate) => coordinate.occupied === ship);
    const axis = shipPos[0]?.id[0] === shipPos[1]?.id[0] ? "Y" : "X";

    return axis;
  };

  const getShipBowCoordinate = (coordinates: CoordinateType[], ship: ShipNames) => {
    if (!coordinates) return { id: "", axis: null}
    const id = coordinates?.filter(coordinates => coordinates.occupied === ship)[0]?.id ?? "";
    const axis = getShipAxis(coordinates, ship);
    
    return {
      id: id,
      axis: axis
    }
  }

  const getDestroyedShips = () => {
    if (isPlayerCoordinate) return null;
    return SHIP_NAMES.filter(shipname => coordinates.filter(coordinate => coordinate.occupied === shipname && coordinate.targeted).length === SHIP_LENGTH_MAP[shipname])

  }

  const generateUIRows = () => {
    return coordinates.map((coordinate) => (
      <Coordinate
        key={coordinate.id}
        carrierBowCoord={getShipBowCoordinate(coordinates, "carrier")}
        battleshipBowCoord={getShipBowCoordinate(coordinates, "battleship")}
        destroyerBowCoord={getShipBowCoordinate(coordinates, "destroyer")}
        submarineBowCoord={getShipBowCoordinate(coordinates, "submarine")}
        patrolBoatBowCoord={getShipBowCoordinate(coordinates, "patrolboat")}
        destroyedShips={getDestroyedShips()}
        {...coordinate}
        fleet={fleet}
        coordinates={coordinates}
        isPlayerCoordinate={isPlayerCoordinate}
        onClick={handleClick}
        onMouseEnter={handleHover}
        winner={winner}
      />
    ));
  };

  return <div className="grid grid-cols-11 min-[375px]:max-w-[352px] sm:max-w-[440px] lg:max-w-[528px]">{generateUIRows()}</div>;
};

export default Board;
