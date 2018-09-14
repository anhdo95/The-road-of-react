import React, { Component, Fragment } from "react";
import axios from "axios";
import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from "./Constant";
import "./App.css";
import Search from "./Search";
import Table from "./Table";
import Button from "./Button";
import Loading from "./Loading";

const withLoading = Component => ({ isLoading, ...rest }) =>
  isLoading ? <Loading /> : <Component {...rest} />;

const ButtonWithLoading = withLoading(Button);

class App extends Component {
  _isMounted = false;

  constructor(props, context) {
    super(props, context);
    this.state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
      sortKey: "NONE",
      isSortReverse: false,
      sortStatuses: {}
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = oldHits.concat(hits);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      },
      isLoading: false
    });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({
      isLoading: true
    });

    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const idNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(idNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
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
      results,
      searchKey,
      searchTerm,
      error,
      isLoading,
      sortKey,
      isSortReverse,
      sortStatuses
    } = this.state;
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search&nbsp;
          </Search>
          {error ? (
            <p>Something went wrong.</p>
          ) : (
            list && (
              <Fragment>
                <Table
                  list={list}
                  sortKey={sortKey}
                  isSortReverse={isSortReverse}
                  sortStatuses={sortStatuses}
                  onSort={this.onSort}
                  onDissmiss={this.onDismiss}
                />
                <ButtonWithLoading
                  isLoading={isLoading}
                  onClick={() =>
                    this.fetchSearchTopStories(searchKey, page + 1)
                  }
                >
                  More
                </ButtonWithLoading>
              </Fragment>
            )
          )}
        </div>
      </div>
    );
  }
}

export default App;
