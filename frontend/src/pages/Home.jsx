import { useState, useEffect } from "react";
import api from "../api";
import Recipe from "../components/Recipe";
import "../styles/Home.css"

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [url, setUrls] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const res = await api.get("/api/recipes/");
      const data = res.data;
      setRecipes(data);
      console.log(data);
    } catch (err) {
      alert(err);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const res = await api.delete(`/api/recipes/delete/${id}/`);
      if (res.status === 204) {
        alert("Recipe deleted");
      } else {
        alert("Failed to delete recipe.");
      }
    } catch (err) {
      alert(err);
    }

    await getRecipes();
  };

  const createRecipe = async (e) => {
    e.preventDefault();
    try {
      console.log({ name, url });
      const res = await api.post("/api/recipes/", { name, url });
      if (res.status === 201) {
        alert("Recipe added");
      } else {
        alert("Failed to create recipe.");
      }
    } catch (err) {
      alert(err);
    }

    await getRecipes();
  };

  return (
    <div>
      <div>
        <h2>Recipes</h2>
        {recipes.map((recipe) => (
          <Recipe recipe={recipe} onDelete={deleteRecipe} key={recipe.id} />
        ))}
      </div>
      <h2>Add a New Recipe</h2>
      <form onSubmit={createRecipe}>
        <label htmlFor="name">Recipe Name:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label htmlFor="url">Recipe URL:</label>
        <br />
        <textarea
          id="url"
          name="url"
          required
          value={url}
          onChange={(e) => setUrls(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;
