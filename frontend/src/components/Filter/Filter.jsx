import { useSelector, useDispatch } from "react-redux";
import {
  selectTitleFilter,
  selectAuthorFilter,
  setTitleFilter,
  setAuthorFilter,
  resetFilters,
} from "../../redux/slices/filterSlice";

import "./Filter.css";

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilters = useSelector(selectTitleFilter);
  const authorFilters = useSelector(selectAuthorFilter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title..."
            onChange={handleTitleFilterChange}
            value={titleFilters}
          />
        </div>

        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by author"
            onChange={handleAuthorFilterChange}
            value={authorFilters}
          />
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
