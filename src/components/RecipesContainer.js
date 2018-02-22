import React, { Component, Fragment } from "react";
import Search from "./Search";
import { Icon as iconList } from "../constants";
import Icon from "./Icon";

import {
  getRecipes,
  getRecipe,
  getRecipeWithControlledIngredients
} from "../api";

export default class RecipesContainer extends Component {
  state = {
    recipes: [],
    searchValue: "",
    loading: false
  };

  componentDidMount() {
    const { state } = this.props.location;

    if (state && state.recipes.length > 0) {
      this.setState(() => ({
        recipes: state.recipes
      }));
    }
  }

  handleSearchValueChange = value => {
    this.setState(() => ({
      searchValue: value
    }));
  };

  searchForRecipe = async value => {
    this.setState(() => ({
      loading: true
    }));

    const recipe = await getRecipes(value);
    this.setState(() => ({ recipes: recipe.matches, loading: false }));
  };

  buildRecipeFromIngredients = async ingredients => {
    if (ingredients && ingredients.length > 0) {
      const recipes = await getRecipeWithControlledIngredients(
        true,
        ...ingredients
      );

      console.log(recipes);
    }
  };

  render() {
    const getRecipeFns = () => ({
      searchForRecipe: this.searchForRecipe,
      buildRecipe: this.buildRecipeFromIngredients
    });

    const layout = this.props.isMainPage ? (
        <div className="grid-container">
          <div className="logo-title-grid">
            <Icon
              className={"logo"}
              size={100}
              iconName={iconList.plate_and_fork}
              viewBox={350}
            />
            <h1 className="main-title">Happy Eats</h1>
          </div>
          <div className="searchBar">
            <Search
              searchValue={this.state.searchValue}
              searchRecipe={this.searchForRecipe}
              onChangeValue={this.handleSearchValueChange}
            />
          </div>
          {this.props.children({ state: this.state, getRecipeFns: getRecipeFns()})}
        </div>
    ) : (
      <Fragment>
        <header className="header-grid">
          <h1 className="recipe-header">Happy Eats</h1>
          <Search
            searchValue={this.state.searchValue}
            searchRecipe={this.searchForRecipe}
            onChangeValue={this.handleSearchValueChange}
          />
        </header>
        {this.props.children({ state: this.state, getRecipeFns: getRecipeFns() })}
      </Fragment>
    );

    return <Fragment>{layout}</Fragment>;
  }
}
