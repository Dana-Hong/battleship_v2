import { Axis, ButtonHandler, ShipNames } from "../types";
import Button from "./Button";

type ShipSelectorProps = {
    onShipSelect: (ship: ShipNames) => void;
}

const ShipSelector = ({ onShipSelect }: ShipSelectorProps) => {
    /**
     * I need to be passed props in order to select a ship to place. 
     */
    return (
        <div className="flex flex-col">
            Ship selector
            <Button
                ship={'carrier'}
                onShipSelect={onShipSelect}
            >
                Carrier
            </Button>
            <Button
                ship={'battleship'}
                onShipSelect={onShipSelect}
            >
                Battleship
            </Button>
            <Button
                ship={'destroyer'}
                onShipSelect={onShipSelect}
            >
                Destroyer
            </Button>
            <Button
                ship={'submarine'}
                onShipSelect={onShipSelect}
            >
                Submarine
            </Button>
            <Button
                ship={'patrolboat'}
                onShipSelect={onShipSelect}
            >
                Patrol Boat
            </Button>
        </div>
    )
}

export default ShipSelector;