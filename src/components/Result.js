import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import RecipeDetails from "./RecipeDetails";
import CustomLink from './CustomLink';



export default function Result({ loading, results, match, location }) {
  return (
    <div className="two-column">
      <ul className="recipeList">
        {results.map(recipe => (
          <Fragment>
            <img className="image" src={recipe.imageUrlsBySize["90"]} />
            <CustomLink
              to={{
                pathname: `${match.url}/${recipe.id}`,
                search: location.search
              }}
            >
              <span className="recipeName">{recipe.recipeName}</span>
            </CustomLink>
          </Fragment>
        ))}
      </ul>

      {loading === false && location.pathname === "/recipes" ? (
        <div>Select Recipe for Details</div>
      ) : null}

      <Route
        path={`${match.url}/:recipeId`}
        render={props => <RecipeDetails {...props} />}
      />
    </div>
  );
}
