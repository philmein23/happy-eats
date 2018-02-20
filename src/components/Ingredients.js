import React, { Component, Fragment } from "react";

export default class Ingredients extends Component {
  state = {
    ingredients: [{ name: '' }]
  };

  addNewIngredient = () => {
    this.setState(() => ({
      ingredients: [...this.state.ingredients, ...[{ name: '' }]]
    }));
  };

  handleChange = (index) => (e) => {
      e.persist();
      let updatedIngredientsList = this.state.ingredients.map((ingredient, idx) => {
            if (index !== idx) {
                return ingredient;
            }

            if (index === idx) {
                return {...ingredient, ...{ name: e.target.value}}
            }
      })

      this.setState(() => ({ 
          ingredients: updatedIngredientsList
        }))
  }

  render() {
    return (
      <Fragment>
        {this.state.ingredients.length > 0 &&
          this.state.ingredients.map((ingredient, index) => (
            <div key={index}>
              <button onClick={this.addNewIngredient}>Add</button>
              <input type="text" value={ingredient.name} onChange={this.handleChange(index)}/>
            </div>
          ))}
      </Fragment>
    );
  }
}
