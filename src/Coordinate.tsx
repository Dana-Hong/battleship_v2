const Coordinate = ({ id }: { id: string }) => {
    const label = id.length === 1 || id === '10';

    return (
        <div className={`${label ? 'bg-red-300' : ''} flex justify-center items-center border h-10 w-10`}>
           <span>{label && id}</span> 
        </div>
    )
}

export default Coordinate;