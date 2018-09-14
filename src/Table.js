import React, { PureComponent } from "react";
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

class Table extends PureComponent {
  constructor(props) {
    super(props)
  
    this.state = {
      sortKey: "NONE",
      isSortReverse: false,
      sortStatuses: {}
    };

    this.onSort = this.onSort.bind(this);
  }
  
  onSort(sortKey) {
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;
    
    this.setState({ 
      sortKey,
      isSortReverse,
      sortStatuses: {
        ...this.state.sortStatuses,
        [sortKey]: isSortReverse
      }
    }); 
  }

  render() {
    const {
      list,
      onDissmiss
    } = this.props;

    const {
      sortKey,
      isSortReverse,
      sortStatuses,
    } = this.state;

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
              onSort={this.onSort}
            >
              Title
            </Sort>
          </span>
          <span style={midColumn}>
            <Sort
              sortKey="AUTHOR"
              sortStatuses={sortStatuses}
              activeSortKey={sortKey}
              onSort={this.onSort}
            >
              Author
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort
              sortKey="COMMENTS"
              sortStatuses={sortStatuses}
              activeSortKey={sortKey}
              onSort={this.onSort}
            >
              Comments
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort
              sortKey="POINTS"
              sortStatuses={sortStatuses}
              activeSortKey={sortKey}
              onSort={this.onSort}
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
  }
}

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
