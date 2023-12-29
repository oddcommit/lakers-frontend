export const initMocks = async (): Promise<void> => {
  if (process.env.NODE_ENV === "development") {
    if (process.env.VITE_ENABLE_MOCK_SERVER === "true") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { worker } = await import("./browser");
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      worker.start();
    }
  }
};
