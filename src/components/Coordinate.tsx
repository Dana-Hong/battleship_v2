import { Axis, CoordinateType, Fleet, ShipNames } from "../types";
import TargetedIcon from "../assets/TargetedIcon";
import FireIcon from "../assets/FireIcon";

type CoordinateEventHandlers = { 
    onClick: (id: string) => void;
    onMouseEnter: (ship: ShipNames, id: string, axis: Axis, fleet: Fleet) => void;
}

type CoordinateProps = CoordinateType & CoordinateEventHandlers & {
    isPlayerCoordinate: boolean,
    ship: ShipNames,
    axis: Axis,
    fleet: Fleet
};  

const Coordinate = ({ 
    axis,
    fleet,
    hovered,
    id,
    isPlayerCoordinate,
    targeted,
    occupied,
    isLabel,
    ship,
    onClick,
    onMouseEnter }: CoordinateProps) => {
    function generateCoordinateStyles() {
        if (isLabel) return 'bg-red-300';
        if (occupied && isPlayerCoordinate) return 'bg-gray-600';
        if (occupied && hovered) return 'bg-red-500';
        if (hovered) return 'bg-green-500';
    }

    return (
        <div 
            className={`${generateCoordinateStyles()} flex justify-center items-center border h-10 w-10 cursor-pointer`}
            onClick={() => {
                if (isLabel) return;
                onClick(id);
            }}
            onMouseEnter={() => { 
                if (isLabel) return;
                onMouseEnter(ship, id, axis, fleet);
            }}
        >
            {(targeted && !occupied) && <TargetedIcon className="h-4 w-4 fill-gray-500"/>}
            {(targeted && occupied) && <FireIcon className="h-6 w-6 fill-red-500"/>}
            <span>{isLabel && id}</span> 
        </div>
    )
}

export default Coordinate;