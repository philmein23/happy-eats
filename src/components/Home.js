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
          ({recipes}) => (
            <ul className="results-subgrid">
              <Ingredients />

              {recipes.map(recipe => (
                <div key={recipe.id} className="info-grid">
                  <CustomLink
                    to={{
                      pathname: `${this.props.location.pathname}recipes/${recipe.id}`,
                      state: {
                        recipes
                      }
                    }}
                  >
                    <img className="image" src={recipe.imageUrlsBySize["90"]} />
                    {recipe.recipeName}
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
