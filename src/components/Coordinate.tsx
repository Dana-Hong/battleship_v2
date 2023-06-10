import { CoordinateType } from "../types";

type CoordinateProps = CoordinateType & { onClick: (id: string) => void }

const Coordinate = ({ id, targeted, occupied, isLabel, onClick}: CoordinateProps) => {

    return (
        <div 
            className={`${isLabel ? 'bg-red-300' : ''} ${targeted ? 'bg:red-500' : ''} flex justify-center items-center border h-10 w-10`}
            onClick={() => {
                if (isLabel) return;
                onClick(id);
            }}
        >
           <span>{isLabel && id}</span> 
        </div>
    )
}

export default Coordinate;