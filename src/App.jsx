import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Loader from "./components/Loader";
import Navbar, { SearchResult, Search } from "./components/Navbar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Favorites } from "./components/Navbar";
function App() {
  const [charecters, setCharecters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // const [favorites, setFavorites] = useState([]); // without save to local storage
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("FAVOURITES")) || []
  ); //everything has saved in localstorage => type of String
  const [count, setCount] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fecthData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        setCharecters(data.results.slice(0, 3));
        // console.log(charecters); answer => [] because process is async
        // setIsLoading(false);
      } catch (error) {
        // fetch => err.name==="AbortError"
        // if (error.name !== "AbortError") {
        //   setCharecters([]);
        //   toast.error(error.response.data.error);
        // }
        // axios => axios.isCancle()
        if (!axios.isCancel()) {
          //اررهایی رو نشون بده که ما اونها رو کنسل نکردیم
          setCharecters([]);
          toast.error(error.response.data.error);
        }
        // setIsLoading(false);
        // console.log(error.response.data.error);
        // console.log(error.message);
        // toast.error(error.message); // in real project must use => err.response.data.message
      } finally {
        setIsLoading(false);
      }
    }
    fecthData();
    return () =>
      //controller
      controller.abort(); //هر بار کامپوننت در حال ریرندر شدن باشد رکوئستی که در حال اجرا باشد راکنسل میکند
  }, [query]);
 
  useEffect(() => {
    const interval = setInterval(() => setCount((c) => c + 1), 1000);
    // return function () {};
    return () => {
      clearInterval(interval); //اگر به هر دلیلی کامپوننت ما انمونت شد باید این خط رو اجرا کند
    };
  }, [count]);

  useEffect(() => {
    localStorage.setItem("FAVOURITES", JSON.stringify(favorites));
  }, [favorites]);
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
