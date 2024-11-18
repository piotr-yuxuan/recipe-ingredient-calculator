// @ts-nocheck
import React, { useState } from "react";

const IngredientsAggregator = ({ recipes, onBack }) => {
  const [recipeQuantities, setRecipeQuantities] = useState(
    recipes.reduce((acc, recipe) => {
      acc[recipe.id] = 0; // Default quantity is 0
      return acc;
    }, {})
  );

  // Update quantity for a recipe
  const updateQuantity = (id, value) => {
    const quantity = Math.max(0, parseInt(value) || 0); // Ensure non-negative integers
    setRecipeQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  // Aggregate ingredients from recipes with quantities
  const aggregateIngredients = () => {
    const aggregated = {};

    recipes.forEach((recipe) => {
      const multiplier = recipeQuantities[recipe.id] || 0;
      if (multiplier > 0) {
        recipe.ingredients.forEach(({ name, quantity, unit }) => {
          const key = `${name.toLowerCase()}-${unit}`;
          if (!aggregated[key]) {
            aggregated[key] = { name, quantity: 0, unit };
          }
          aggregated[key].quantity += parseFloat(quantity) * multiplier;
        });
      }
    });

    return Object.values(aggregated);
  };

  const aggregatedIngredients = aggregateIngredients();

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Aggregated Ingredients</h1>
      <button
        onClick={onBack}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-4"
      >
        Back
      </button>
      <h2 className="text-xl font-semibold mb-2">Specify Quantities for Recipes</h2>
      <ul className="space-y-4 mb-6">
        {recipes.map((recipe) => (
          <li
            key={recipe.id}
            className="p-4 bg-white shadow rounded flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-medium">{recipe.name}</h3>
              <p className="text-gray-600">{recipe.description}</p>
            </div>
            <input
              type="number"
              value={recipeQuantities[recipe.id]}
              min="0"
              onChange={(e) => updateQuantity(recipe.id, e.target.value)}
              className="w-20 p-2 border rounded"
              placeholder="Qty"
            />
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Aggregated Ingredients</h2>
      {aggregatedIngredients.length > 0 ? (
        <ul className="space-y-4">
          {aggregatedIngredients.map((ingredient, index) => (
            <li
              key={index}
              className="p-4 bg-white shadow rounded flex justify-between items-center"
            >
              <span className="text-xl text-gray-600 font-medium">{ingredient.name}</span>
              <span className="text-gray-600">
                {ingredient.quantity.toFixed(2)} {ingredient.unit}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No ingredients selected for aggregation.</p>
      )}
    </div>
  );
};

export default IngredientsAggregator;
