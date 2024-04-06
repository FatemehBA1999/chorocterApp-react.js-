import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import { useState } from "react";

function App() {
  const [charecters, setCharecters] = useState([]);
  // not to fetch in this way =>
  // fetch("https://rickandmortyapi.com/api/character")
  //   .then((res) => res.json())
  //   .then((data) => setCharecters(data.results)); // don't do in  renderlogic
  // fetch API , timer , access to DOM
  // effect : 1: event handler function , 2: useeffect
  return (
    <div className="app">
      <Navbar>
        <SearchResult numOfResult={charecters.length} />
      </Navbar>
      <Main>
        <CharacterList allCharacters={charecters} />
        <CharacterDetails />
      </Main>
    </div>
  );
}
export default App;
function Main({ children }) {
  return <div className="main">{children}</div>;
}
// CHARECTER => App => Main => CharecterList
// لول پرابسهای ما را یک لول کاهش میدهد => use component composition
// هدف کامپوننت کامپوزیشن حذف لایه های اضافی است
