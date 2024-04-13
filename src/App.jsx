import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Loader from "./components/Loader";
import Navbar, { SearchResult, Search } from "./components/Navbar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
function App() {
  const [charecters, setCharecters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
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
        setCharecters(data.results.slice(0, 5));
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
  const handelSelectCharacter = (id) => {
    setSelectedId(id);
  };
  console.log(selectedId);
  return (
    <div className="app">
      {/* <button className="badge badge--secondary" onClick={loadChararecter}>load new data(exp)</button> */}
      <Toaster />
      <Loader />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={charecters.length} />
      </Navbar>
      <Main>
        <CharacterList
          onSelectCharacter={handelSelectCharacter}
          allCharacters={charecters}
          isLoading={isLoading}
        />
        <CharacterDetails
          selectedId={selectedId ? selectedId : console.log("please selectId")}
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
