import React, { ReactNode } from 'react';
import { Axis, ButtonHandler, ShipNames } from "../types";

type ButtonProps = {
    children: ReactNode;
    className?: string;
    axis?: Axis;
    ship?: ShipNames;
    onAxisSelect?: (axis: Axis) => void;
    onShipSelect?: (ship: ShipNames) => void;
}

const Button: React.FC<ButtonProps> = ({ children, className, axis, ship, onAxisSelect, onShipSelect }: ButtonProps) => {
    return (
        <button 
            className={`inline-block border py-2 px-4 ${className}`}
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