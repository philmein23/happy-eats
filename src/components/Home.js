import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

import RecipesContainer from './RecipesContainer';
import Ingredients from './Ingredients';
import CustomLink from './CustomLink';

export default class Home extends Component {
  render() {
    return (
      <RecipesContainer {...this.props} isMainPage={true}>
        {
          ({ state, getRecipeFns }) => (
            <ul className="results-subgrid">
              {/* <Ingredients buildRecipes={getRecipeFns.buildRecipe} /> */}
              {state.recipes.map(recipe => (
                <div key={recipe.id} className="info-grid">
                  <CustomLink
                    to={{
                      pathname: `${this.props.location.pathname}recipes/${recipe.id}`,
                      state: {
                        recipes: state.recipes
                      }
                    }}
                  ><div className="info-card">
                     <img className="image" src={recipe.imageUrlsBySize["90"]} />
                     <span className="recipeName">{recipe.recipeName}</span>
                  </div>

                  </CustomLink>
                </div>
              ))}
            </ul>
          )
        }
      </RecipesContainer>

    );
  }
}
