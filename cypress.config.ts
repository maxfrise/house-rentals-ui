import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents: (on, config) => {
      const isDev = config.watchForFileChanges;
      const port = process.env.PORT ?? (isDev ? "3000" : "8811");
      const configOverrides: Partial<Cypress.PluginConfigOptions> = {
        baseUrl: `http://localhost:${port}`,
        video: !process.env.CI,
        screenshotOnRunFailure: !process.env.CI,
      };

      // To use this:
      // cy.task('log', whateverYouWantInTheTerminal)
      on("task", {
        log: (message) => {
          console.log(message);

          return null;
        },
      });

      return { ...config, ...configOverrides };
    },
    retries: {
      runMode: 2,
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: {
        build: {
          sourcemap: "inline",
        },
        esbuild: {
          jsx: "transform",
        },
        define: {
          "process.env.DEBUG_PRINT_LIMIT": 10000,
        },
        logLevel: "error",
      },
    },
    specPattern: "./cypress/components/**/*.spec.tsx",
    supportFile: "./cypress/support/component.ts",
    excludeSpecPattern: "**/node_modules/**",
  },
});
