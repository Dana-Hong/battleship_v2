import Coordinate from "./Coordinate";
import { CoordinateType, Fleet } from "../types";

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
    const targetedCoordinate = coordinates.filter(coordinate => coordinate.id)[0];
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

  const generateUIRows = () => {
    return coordinates.map((coordinate) => (
      <Coordinate
        key={coordinate.id}
        {...coordinate}
        fleet={fleet}
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
