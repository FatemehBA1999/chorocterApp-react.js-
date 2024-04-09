import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Loader from "./components/Loader";
import Navbar, { SearchResult } from "./components/Navbar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
function App() {
  const [charecters, setCharecters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  // const loadChararecter = () => {
  //   // best way
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Something went wrong");
  //     return  res.json();
  //     })
  //     .then((data) => {
  //       setCharecters(data.results.slice(0, 3));
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       setIsLoading(false)
  //       toast.error(err.message)
  //     });
  // };
  // ************************* async & await =>
  // then catch => async await . ???
  // async function test(){}
  // async ()=>{}
  useEffect(() => {
    async function fecthData() {
      try {
        // setIsLoading(true);
        const res = await fetch("https://rickandmortyapi.com/api/characterkll");
        if (!res.ok) throw Error("Something went wrong");
        const data = await res.json();
        setCharecters(data.results.slice(0, 5));
        // console.log(charecters); answer => [] because process is async
        // setIsLoading(false);
      } catch (error) {
        // setIsLoading(false);
        console.log(error.message);
        toast.error(error.message); // in real project must use => err.response.data.message
      } finally {
        setIsLoading(false);
      }
    }
    fecthData();
  });
  return (
    <div className="app">
      {/* <button className="badge badge--secondary" onClick={loadChararecter}>load new data(exp)</button> */}
      <Toaster />
      <Navbar>
        <SearchResult numOfResult={charecters.length} />
      </Navbar>
      <Main>
        <CharacterList allCharacters={charecters} isLoading={isLoading} />
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
