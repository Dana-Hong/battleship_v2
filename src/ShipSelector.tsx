const ShipSelector = () => {
    /**
     * I need to be passed props in order to ship. 
     */
    return (
        <div className="flex flex-col">
            Ship selector
            <button>Carrier</button>
            <button>Battleship</button>
            <button>Destroyer</button>
            <button>Submarine</button>
            <button>Patrol Boat</button>
        </div>
    )
}

export default ShipSelector;