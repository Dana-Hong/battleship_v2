import { useState } from "react";
import Board from "./Board";
import GameSetup from "./GameSetup";
import { generateCoordinates, generateFleet, generateShip } from "../utils";
import { CoordinateType, Fleet, } from "../types";
import Coordinate from "./Coordinate";

const Game = () => {
  const [gameStart, setGameStart] = useState(false);
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
      {!gameStart && (
        <GameSetup
          coordinates={playerCoordinates}
          fleet={playerFleet}
          setPlayerCoordinates={setPlayerCoordinates}
          setPlayerFleet={setPlayerFleet}
          setGameStart={setGameStart}
        />
      )}
      {gameStart && 
      
      <div>
        <Board 
          coordinates={playerCoordinates}
          fleet={playerFleet}
          isPlayerCoordinate={true}
          setCoordinates={setPlayerCoordinates}
          setFleet={setPlayerFleet}
        />
        <Board 
          coordinates={computerCoordinates}
          fleet={computerFleet}
          isPlayerCoordinate={false}
          setCoordinates={setComputerCoordinates}
          setFleet={setPlayerFleet}
        />
      </div>
      }
    </div>
  );
};

export default Game;
