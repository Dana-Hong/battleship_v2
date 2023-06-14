import { ShipNames } from "../types";
import Button from "./Button";

type ShipSelectorProps = {
  currentShip: ShipNames;
  onClick: (ship: ShipNames) => void;
};

const ShipSelector = ({ currentShip, onClick }: ShipSelectorProps) => {
  const shipSelectButtonStyles = (ship: ShipNames) => {
    if (currentShip === ship) return "bg-sky-600";
  };

  return (
    <div className="w-full">
      <p className="py-4 text-lg font-semibold text-center">Select Ship</p>
      <div className="flex flex-col gap-3">
        <Button className={shipSelectButtonStyles("carrier")}>
          <button
            className="w-full mx-auto"
            onClick={() => {
              onClick("carrier");
            }}
          >
            Carrier
          </button>
        </Button>
        <Button className={shipSelectButtonStyles("battleship")}>
          <button
            className="w-full mx-auto"
            onClick={() => {
              onClick("battleship");
            }}
          >
            Battleship
          </button>
        </Button>
        <Button className={shipSelectButtonStyles("destroyer")}>
          <button
            className="w-full mx-auto"
            onClick={() => {
              onClick("destroyer");
            }}
          >
            Destroyer
          </button>
        </Button>
        <Button className={shipSelectButtonStyles("submarine")}>
          <button
            className="w-full mx-auto"
            onClick={() => {
              onClick("submarine");
            }}
          >
            Submarine
          </button>
        </Button>
        <Button className={shipSelectButtonStyles("patrolboat")}>
          <button
            className="w-full mx-auto"
            onClick={() => {
              onClick("patrolboat");
            }}
          >
            Patrol Boat
          </button>
        </Button>
      </div>
    </div>
  );
};

export default ShipSelector;
