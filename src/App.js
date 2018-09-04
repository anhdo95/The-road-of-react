import React, { Component } from "react";
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
import Search from './Search';
import Table from './Table';
import Button from "./Button";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories(result) {
    const {hits, page} = result;

    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = oldHits.concat(hits);

    this.setState({ result: { hits: updatedHits, page } });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  onDismiss(id) {
    const idNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(idNotId);
    const result = { ...this.state.result, hits: updatedHits };
    this.setState({ result });
  }

  render() {
    const { result, searchTerm } = this.state;
    const page = (result && result.page) | 0;

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
            Search&nbsp;
          </Search>
        </div>
          
        {result && <Table list={result.hits} onDissmiss={this.onDismiss} />}
        <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
          More
        </Button>
      </div>
    );
  }
}

export default App;
