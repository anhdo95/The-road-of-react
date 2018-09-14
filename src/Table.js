import React from "react";
import Button from "./Button";
import Sort from "./Sort";
import PropTypes from "prop-types";
import { sortBy } from "lodash";

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, "title"),
  AUTHOR: list => sortBy(list, "author"),
  COMMENTS: list => sortBy(list, "num_comments"),
  POINTS: list => sortBy(list, "points")
};

const largeColumn = {
  width: "40%"
};
const midColumn = {
  width: "30%"
};
const smallColumn = {
  width: "10%"
};

// const isSearched = searchTerm => item =>
//   item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Table = ({
  list,
  sortKey,
  isSortReverse,
  sortStatuses,
  onSort,
  onDissmiss
}) => {
  const sortedList = isSortReverse
    ? SORTS[sortKey](list).reverse()
    : SORTS[sortKey](list);

  return (
    <div className="table">
      <div className="table-header">
        <span style={largeColumn}>
          <Sort
            sortKey="TITLE"
            activeSortKey={sortKey}
            sortStatuses={sortStatuses}
            onSort={onSort}
          >
            Title
          </Sort>
        </span>
        <span style={midColumn}>
          <Sort
            sortKey="AUTHOR"
            sortStatuses={sortStatuses}
            activeSortKey={sortKey}
            onSort={onSort}
          >
            Author
          </Sort>
        </span>
        <span style={smallColumn}>
          <Sort
            sortKey="COMMENTS"
            sortStatuses={sortStatuses}
            activeSortKey={sortKey}
            onSort={onSort}
          >
            Comments
          </Sort>
        </span>
        <span style={smallColumn}>
          <Sort
            sortKey="POINTS"
            sortStatuses={sortStatuses}
            activeSortKey={sortKey}
            onSort={onSort}
          >
            Points
          </Sort>
        </span>
        <span style={smallColumn}>Archive</span>
      </div>
      {sortedList.map(item => (
        <div key={item.objectID} className="table-row">
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={midColumn}>{item.author}</span>
          <span style={smallColumn}>{item.num_comments}</span>
          <span style={smallColumn}>{item.points}</span>
          <span style={smallColumn}>
            <Button
              onClick={() => onDissmiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  onDissmiss: PropTypes.func.isRequired
};

export default Table;
