import { useEffect, useState } from "react";
import { apiState } from "../../utils/enums";


//Custom hook for fetching the api response state and books data
function useFetchBooks() {
  const [books, setBooks] = useState([]);
  const [fetchState, setFetchState] = useState(apiState.LOADING);

  useEffect(() => {
    setFetchState(apiState.LOADING);
    async function fetchBooks() {
      try {
        const booksURL = "/getextracts?titlecontains=s";
        const fetchOptions = {
          method: "GET",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        };
        const response = await fetch(booksURL, fetchOptions);
        const data = await response.json();
        setBooks(data.Extracts);
        setFetchState(apiState.SUCCESS);
      } catch (error) {
        setFetchState(apiState.ERROR);
      }
    }
    fetchBooks();
  }, []);

  return { books, fetchState };
}

export default useFetchBooks;
