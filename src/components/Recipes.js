import React, { Component, Fragment } from "react";

import Search from "./Search";
import Result from "./Result";
import RecipesContainer from "./RecipesContainer";
import {
  getRecipes,
  getRecipe,
  getRecipeWithControlledIngredients
} from "../api";

export default class Recipes extends Component {
  render() {
    return (
      <RecipesContainer isMainPage={false} {...this.props}>
        {({ state, getRecipeFns }) => (
          <Fragment>
            <main>
              {state.loading === true ? (
                <h1>Loading...</h1>
              ) : (
                <Result {...this.props} loading={state.loading} results={state.recipes} />
              )}
            </main>
          </Fragment>
        )}
      </RecipesContainer>
    );
  }
}
