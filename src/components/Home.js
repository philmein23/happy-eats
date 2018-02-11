import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

import Search from "./Search";
import Result from "./Result";
import { getRecipes } from "../api";

export default class Home extends Component {
  state = {
    searchTerm: "",
    recipes: []
  };

  handleChangeValue = value => {
    this.setState(() => ({ searchTerm: value }));
  };

  searchRecipes = async () => {
    const { searchTerm } = this.state;

    const recipes = await getRecipes(searchTerm);

    this.setState(() => ({
      recipes: recipes.matches
    }));
  };

  render() {
    const { recipes, searchTerm } = this.state;

    return (
      <div>
        <Search
          searchValue={searchTerm}
          searchRecipe={this.searchRecipes}
          onChangeValue={this.handleChangeValue}
        />

        {recipes.length > 0 && (
          <Redirect
            to={{
              pathname: "/recipes",
              state: {
                recipes: recipes
              }
            }}
          />
        )}
      </div>
    );
  }
}
