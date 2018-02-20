import React, { Component, Fragment } from "react";
import Icon from "./Icon";
import { Icon as searchIcon } from '../constants'

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
        <form className="form-search" onSubmit={this.searchRecipe}>
            <Icon className={'search-icon'} size={32} iconName={searchIcon.search} />
            <input
                className="search-bar"
                type="search"
                placeholder="Search for all food recipes"
                value={searchValue}
                onChange={this.handleChangeValue}
            />

          <button className="submit" type="submit">Search</button>
        </form>
      </Fragment>
    );
  }
}
