import React from "react";
import "../styles/Recipe.css"

function Recipe({ recipe, onDelete }) {
  const formattedDate = new Date(recipe.created_at).toLocaleDateString("en-US");

  return (
    <div className="recipe-container">
      <p className="recipe-name">{recipe.name}</p>
      <p className="recipe-url">{recipe.url}</p>
      <p className="recipe-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(recipe.id)}>
        Delete
      </button>
    </div>
  );
}

export default Recipe