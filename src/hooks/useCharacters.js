import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function useCharacters(url, query) {
  const [charecters, setCharecters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fecthData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}=${query}`, { signal });
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
  return { isLoading, charecters };
}
//* CUSTOM HOOK
//* 1. useFetch ,useLocalStorage , useCart => باید به این شکل کاستوم هوکها را تعریف کنیم 
//* 2. at least one hook should be used => useState , useEffect => 
//* حداقل از یکی از هوکهای ریکت باید استفاده کنیم

