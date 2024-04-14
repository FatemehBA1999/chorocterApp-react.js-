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
  const [favorites, setFavorites] = useState([]);
  const [count, setCount] = useState(0);
  //********************************* */ مفاهیم و تعاریف useeffectها
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
  // *************!!!!!!!!!!!!!*********** another way
  // useEffect(() => {
  //   // best way
  //   setIsLoading(true);
  //   axios
  //     .get("https://rickandmortyapi.com/api/character")
  //     .then((res) => {
  //       setCharecters(res.data.results.slice(0, 3));
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       toast.error(err.response.data.error);
  //     });
  // }, []);
  // ************************* async & await =>
  // then catch => async await . ???
  // async function test(){}
  // async ()=>{}
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! =>  use fetch
  // useEffect(() => {
  //   async function fecthData() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch("https://rickandmortyapi.com/api/character");
  //       if (!res.ok) throw Error("Something went wrong");
  //       const data = await res.json();
  //       setCharecters(data.results.slice(0, 5));
  //       // console.log(charecters); answer => [] because process is async
  //       // setIsLoading(false);
  //     } catch (error) {
  //       // setIsLoading(false);
  //       console.log(error.message);
  //       toast.error(error.message); // in real project must use => err.response.data.message
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fecthData();
  // }, []);
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!end
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // ********************** dependency array : role? => when to run effect function
  //? 1.useEffect(()=>{}) never don't use
  //* تحت کنترل ما نیست و همیشه در حال اجرا شدن یا همان به اصطلاح ریرندر شدن است
  //? 2.useEffect(()=>{},[empty])
  //**  یکبار در فاز مونت اجرا میشود(mount)
  //? 3.useEffect(()=>{},[state , props])
  //*** دپندنسیها در این گزینه بامقدار استیت و پرابس پر میشوند (زمانی این اجرا میشود که مقادیر درون آرایه تغییر پیدا کنند)

  //! when this useEffect runs. ?!

  //? answer =>

  //? 1. state => changes => re-render => browser paint
  //? 2.state => changes => run effect function => setstate => re-render
  //*  (زمانی که استیت تغییر کند یا به اصطلاح ریرندر شوند باعث میشود یوزافکت دوباره اجرا شود)

  //!چرا توصیه نمیشود از یوزافکت زیاد استفاده کنید؟
  //*به دلیل ریرندر شدن اضافی از یوزر افکت زیاد توصیه نمیشود که استفاده کنیم

  //! چه زمانی یوزافکت اجرا میشود؟
  //*بعد از بروزر پینت زمانی که استیت تغییر میکند کامپوننت ریرندر میشود و بروزر پینت میشود
  //*استیت تغییر کند یعد از آن یوزافکت ران میشود و بعد که ست استیت تغییر کرد کامپوننت ریرندر میشود

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //************************************* */

  useEffect(() => {
    async function fecthData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );
        setCharecters(data.results.slice(0, 3));
        // console.log(charecters); answer => [] because process is async
        // setIsLoading(false);
      } catch (error) {
        setCharecters([]);
        console.log(error.response.data.error);
        // setIsLoading(false);
        console.log(error.message);
        toast.error(error.response.data.error);
        // toast.error(error.message); // in real project must use => err.response.data.message
      } finally {
        setIsLoading(false);
      }
    }
    fecthData();
  }, [query]);
  //************ */
  // cleanUp function =>
  // what?
  // why to use?
  // when run? 1.unmount component,2.before the next re-render(between re-renders)
  // where to use? after unmount or while re-rendering
  //  *:example:* fetchApi,timer,addEvenListener
  //??????????????????
  // useEffect(() => {
  //   setInterval(() => setCount((c) => c + 1), 1000);
  // }, [count]);
  //?خارج از کنترل ما اجرا میشود و اصلا ان خروجی ایی که ما میخواهیم را به ما نمیدهد
  //!مهمترین وظیفه کلین اپ فانکشن :
  //*جلوگیری از لیک حافظه
  //*جلوگیری یا حذف کردن رفتارهای  ناخواسته و غیر ضروری
  //**************best way */
  //* re-render == unmount
  //* render == mount
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
  console.log(selectedId);
  const handelAddFavourite = (char) => {
    setFavorites((prevFav) => [...prevFav, char]);
  };
  const isAddToFavourite = favorites.map((fav) => fav.id).includes(selectedId); //[1,2,3]
  return (
    <div className="app">
      {/* <button className="badge badge--secondary" onClick={loadChararecter}>load new data(exp)</button> */}
      <div style={{ color: "#fff" }}>{count}</div>
      <Toaster />
      <Loader />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={charecters.length} />
        <Favorites numOfFavourites={favorites.length} />
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
