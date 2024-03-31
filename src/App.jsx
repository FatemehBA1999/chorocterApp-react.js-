import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import { allCharacters } from "../data/data";
import { useState } from "react";

function App() {
  const [charecters, setCharecters] = useState(allCharacters);
  return (
    <div className="app">
      <Navbar numOfResult={allCharacters.length} />
      <Main allCharacters={allCharacters} />
    </div>
  );
}
export default App;
function Main({ allCharacters }) {
  return (
    <div className="main">
      <CharacterList allCharacters={allCharacters} />
      <CharacterDetails />
    </div>
  );
}
