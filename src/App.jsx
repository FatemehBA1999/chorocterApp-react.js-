import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import { useEffect, useState } from "react";

function App() {
  const [charecters, setCharecters] = useState([]);
  //  ???????????????????????????????? fetch=>
  // not to fetch in this way =>
  // fetch("https://rickandmortyapi.com/api/character")
  //   .then((res) => res.json())
  //   .then((data) => setCharecters(data.results)); // don't do in  renderlogic
  // fetch API , timer , access to DOM
  // effect : 1: event handler function , 2: useeffect
  // useEffect(() => {
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => setCharecters(data.results.slice(0, 5)));
  // }, []);
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! best way =>
  // const loadChararecter = () => { // best way
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => setCharecters(data.results.slice(0, 3)));
  // };
  // ************************* async & await =>
  // then catch => async await . ???
  // async function test(){}
  // async ()=>{}
  useEffect(() => {
    async function fecthData() {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setCharecters(data.results.slice(0, 5));
      // console.log(charecters); answer => [] because process is async
    }
    fecthData();
  });
  return (
    <div className="app">
      {/* <button className="badge badge--secondary" onClick={loadChararecter}>load new data(exp)</button> */}
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
