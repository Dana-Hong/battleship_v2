import BattleshipBG from "../../public/battleship-bg.jpg";
import Button from "./Button";

const Home = ({ setIsBoardPlacement }: { setIsBoardPlacement: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <main className="h-screen relative flex items-center justify-center">
        <img src={BattleshipBG} alt="battleship" className="opacity-30 absolute h-screen w-screen object-cover" />
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 lg:gap-20">
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-center z-10">Battleship!</h1>
      <Button className="max-w-sm z-10 bg-sky-600">
        <button onClick={() => setIsBoardPlacement(gs => !gs)}>Start Game</button>
      </Button>
        </div>
    </main>
  );
};

export default Home;