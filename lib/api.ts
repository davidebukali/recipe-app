const createURL = (path: string) => {
  return window.location.origin + path;
};

export const getRecipeInfo = async (id: string) => {
  const res = await fetch(
    new Request(createURL("/api/recipe-detail"), {
      method: "POST",
      body: JSON.stringify({ id }),
    })
  );

  const data = await res.json();

  return data;
};

export const searchRecipes = async (query: string) => {
  const res = await fetch(
    new Request(createURL("/api/recipe"), {
      method: "POST",
      body: JSON.stringify({ query }),
    })
  );

  return await res.json();
};
