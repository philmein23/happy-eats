import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

import Search from "./Search";
import Icon from "./Icon";
import { Icon as iconList } from '../constants'

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
      <div className="grid-container">
        <div className="logo-title-grid">
            <Icon className={'logo'} size={100} iconName={iconList.plate_and_fork} viewBox={350} />
            <h1 className="main-title">Happy Eats</h1>
        </div>
        

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
                recipes
              }
            }}
          />
        )}
      </div>
    );
  }
}
