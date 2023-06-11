import { CoordinateType } from "../types";
import TargetedIcon from "../assets/TargetedIcon";
import FireIcon from "../assets/FireIcon";

type CoordinateProps = CoordinateType & { onClick: (id: string) => void }

const Coordinate = ({ id, targeted, occupied, isLabel, onClick}: CoordinateProps) => {
    return (
        <div 
            className={`${isLabel ? 'bg-red-300' : ''} ${occupied ? 'bg-gray-600' : ''} flex justify-center items-center border h-10 w-10 cursor-pointer`}
            onClick={() => {
                if (isLabel) return;
                onClick(id);
            }}
        >
            {(targeted && !occupied) && <TargetedIcon className="h-4 w-4 fill-gray-500"/>}
            {(targeted && occupied) && <FireIcon className="h-6 w-6 fill-red-500"/>}
            <span>{isLabel && id}</span> 
        </div>
    )
}

export default Coordinate;