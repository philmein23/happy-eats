import React, { Component, Fragment } from "react";

export default class Search extends Component {
  searchRecipe = e => {
    e.preventDefault();

    this.props.searchRecipe(this.props.searchValue);
  };

  handleChangeValue = e => {
    this.props.onChangeValue(e.target.value);
  };

  render() {
    const { searchValue } = this.props;

    return (
      <Fragment>
        <form onSubmit={this.searchRecipe}>
          <input
            type="text"
            value={searchValue}
            onChange={this.handleChangeValue}
          />

          <button type="submit">Search</button>
        </form>
      </Fragment>
    );
  }
}
