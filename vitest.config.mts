import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "happy-dom",
    setupFiles: ["./setupTests.ts"],
    globals: true,
    // Uncomment to enable browser testing
    // browser: {
    //   instances: [
    //     {
    //       browser: "chromium",
    //       launch: {},
    //       context: {},
    //     },
    //   ],
    // },
  },
});
