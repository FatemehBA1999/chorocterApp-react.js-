import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import { allCharacters } from "../data/data";
function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharacterList charecters={allCharacters} />
        <CharacterDetails />
      </div>
    </div>
  );
}
export default App;
