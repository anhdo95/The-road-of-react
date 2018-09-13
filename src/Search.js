import React, { Component } from "react";

class Search extends Component {
  componentDidMount() {
    this.input.focus();
  }

  render() {
    const { value, onChange, onSubmit, children } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <label>{children}</label>
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={el => (this.input = el)}
        />
        <button type="submit">{children}</button>
      </form>
    );
  }
}

export default Search;
