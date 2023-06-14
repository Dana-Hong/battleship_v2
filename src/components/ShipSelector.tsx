import { Axis, ButtonHandler, ShipNames } from "../types";
import Button from "./Button";

type ShipSelectorProps = {
    currentShip: ShipNames;
    onShipSelect: (ship: ShipNames) => void;
}

const ShipSelector = ({ currentShip, onShipSelect }: ShipSelectorProps) => {
    const shipSelectButtonStyles = (ship: ShipNames) => {
        if (currentShip === ship) return 'bg-sky-600';
    }
    /**
     * I need to be passed props in order to select a ship to place. 
     */
    return (
        <div className="flex">
           <p>Select Ship</p> 
            <Button
                className={shipSelectButtonStyles('carrier')}
            >
                <button
                    onClick={() => {
                        onShipSelect('carrier');
                    }} 
                >
                    Carrier
                </button>
            </Button>
            <Button
                className={shipSelectButtonStyles('battleship')}
            >
                <button
                    onClick={() => {
                        onShipSelect('battleship');
                    }} 
                >
                    Battleship
                </button>
            </Button>
            <Button
                className={shipSelectButtonStyles('destroyer')}
            >
                <button
                    onClick={() => {
                        onShipSelect('destroyer');
                    }} 
                >
                    Destroyer
                </button>
            </Button>
            <Button
                className={shipSelectButtonStyles('submarine')}
            >
                <button
                    onClick={() => {
                        onShipSelect('submarine');
                    }} 
                >
                    Submarine
                </button>
            </Button>
            <Button
                className={shipSelectButtonStyles('patrolboat')}
            >
                <button
                    onClick={() => {
                        onShipSelect('patrolboat');
                    }} 
                >
                    Patrol Boat
                </button>
            </Button>
        </div>
    )
}

export default ShipSelector;