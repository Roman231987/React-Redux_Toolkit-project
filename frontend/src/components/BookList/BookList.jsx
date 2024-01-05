import { useSelector, useDispatch } from "react-redux";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators";
import { selectTitleFilter } from "../../redux/slices/filterSlice";
import "./BookList.css";

const BookList = () => {
  const books = useSelector((state) => state.books);
  const titleFilter = useSelector(selectTitleFilter);
  const dispatch = useDispatch();

  const handelDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const folteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
      return matchesTitle;
  });

  console.log(folteredBooks);

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {folteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {book.title} by <strong> {book.author} </strong>
              </div>

              <span onClick={() => handleToggleFavorite(book.id)}>
                {book.isFavorite ? (
                  <BsBookmarkStarFill className="star-icon" />
                ) : (
                  <BsBookmarkStar className="star-icon" />
                )}
              </span>

              <div className="book-actions">
                <button onClick={() => handelDeleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
