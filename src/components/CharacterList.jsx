import { EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function CharacterList({ allCharacters }) {
  return (
    <div className="characters-list">
      {allCharacters.map((item) => (
        <Character key={item.id} item={item} />
      ))}
    </div>
  );
}
function Character({ item }) {
  const [open, setOpen] = useState(false);
  function handleCharacter() {
    setOpen(!open);
  }
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharecterName item={item} />
      <ChareterInfo item={item} />
      <button className="icon red" onClick={handleCharacter}>
        <EyeIcon />
      </button>
    </div>
  );
}
function CharecterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "🧓" : "👱‍♀️"}</span>
      <span>{item.name}</span>
    </h3>
  );
}
function ChareterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span> {item.status} </span>
      <span> - {item.species}</span>
    </div>
  );
}

// render logic =>
// do not perform network req
// do not create time
// access DOM API ...
// do not mutate object , state , props !
