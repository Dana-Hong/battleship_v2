import { Axis, ButtonHandler, ShipNames } from "../types";
import Button from "./Button";

type ShipSelectorProps = {
    currentShip: ShipNames;
    onShipSelect: (ship: ShipNames) => void;
}

const ShipSelector = ({ currentShip, onShipSelect }: ShipSelectorProps) => {
    /**
     * I need to be passed props in order to select a ship to place. 
     */
    return (
        <div className="flex">
           <p>Select Ship</p> 
            <Button
                ship={'carrier'}
                currentShip={currentShip}
                onShipSelect={onShipSelect}
            >
                Carrier
            </Button>
            <Button
                ship={'battleship'}
                currentShip={currentShip}
                onShipSelect={onShipSelect}
            >
                Battleship
            </Button>
            <Button
                ship={'destroyer'}
                currentShip={currentShip}
                onShipSelect={onShipSelect}
            >
                Destroyer
            </Button>
            <Button
                ship={'submarine'}
                currentShip={currentShip}
                onShipSelect={onShipSelect}
            >
                Submarine
            </Button>
            <Button
                ship={'patrolboat'}
                currentShip={currentShip}
                onShipSelect={onShipSelect}
            >
                Patrol Boat
            </Button>
        </div>
    )
}

export default ShipSelector;