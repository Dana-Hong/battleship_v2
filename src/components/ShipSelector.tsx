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
    <div>
      <p>Select Ship</p>
      <div className="flex">
        <Button className={shipSelectButtonStyles("carrier")}>
          <button
            onClick={() => {
              onClick("carrier");
            }}
          >
            Carrier
          </button>
        </Button>
        <Button className={shipSelectButtonStyles("battleship")}>
          <button
            onClick={() => {
              onClick("battleship");
            }}
          >
            Battleship
          </button>
        </Button>
        <Button className={shipSelectButtonStyles("destroyer")}>
          <button
            onClick={() => {
              onClick("destroyer");
            }}
          >
            Destroyer
          </button>
        </Button>
        <Button className={shipSelectButtonStyles("submarine")}>
          <button
            onClick={() => {
              onClick("submarine");
            }}
          >
            Submarine
          </button>
        </Button>
        <Button className={shipSelectButtonStyles("patrolboat")}>
          <button
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
