import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { query } = await request.json();

  const recipeResponse = await fetch(
    new Request(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&query=${query}&number=10&addRecipeInformation=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.SB_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    )
  );

  const recipes = await recipeResponse.json();

  return NextResponse.json({
    recipes: recipes.results || [],
  });
}
