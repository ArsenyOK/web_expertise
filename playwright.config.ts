import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  reporter: "list",
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:4173",
    viewport: {
      width: 1440,
      height: 900,
    },
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
    timeout: 120_000,
    env: {
      VITE_WEB3FORMS_ACCESS_KEY: "playwright-test-key",
    },
  },
});
