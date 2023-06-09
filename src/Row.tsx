import Coordinate from "./Coordinate";

const Row = ({ row }: { row: string[] }) => {
    return (
        <div className="flex">
            {row.map(coordinate => (
                <Coordinate id={coordinate} />
            ))}
        </div>
    )
}

export default Row;