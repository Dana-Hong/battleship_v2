import React, { ReactNode } from 'react';
import { Axis, ButtonHandler, ShipNames } from "../types";

type ButtonProps = {
    children: ReactNode;
    className?: string;
    axis?: Axis;
    currentAxis?: Axis;
    currentShip?: ShipNames;
    ship?: ShipNames;
    onAxisSelect?: (axis: Axis) => void;
    onShipSelect?: (ship: ShipNames) => void;
}

const Button: React.FC<ButtonProps> = ({ children, className, currentAxis, currentShip, axis, ship, onAxisSelect, onShipSelect }: ButtonProps) => {
    const buttonStyles = () => {
        if (ship && ship === currentShip || axis && axis === currentAxis) {
            return 'bg-sky-600'
        }
    }
    return (
        <button 
            className={`inline-block border ${buttonStyles()} py-2 px-4 ${className}`}
            onClick={() => {
                if (axis && onAxisSelect) {
                    onAxisSelect(axis as Axis);
                } else if (ship && onShipSelect) {
                    onShipSelect(ship as ShipNames);
                }
            }}
        >
            {children}
        </button>
    )
}

export default Button;