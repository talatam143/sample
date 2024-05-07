import React from "react";
import "./books-styles.scss";
import useFetchBooks from "./useFetchBooks";
import { apiState } from "../../utils/enums";
import error from "../../assets/error.png";
import LoadingPage from "./LoadingPage";
import Books from "./Books";


//Books body component
const BooksBody = () => {
  //Custom hook for fetching the api response state and books data
  const { books, fetchState } = useFetchBooks();

  //Rendering the respective component based on the api state
  const BooksState = () => {
    switch (fetchState) {
      case apiState.LOADING:
        return <LoadingPage />;
      case apiState.SUCCESS:
        return books?.length > 0 ? <Books booksData={books} /> : null;
      case apiState.ERROR:
        return (
          <div className="books-error-container">
            <img src={error} alt="error-img" width={300} />
            <h1>Something went wrong</h1>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="books-container">
      <BooksState />
    </div>
  );
};

export default BooksBody;
