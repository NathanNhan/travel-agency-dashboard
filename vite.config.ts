import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";


const sentryConfig: SentryReactRouterBuildOptions = {
  org: "js-mastery-04",
  project: "javascript-react",
  // An auth token is required for uploading source maps;
  // store it in an environment variable to keep it secure.
  authToken: "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",
  // ...
};




export default defineConfig(config => {
  return {
  plugins: [tailwindcss(), tsconfigPaths(), reactRouter(),sentryReactRouter(sentryConfig, config)],
  sentryConfig,
  ssr: {
    noExternal: [/@syncfusion/]
  }
  };
});