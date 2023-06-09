import { CoordinateType } from "../types";

type CoordinateProps = CoordinateType & { handleClick: (id: string) => void }

const Coordinate = ({ x, y, id, targeted, occupied, handleClick }: CoordinateProps) => {
    const label = id.length === 1 || id === '10';

    return (
        <div 
            className={`${label ? 'bg-red-300' : ''} flex justify-center items-center border h-10 w-10`}
            onClick={(e) => {
                if (label) return;
                handleClick(id);
            }}
        >
           <span>{label && id}</span> 
        </div>
    )
}

export default Coordinate;