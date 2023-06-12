import { useState } from "react";
import { generateCoordinates, generateFleet } from "../utils";
import Board from "./Board";
import { Axis, Fleet, ShipNames } from "../types";

const Game = () => {
    const [computerFleet, setComputerFleet] = useState(generateFleet);
    const [computerCoordinates, setComputerCoordinates] = useState(generateCoordinates(computerFleet));

    const [playerCoordinates, setPlayerCoordinates] = useState(generateCoordinates());
    const [ship, setShip] = useState<ShipNames>('carrier');
    const [axis, setAxis] = useState<Axis>('X');
    
    function calculateWinner(playerName: string, playerFleet: Fleet, opponentName?: string, opponentFleet?: Fleet) {
        const winner = playerFleet.every(fleetPosition => fleetPosition.targeted);
        return winner ? winner : calculateWinner('Computer', opponentFleet as Fleet); 
    }

    // const winner = calculateWinner();
    
    return (
        <div>
            <Board 
                fleet={computerFleet} 
                setFleet={setComputerFleet}
                coordinates={computerCoordinates}  
                isPlayerCoordinate={true}
                setCoordinates={setComputerCoordinates}
                axis={axis}
                ship={ship}
            />
            {/* <Board fleet={[]} coordinates={playerCoordinates} /> */}
        </div>
    )
}

export default Game;