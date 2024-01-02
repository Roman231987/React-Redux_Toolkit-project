import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../redux/books/actionCreators";
import "./BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title && author) {
      const book = {
        title: title,
        author: author,
      };
      dispatch(addBook(book));
      setTitle("");
      setAuthor("");
    }
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
      </form>
    </div>
  );
};

export default BookForm;
