import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import {
  selectIsLoadingViaAPI,
  addBook,
  fetchBook,
} from "../../redux/slices/booksSlice";
import { setError } from "../../redux/slices/errorSlice";
import booksData from "../../data/books.json";
import createBookWithID from "../utils/createBookWithID";
import "./BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    dispatch(addBook(createBookWithID(randomBook, "random")));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title && author) {
      dispatch(addBook(createBookWithID({ title, author }, "manual")));
      setTitle("");
      setAuthor("");
    } else {
      dispatch(setError("You must fill title and author"));
    }
  };

  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook("http://localhost:4000/random-book-delayed"));
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} action="">
        <div className="">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>
        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
          disabled={isLoadingViaAPI}
        >
          {isLoadingViaAPI ? (
            <>
              <span>Loading book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "Add Random via API"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
