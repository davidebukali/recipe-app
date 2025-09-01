import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { id } = await request.json();

  const recipeResponse = await fetch(
    new Request(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=false&addWinePairing=true&addTasteData=false`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  );

  const recipes = await recipeResponse.json();

  return NextResponse.json({
    recipes,
  });
}
