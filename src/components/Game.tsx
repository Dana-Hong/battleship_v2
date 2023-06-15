import { useState } from "react";
import Board from "./Board";
import GameSetup from "./GameSetup";
import { generateCoordinates, generateFleet } from "../utils";
import { CoordinateType, Fleet } from "../types";

const Game = () => {
  const [gameStart, setGameStart] = useState(false);
  const [computerFleet] = useState(generateFleet);
  const [computerCoordinates, setComputerCoordinates] = useState(
    generateCoordinates(computerFleet)
  );
  const [playerFleet, setPlayerFleet] = useState<Fleet>([]);
  const [playerCoordinates, setPlayerCoordinates] = useState<CoordinateType[]>(
    generateCoordinates()
  );

  const untargetedCoordinates = playerCoordinates.filter(
    (coordinate) => !coordinate.targeted && !coordinate.isLabel
  );
  const playerDestroyedShipCoordinates = playerCoordinates.filter(
    (coordinate) => coordinate.occupied && coordinate.targeted
  );
  const computerDestroyedShipCoordinates = computerCoordinates.filter(
    (coordinate) => coordinate.occupied && coordinate.targeted
  );

  const calculateWinner = () => {
    if (playerDestroyedShipCoordinates.length === 17) return "Computer wins!";
    if (computerDestroyedShipCoordinates.length === 17) return "Player wins";
    return null;
  };

  const winner = calculateWinner();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {!gameStart && (
        <GameSetup
          coordinates={playerCoordinates}
          fleet={playerFleet}
          setPlayerCoordinates={setPlayerCoordinates}
          setPlayerFleet={setPlayerFleet}
          setGameStart={setGameStart}
        />
      )}
      {gameStart && (
        <div className="w-full max-w-7xl flex flex-col">
          {winner && <p className="text-center text-3xl">{winner}</p>}
          <div className="flex xl:flex-row items-center justify-evenly gap-8">
            <div>
              <p className="text-center text-xl py-8">Player Board</p>
              <Board
                coordinates={playerCoordinates}
                fleet={playerFleet}
                isPlayerCoordinate={true}
                setCoordinates={setPlayerCoordinates}
                setFleet={setPlayerFleet}
              />
            </div>
            <div>
              <p className="text-center text-xl py-8">Computer Board</p>
              <Board
                coordinates={computerCoordinates}
                fleet={computerFleet}
                playerCoordinates={playerCoordinates}
                isPlayerCoordinate={false}
                untargetedCoordinates={untargetedCoordinates}
                setCoordinates={setComputerCoordinates}
                setPlayerCoordinates={setPlayerCoordinates}
                setFleet={setPlayerFleet}
                winner={winner}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
