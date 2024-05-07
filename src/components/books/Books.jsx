import React, { useState } from "react";
import sortAscendingLetters from "../../assets/sort-ascending-letters.svg";
import sortDescendingLetters from "../../assets/sort-descending-letters.svg";
import sortAscendingNumbers from "../../assets/sort-ascending-numbers.svg";
import sortDescendingNumbers from "../../assets/sort-descending-numbers.svg";
import sortAscending from "../../assets/sort-ascending.svg";
import sortDescending from "../../assets/sort-descending.svg";
import arrowsSort from "../../assets/arrows-sort.svg";


//Initial sort type for table columns
const initialFilterState = {
  author: "default",
  title: "default",
  estimatedReadingTimeMinutes: "default",
  publicationDate: "default",
};


//Books table component
const Books = (props) => {
  const { booksData } = props;
  const [books, setBooks] = useState(booksData);
  const [filterState, setFilterState] = useState(initialFilterState);

  //Function to format the publication Date
  const formatDate = (date) => {
    try {
      const dateFormat = new Date(date);
      const month = (dateFormat.getMonth() + 1).toString().padStart(2, "0");
      const day = dateFormat.getDate().toString().padStart(2, "0");
      const year = dateFormat.getFullYear().toString().slice(2);
      return `${month}/${day}/${year}`;
    } catch (error) {
      return date;
    }
  };


  //Function to handle books sorting for title, author, estimated reading time and publication date fields
  const handleFilter = (type) => {
    let tempBooks = [...books];

    //Handling sort type
    filterState[type] === "desc" ?
      setFilterState((prevState) => ({ ...prevState, [type]: "asec" })) :
      setFilterState((prevState) => ({ ...prevState, [type]: "desc" }));

    //Handling sorting
    if (["author", "title"].includes(type)) {
      tempBooks.sort(function (a, b) {
        if (a[type] < b[type]) return filterState[type] === "desc" ? 1 : -1;
        if (a[type] > b[type]) return filterState[type] === "desc" ? -1 : 1;
        return 0;
      });
    } else if (type === "estimatedReadingTimeMinutes") {
      tempBooks.sort(function (a, b) {
        return filterState[type] === "desc" ?
          b.estimatedReadingTimeMinutes - a.estimatedReadingTimeMinutes :
          a.estimatedReadingTimeMinutes - b.estimatedReadingTimeMinutes
      });
    } else if (type === "publicationDate") {
      tempBooks.sort(function (a, b) {
        const dateA = new Date(a.publicationDate).getTime();
        const dateB = new Date(b.publicationDate).getTime()
        return filterState[type] === "desc" ?
          dateB - dateA :
          dateA - dateB
      });
    }
    setBooks(tempBooks);
  };


  //Function to reset the books sort
  const resetBooksFilter = () => {
    setBooks(booksData);
    setFilterState(initialFilterState);
  };

  //Table heading wrapper components for headings with sort functionality
  const TableTh = (props) => {
    const { text, type } = props;
    return (
      <th className="books-table-filter-th">
        <button
          onClick={() => handleFilter(type)}
          className="table-sort-button"
        >
          {text}
          {filterState[type] === "desc" ? (
            <img
              src={
                ["author", "title"].includes(type)
                  ? sortAscendingLetters
                  : type === "estimatedReadingTimeMinutes"
                    ? sortAscendingNumbers
                    : sortAscending
              }
              alt="sort-icon"
            />
          ) : filterState[type] === "asec" ? (
            <img
              src={
                ["author", "title"].includes(type)
                  ? sortDescendingLetters
                  : type === "estimatedReadingTimeMinutes"
                    ? sortDescendingNumbers
                    : sortDescending
              }
              alt="sort-icon"
            />
          ) : (
            <img src={arrowsSort} alt="sort-icon" width={20} />
          )}
        </button>
        {["asec", "desc"].includes(filterState[type]) ? (
          <button
            className="table-restore-button"
            onClick={resetBooksFilter}
          ></button>
        ) : null}
      </th>
    );
  };

  //Table component for books
  return (
    <table className="books-table">
      <thead className="books-table-header">
        <tr>
          <th className="books-table-sno-th">S.No</th>
          <th>Cover</th>
          <TableTh type="author" text="Author" />
          <th>Biography</th>
          <TableTh type="title" text="Title" />
          <TableTh
            type="estimatedReadingTimeMinutes"
            text="Reading time (minutes)"
          />
          <TableTh type="publicationDate" text="Publication date" />
        </tr>
      </thead>
      <tbody className="books-table-body">
        {books.map((eachBook, index) => (
          <tr key={eachBook.isbn} className="books-table-body-rows">
            <td className="books-table-sno-td">
              <div>{index + 1}</div>
            </td>
            <td>
              <div className="table-cover-container">
                <img
                  src={eachBook.jacketUrl}
                  alt="book-cover"
                  className="books-cover-image"
                  onClick={() =>
                    (window.location.href = `https://extracts.panmacmillan.com/extract?isbn=${eachBook.isbn}`)
                  }
                />
              </div>
            </td>
            <td>
              <div>{eachBook.author}</div>
            </td>
            <td className="books-table-authorBiography-td">
              <div
                dangerouslySetInnerHTML={{
                  __html: eachBook.authorBiography,
                }}
              />
            </td>
            <td>
              <div>
                <a
                  href={`https://extracts.panmacmillan.com/extract?isbn=${eachBook.isbn}`}
                >
                  {eachBook.title}
                </a>
              </div>
            </td>
            <td>
              <div>{eachBook.estimatedReadingTimeMinutes}</div>
            </td>
            <td>
              <div>{formatDate(eachBook.publicationDate)}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Books;
