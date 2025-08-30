import "@testing-library/jest-dom";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

// Define the mock handlers for your API requests
export const handlers = [
  http.get("https://api.example.com/recipe", () => {
    return HttpResponse.json({
      id: "abc-123",
      title: "Pasta",
      description: "Italian pasta with tomato sauce",
    });
  }),
];

// Setup the MSW server
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
