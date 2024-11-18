import React, { useState } from "react";

const RecipeForm = ({ onSave, recipeToEdit, onCancel }) => {
  const [name, setName] = useState(recipeToEdit?.name || "");
  const [description, setDescription] = useState(recipeToEdit?.description || "");
  const [ingredients, setIngredients] = useState(recipeToEdit?.ingredients || [
    { name: "", quantity: "", unit: "mL" },
  ]);

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "mL" }]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert("Name and description are required!");
      return;
    }
    onSave({ id: recipeToEdit?.id || Date.now(), name, description, ingredients });
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        {recipeToEdit ? "Edit recipe" : "Add recipe"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipe Name */}
        <div>
          <label className="block text-gray-200 font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter recipe name"
          />
        </div>

        {/* Recipe Description */}
        <div>
          <label className="block text-gray-200 font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter recipe description"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-200 font-medium mb-2">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                placeholder="Ingredient name"
                className="flex-1 p-2 border rounded"
              />
              <input
                type="number"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                placeholder="Quantity"
                className="w-24 p-2 border rounded"
              />
              <select
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                className="p-2 border rounded"
              >
                <option value="mL">mL</option>
                <option value="mg">mg</option>
              </select>
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Add another ingredient
          </button>
        </div>

        {/* Form Actions */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
