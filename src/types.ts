export type Axis = "X" | "Y";

export type ButtonHandler<T> = (arg: T) => void;

type CoordinateId = string;

export type FleetCoordinate = {
  id: CoordinateId;
  ship: ShipNames;
  targeted: boolean;
};

// export type Fleet = {
//     [coordinate: string]: FleetCoordinate | undefined;
// }
export type Fleet = FleetCoordinate[];

export type CoordinateType = {
  id: CoordinateId;
  targeted: boolean;
  // occupied: boolean;
  occupied: ShipNames | null;
  isLabel: boolean;
  isInvalidPlacement: boolean;
  hovered: boolean;
};

export type PotentialCoordinates = {
  valid: boolean;
  coordinates: string[];
};

export type RowType = CoordinateType[];

export type ShipBowCoord = {
  id: string;
  axis: Axis | null;
};

export type ShipNames =
  | "carrier"
  | "battleship"
  | "destroyer"
  | "submarine"
  | "patrolboat";

export type ShipLengths = 5 | 4 | 3 | 2;

export type ShipLengthMap = {
  [ship in ShipNames]: ShipLengths;
};

export type X_COORDINATES_ENUM =
  | "0"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J";

export type X_COORDINATES_MAP_TYPE = {
  [xCoordinate in X_COORDINATES_ENUM]: number;
};
