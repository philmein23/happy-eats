import React, { Component, Fragment } from "react";

import Search from './Search';
import Result from './Result';
import { getRecipes, getRecipe } from '../api';

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
      };
    
      searchForRecipe = async value => {
        this.setState(() => ({
          loading: true
        }));
    
        const recipe = await getRecipes(value);
        console.log('location', this.props.location)
        this.setState(() => ({ recipes: recipe.matches, loading: false }));
      };
    
      render() {
        const { recipes, loading } = this.state;
    
        return (
          <Fragment>
            <header className="header-grid">
              <h1>Happy Eats</h1>
            </header>
            <main>
              <Search
                searchValue={this.state.searchValue}
                searchRecipe={this.searchForRecipe}
                onChangeValue={this.handleSearchValueChange}
              />
    
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

