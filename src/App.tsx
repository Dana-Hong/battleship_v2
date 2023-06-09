import { generateRow, generateRows } from "./constants/coordinates";
import Row from "./Row";


function App() {
  console.log(generateRows());
  return (
    <div>
      {generateRows().map(row => (
        <Row row={row}/>
      ))}
    </div>
  )
}

export default App
