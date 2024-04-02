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
      <Main allCharacters={allCharacters}>
        <CharacterList allCharacters={allCharacters} />
        <CharacterDetails />
      </Main>
    </div>
  );
}
export default App;
function Main({ children }) {
  return <div className="main">{ }</div>;
}
// CHARECTER => App => Main => CharecterList
// لول پرابسهای ما را یک لول کاهش میدهد => use component composition
// هدف کامپوننت کامپوزیشن حذف لایه های اضافی است
