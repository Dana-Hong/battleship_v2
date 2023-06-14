import { useState } from "react";
import { generateCoordinates, generateFleet, generateShip } from "../utils";
import { Axis, CoordinateType, Fleet, ShipNames } from "../types";
import GameSetup from "./GameSetup";

const Game = () => {
  const [computerFleet, setComputerFleet] = useState(generateFleet);
  const [computerCoordinates, setComputerCoordinates] = useState(
    generateCoordinates(computerFleet)
  );
  const [playerFleet, setPlayerFleet] = useState<Fleet>([]);
  const [playerCoordinates, setPlayerCoordinates] = useState<CoordinateType[]>(
    generateCoordinates()
  );

  // /**
  //  * Dangerous - will result in infinite calls because it will keep checking for a winner.
  //  * @param playerName
  //  * @param playerFleet
  //  * @param opponentName
  //  * @param opponentFleet
  //  * @returns
  //  */
  // function calculateWinner(
  //   playerName: string,
  //   playerFleet: Fleet,
  //   opponentName?: string,
  //   opponentFleet?: Fleet
  // ) {
  //   const winner = playerFleet.every((fleetPosition) => fleetPosition.targeted) ? `${playerName} wins!`: null;
  //   return winner
  //     ? winner
  //     : calculateWinner("Computer", opponentFleet as Fleet);
  // }

  // const winner = calculateWinner();

  return (
    <div>
      <GameSetup
        coordinates={playerCoordinates}
        fleet={playerFleet}
        setPlayerCoordinates={setPlayerCoordinates}
        setPlayerFleet={setPlayerFleet}
      />
      {/* <Board
        fleet={playerFleet}
        setFleet={setPlayerFleet}
        coordinates={playerCoordinates}
        setCoordinates={setPlayerCoordinates}
        isPlayerCoordinate={true}
        handleShipPlacement={handleShipPlacement}
        axis={axis}
        ship={ship}
      /> */}
      {/* <Board 
                fleet={computerFleet} 
                setFleet={setComputerFleet}
                coordinates={computerCoordinates}  
                isPlayerCoordinate={true}
                setCoordinates={setComputerCoordinates}
                axis={axis}
                ship={ship}
            /> */}
      {/* <Board fleet={[]} coordinates={playerCoordinates} /> */}
    </div>
  );
};

export default Game;
