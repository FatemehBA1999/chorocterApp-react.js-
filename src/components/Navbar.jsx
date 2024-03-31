import { HeartIcon } from "@heroicons/react/24/outline";
function Navbar({ numOfResult }) {
  return (
    <nav className="navbar">
      <Logo />
      <Search />
      <SearchResult numOfResult={numOfResult} />
      <Favorites />
    </nav>
  );
}
function Logo() {
  return <div className="navbar__logo">LOGO 😍</div>;
}
function Search() {
  return <input type="text" className="text-field" placeholder="search..." />;
}
function SearchResult({ numOfResult }) {
  return <div className="navbar__result">found {numOfResult} charecters</div>;
}
function Favorites() {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">5</span>
    </button>
  );
}
export default Navbar;
