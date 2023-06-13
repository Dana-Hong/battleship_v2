import ShipSelector from "./components/ShipSelector"; 
import Game from "./components/Game";
import BoardSetup from "./components/BoardSetup";

function App() {
  return (
    <div className="bg-neutral-800 min-h-screen text-neutral-200">
      <Game />
      {/* <ShipSelector />
      <Board /> */}
    </div>
  )
}

export default App
