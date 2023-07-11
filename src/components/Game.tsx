import { useState } from "react";
import Board from "./Board";
import GameSetup from "./GameSetup";
import { generateCoordinates, generateFleet } from "../utils";
import { CoordinateType, Fleet } from "../types";
import Button from "./Button";

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
      <h1 className="py-6 sm:py-12 lg:py-20 text-5xl">Battleship!</h1>
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
          {winner && (
            <div
              className={`absolute top-0 left-0 right-0 bottom-0 z-10 bg-neutral-900 bg-opacity-90 self-center flex flex-col gap-4 p-10 rounded-md items-center justify-center `}
            >
              <div
                className={`${
                  winner ? "scale-100" : ""
                } transition-transform flex flex-col p-8 lg:p-14 rounded-lg bg-neutral-500 gap-4`}
              >
                {winner && <p className="text-center text-3xl">{winner}!</p>}
                <Button className="w-full max-w-xs text-center mx-auto">
                  <button onClick={() => setGameStart(false)} className="w-full h-full">
                    Play again?
                  </button>
                </Button>
              </div>
            </div>
          )}
          <div className="flex flex-col xl:flex-row items-center justify-evenly gap-8">
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
