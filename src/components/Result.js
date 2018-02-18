import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import RecipeDetails from "./RecipeDetails";

function CustomLink({ to, children }) {
  return (
    <Route
      path={to.pathname}
      children={({ match }) => (
        <li
          style={{ listStyle: "none", fontWeight: match ? "bold" : "normal" }}
        >
          <Link to={to}>{children}</Link>
        </li>
      )}
    />
  );
}

export default function Result({ loading, results, match, location }) {
  return (
    <div className="two-column">
      <ul className="recipeList">
        {results.map(recipe => (
          <li>
            <img src={recipe.imageUrlsBySize["90"]} />
            <CustomLink
              to={{
                pathname: `${match.url}/${recipe.id}`,
                search: location.search
              }}
            >
              {recipe.recipeName}
            </CustomLink>
          </li>
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
