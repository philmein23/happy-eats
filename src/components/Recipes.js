import React, { Component, Fragment } from "react";

import Search from './Search';
import Result from './Result';
import { getRecipes, getRecipe, getRecipeWithControlledIngredients } from '../api';

export default class Recipes extends Component {
    state = {
        recipes: [],
        searchValue: "",
        loading: false
      };

      componentDidMount() {
        const { state } = this.props.location

        if (state && state.recipes.length > 0 ) {
          this.setState(() => ({
            recipes: state.recipes
          }))
        } 
      }
    
      handleSearchValueChange = value => {
        this.setState(() => ({
          searchValue: value
        }));

        console.log(this.state.searchValue)
      };
    
      searchForRecipe = async value => {
        this.setState(() => ({
          loading: true
        }));
    
        const recipe = await getRecipes(value);
        this.setState(() => ({ recipes: recipe.matches, loading: false }));
      };

      buildRecipeFromIngredients = async (ingredients) => {
        if (ingredients) {
          ingredients = ingredients.split(' ');
          const recipes = await getRecipeWithControlledIngredients(true, ...ingredients);

          console.log(recipes);
        }
      }
    
      render() {
        const { recipes, loading } = this.state;
    
        return (
          <Fragment>
            <header className="header-grid">
              <h1 className="recipe-header">Happy Eats</h1>
              <Search
                searchValue={this.state.searchValue}
                searchRecipe={this.buildRecipeFromIngredients}
                onChangeValue={this.handleSearchValueChange}
              />
            </header>
            <main>

              {loading === true ? (
                <h1>Loading...</h1>
              ) : (
                <Result {...this.props} loading={loading} results={recipes} />
              )}
            </main>
          </Fragment>
        );
    }
}

