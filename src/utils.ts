import { X_COORDINATES, X_COORDINATES_MAP, Y_COORDINATES } from "./constants/coordinates";
import { SHIP_LENGTH_MAP, SHIP_NAMES } from "./constants/ships";
import {
  Axis,
  CoordinateType,
  Fleet,
  PotentialCoordinates,
  ShipNames,
  X_COORDINATES_ENUM,
} from "./types";

export function generateCoordinates(fleetPosition?: Fleet) {
  const coordinateIds = [];
  for (let i = 0; i < Y_COORDINATES.length; i++) {
    for (let j = 0; j < X_COORDINATES.length; j++) {
      const coordinate: CoordinateType = {
        targeted: false,
        occupied: false,
        isLabel: false,
        id: "",
        hovered: false,
        isInvalidPlacement: false,
      };

      if (i === 0) {
        coordinate.id = `${X_COORDINATES[j]}`;
        coordinate.isLabel = true;
      } else if (j === 0) {
        coordinate.id = `${Y_COORDINATES[i]}`;
        coordinate.isLabel = true;
      } else {
        const coordinateId = `${X_COORDINATES[j]}${Y_COORDINATES[i]}`;
        coordinate.id = coordinateId;
        coordinate.occupied = fleetPosition
          ? fleetPosition.map((coordinate) => coordinate.id).includes(coordinateId)
            ? true
            : false
          : false;
      }

      coordinateIds.push(coordinate);
    }
  }

  return coordinateIds;
}

export function generateShip(ship: ShipNames, id: string, axis: Axis, fleet: Fleet) {
  const potentialCoordinates = generatePotentialShipCoordinates(ship, id, axis, fleet);
  const shipIntersectsFleet =
    new Set([
      ...potentialCoordinates.coordinates,
      ...fleet.map((fleetCoordinate) => fleetCoordinate.id),
    ]).size < 17
      ? true
      : false;
  const shipOverflowsBoard = SHIP_LENGTH_MAP[ship] !== potentialCoordinates.coordinates.length;
  if (!shipOverflowsBoard && !shipIntersectsFleet) {
    return {
      name: ship,
      position: [...potentialCoordinates.coordinates],
      destroyed: false,
    };
  }
  return;
}

export function generatePotentialShipCoordinates(
  ship: ShipNames,
  id: string,
  axis: Axis,
  fleet: Fleet
) {
  const shipLength = SHIP_LENGTH_MAP[ship];
  const potentialCoordinates: PotentialCoordinates = {
    valid: false,
    coordinates: [],
  };
  const xCoordinate = id[0];
  const yCoordinate = Number(id.slice(1));

  if (axis === "Y") {
    for (let i = yCoordinate; i < yCoordinate + shipLength; i++) {
      const coordinate = `${xCoordinate}${i}`;
      //    const shipIntersectsFleet = fleet.map(fleetCoordinate => fleetCoordinate.id).includes(coordinate);
      if (Y_COORDINATES[i] < 11) potentialCoordinates.coordinates.push(coordinate);
    }
  } else if (axis === "X") {
    const indexOfXCoordinate = X_COORDINATES.indexOf(xCoordinate);
    for (let i = indexOfXCoordinate; i < indexOfXCoordinate + shipLength; i++) {
      const coordinate = `${X_COORDINATES[i]}${yCoordinate}`;
      // const shipIntersectsFleet = fleet.map(fleetCoordinate => fleetCoordinate.id).includes(coordinate);
      if (i < 11) potentialCoordinates.coordinates.push(coordinate);
    }
  }

  potentialCoordinates.valid = fleet
    .map((fleetCoordinate) =>
      potentialCoordinates.coordinates.includes(fleetCoordinate.id) ? true : false
    )
    .includes(true) || potentialCoordinates.coordinates.length !== shipLength ? false : true;

  return potentialCoordinates;
}

function generateRandomIndex() {
  return Math.floor(Math.random() * 10);
}

function generateRandomAxis() {
  return Math.floor(Math.random() * 2) === 0 ? "X" : "Y";
}

function generateRandomCoordinateId() {
  const validXCoordinates = X_COORDINATES.slice(1);
  const validYCoordinates = Y_COORDINATES.slice(1);
  const randomXIndex = generateRandomIndex();
  const randomYIndex = generateRandomIndex();

  return `${validXCoordinates[randomXIndex]}${validYCoordinates[randomYIndex]}`;
}

export function generateFleet() {
  let currentIndex = 0;
  let fleetPosition: Fleet = [];

  while (fleetPosition.length < 17) {
    const currentShip = SHIP_NAMES[currentIndex];
    const randomId = generateRandomCoordinateId();
    const randomAxis = generateRandomAxis();
    const potentialCoordinates = generatePotentialShipCoordinates(
      currentShip,
      randomId,
      randomAxis,
      fleetPosition
    );

    const currFleetPosition = fleetPosition.map((fleetCoordinate) => fleetCoordinate.id);
    const shipIntersectsFleet = potentialCoordinates.coordinates
      .map((coordinate) => currFleetPosition.includes(coordinate))
      .includes(true);

    if (
      potentialCoordinates.coordinates.length === SHIP_LENGTH_MAP[currentShip] &&
      !shipIntersectsFleet
    ) {
      const coordinates = [...potentialCoordinates.coordinates].map((coordinateId) => ({
        id: coordinateId,
        ship: currentShip,
        targeted: false,
      }));

      fleetPosition = [...fleetPosition, ...coordinates];
      currentIndex++;
    }
  }

  return fleetPosition;
}
