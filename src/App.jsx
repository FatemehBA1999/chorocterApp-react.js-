import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Loader from "./components/Loader";
import Navbar, { SearchResult, Search } from "./components/Navbar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Favorites } from "./components/Navbar";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";
function App() {
  const [query, setQuery] = useState("");
  const { isLoading, charecters } = useCharacters(
    "https://rickandmortyapi.com/api/character/?name",
    query
  );
  const [selectedId, setSelectedId] = useState(null);
  // const [favorites, setFavorites] = useState([]); // without save to local storage
  const [count, setCount] = useState(0);
  const [favorites, setFavorites] = useLocalStorage("FAVOURITES", []);
  useEffect(() => {
    const interval = setInterval(() => setCount((c) => c + 1), 1000);
    // return function () {};
    return () => {
      clearInterval(interval); //اگر به هر دلیلی کامپوننت ما انمونت شد باید این خط رو اجرا کند
    };
  }, [count]);

  const handelSelectCharacter = (id) => {
    setSelectedId((preId) => (preId === id ? null : id));
  };
  const handleDeleteFavourite = (id) => {
    setFavorites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };
  // console.log(selectedId);
  const handelAddFavourite = (char) => {
    setFavorites((prevFav) => [...prevFav, char]);
  };
  const isAddToFavourite = favorites.map((fav) => fav.id).includes(selectedId); //[1,2,3]
  return (
    <div className="app">
      {/* <button className="badge badge--secondary" onClick={loadChararecter}>load new data(exp)</button> */}
      <div style={{ color: "#fff" }}>{count}</div>
      <Toaster />
      {/* <Modal title="modal test" open={true} onOpen={}></Modal> */}
      <Loader />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={charecters.length} />
        <Favorites
          favourites={favorites}
          onDeleteFavourite={handleDeleteFavourite}
        />
      </Navbar>
      <Main>
        <CharacterList
          selectedId={selectedId}
          onSelectCharacter={handelSelectCharacter}
          allCharacters={charecters}
          isLoading={isLoading}
        />
        <CharacterDetails
          selectedId={selectedId}
          onAddFavourite={handelAddFavourite}
          isAddToFavourite={isAddToFavourite}
        />
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
