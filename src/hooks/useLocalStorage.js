import { useEffect, useState } from "react";

export default function useLocalStorage(key, intialState) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || intialState
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  //everything has saved in localstorage => type of String
  return [value, setValue];
}
