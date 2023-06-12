import { Axis, CoordinateType, Fleet, ShipNames } from "../types";
import TargetedIcon from "../assets/TargetedIcon";
import FireIcon from "../assets/FireIcon";

type CoordinateEventHandlers = { 
    onClick: (id: string) => void;
    onMouseEnter: (ship: ShipNames, id: string, axis: Axis, fleet: Fleet) => void;
}

type CoordinateProps = CoordinateType & CoordinateEventHandlers & { ship: ShipNames, axis: Axis, fleet: Fleet };  

const Coordinate = ({ axis, fleet, id, targeted, occupied, isLabel, ship, onClick, onMouseEnter }: CoordinateProps) => {
    return (
        <div 
            className={`${isLabel ? 'bg-red-300' : ''} ${occupied ? 'bg-gray-600' : ''} flex justify-center items-center border h-10 w-10 cursor-pointer`}
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