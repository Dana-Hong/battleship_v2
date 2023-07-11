import Home from "./components/Home";  
import Game from "./components/Game";

import { useState } from "react";

function App() {
  const [isBoardPlacement, setIsBoardPlacement] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  return (
    <div className="bg-neutral-800 min-h-screen text-neutral-200">
      {!isBoardPlacement ? 
      <Home setIsBoardPlacement={setIsBoardPlacement} /> :
      <Game gameStart={gameStart} setGameStart={setGameStart} setIsBoardPlacement={setIsBoardPlacement} />
      }
    </div>
  )
}

export default App
