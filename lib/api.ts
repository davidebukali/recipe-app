const createURL = (path: string) => {
  return window.location.origin + path;
};

export const getBusinesses = async (tableName: string, page = 1) => {
  const res = await fetch(
    new Request(createURL("/api/db"), {
      method: "POST",
      body: JSON.stringify({ content: tableName, page }),
    })
  );

  if (res.ok) {
    return await res.json();
  }
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
