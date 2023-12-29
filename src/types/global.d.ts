declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly VITE_BASE_URL?: string;
    readonly VITE_ENABLE_MOCK_SERVER?: string;
  }
}
