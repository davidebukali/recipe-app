"use client";

import { RecipeCard } from "@/components/card";
import { InputButton } from "@/components/input-button";
import { searchRecipes } from "@/lib/api";
import React from "react";

export default function Recipes() {
  const [recipes, setRecipes] = React.useState([]);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    searchRecipes(query).then((data) => {
      console.log("Recipes found:", data);
      setRecipes(data.recipes);
    });
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Recipes</h1>
          <p className="text-muted-foreground mt-2">
            Discover delicious recipes to inspire your next meal!
          </p>
        </div>
        <div className="flex justify-center m-4">
          <InputButton title="Search" handleSubmit={handleSearch} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {recipes.map((recipe: any) => (
          <div key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex justify-center m-4">
          {recipes.length === 0 && (
            <div>
              <p className="text-center">
                No recipes found. Try searching for something!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
