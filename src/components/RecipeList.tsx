import React, { useState } from "react";
import RecipeForm from "./RecipeForm";
import IngredientsAggregator from "./IngredientsAggregator";

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "Citrus Breeze",
      description: "A fresh citrus blend.",
      ingredients: [
        { name: "Orange Oil", quantity: 5, unit: "mL" },
        { name: "Lemon Oil", quantity: 2.5, unit: "mL" },
      ],
    },
    {
      id: 2,
      name: "Floral Fantasy",
      description: "A delicate floral scent.",
      ingredients: [
        { name: "Rose Oil", quantity: 3, unit: "mL" },
        { name: "Orange Oil", quantity: 1.5, unit: "mL" },
      ],
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAggregatorOpen, setIsAggregatorOpen] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);

  const handleAddRecipe = () => {
    setRecipeToEdit(null);
    setIsFormOpen(true);
  };

  const handleEditRecipe = (recipe) => {
    setRecipeToEdit(recipe);
    setIsFormOpen(true);
  };

  const handleSaveRecipe = (recipe) => {
    if (recipeToEdit) {
      setRecipes(recipes.map((r) => (r.id === recipe.id ? recipe : r)));
    } else {
      setRecipes([...recipes, recipe]);
    }
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="p-6 min-h-screen">
      {isFormOpen ? (
        <RecipeForm
          onSave={handleSaveRecipe}
          recipeToEdit={recipeToEdit}
          onCancel={() => setIsFormOpen(false)}
        />
      ) : isAggregatorOpen ? (
        <IngredientsAggregator
          recipes={recipes}
          onBack={() => setIsAggregatorOpen(false)}
        />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Perfumer's 👃 best friend 🎉</h1>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleAddRecipe}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              New recipe
            </button>
            <button
              onClick={() => setIsAggregatorOpen(true)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              View order list
            </button>
          </div>
          <ul className="space-y-4">
            {recipes.map((recipe) => (
              <li
                key={recipe.id}
                className="p-4 bg-white shadow rounded flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{recipe.name}</h2>
                  <p className="text-gray-600">{recipe.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditRecipe(recipe)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default RecipeList;
