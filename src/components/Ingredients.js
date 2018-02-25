import React, { Component, Fragment } from "react";

export default class Ingredients extends Component {
  state = {
    ingredients: [{ name: "" }]
  };

  addNewIngredient = () => {
    this.setState(() => ({
      ingredients: [...this.state.ingredients, ...[{ name: "" }]]
    }));
  };

  removeIngredient = selectedIndex => {
    let filteredIngredients = this.state.ingredients.filter(
      (ingredient, index) => {
        return index !== selectedIndex;
      }
    );

    this.setState(() => ({
      ingredients: filteredIngredients
    }));
  };

  handleChange = index => e => {
    e.persist();
    let updatedIngredientsList = this.state.ingredients.map(
      (ingredient, idx) => {
        if (index !== idx) {
          return ingredient;
        }

        if (index === idx) {
          return { ...ingredient, ...{ name: e.target.value } };
        }
      }
    );

    this.setState(() => ({
      ingredients: updatedIngredientsList
    }));

  };

  buildRecipes = e => {
    e.preventDefault();

    this.props.buildRecipes(this.state.ingredients);
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={(e) => this.buildRecipes(e)}>
          {this.state.ingredients.length > 0 &&
            this.state.ingredients.map((ingredient, index) => (
              <div key={index}>
                <button type="button" onClick={this.addNewIngredient}>Add</button>
                <button type="button" onClick={() => this.removeIngredient(index)}>
                  Remove
                </button>
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={this.handleChange(index)}
                />
              </div>
            ))}

          <button type="submit">Build Recipes</button>
        </form>
      </Fragment>
    );
  }
}
