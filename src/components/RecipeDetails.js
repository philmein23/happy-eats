import React, { Component } from "react";
import { getRecipe } from "../api";

export default class RecipeDetails extends Component {
  state = {
    recipeDetails: null,
    loading: true
  };

  componentDidMount() {
    const { recipeId } = this.props.match.params;

    this.getRecipeDetails(recipeId);
  }

  getRecipeDetails = async recipeId => {
    this.setState(() => ({ recipeDetails: null, loading: true }))

    const recipeDetails = await getRecipe(recipeId);

    this.setState(() => ({
      recipeDetails,
      loading: false
    }));
  };

  componentWillReceiveProps(nextProps) {
    const { recipeId } = this.props.match.params;
    if (recipeId !== nextProps.match.params.recipeId) {
      this.getRecipeDetails(nextProps.match.params.recipeId);
    }
  }

  render() {
    const { recipeDetails, loading } = this.state;
    let recipeImage = null;

    if (recipeDetails && recipeDetails.images) {
        const [ image ] = recipeDetails.images;

        recipeImage = image;
    }

    return loading === true ? (
      <h1>Loading...</h1>
    ) : (
      <section>
        <h1>{recipeDetails.name}</h1>
        <img src={recipeImage.hostedLargeUrl} />
        <ul>
            {
                recipeDetails.ingredientLines.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))
            }
        </ul>
      </section>
    );
  }
}
