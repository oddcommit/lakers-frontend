const mockURL = `http://localhost:3000/`;
const localServerURL = `http://localhost:8000/api`;

const selectBaseURL = (): string => {
  if (process.env.NODE_ENV === "test") return "";
  if (process.env.VITE_BASE_URL !== undefined)
    return `${process.env.VITE_BASE_URL}/api`;

  return process.env.VITE_ENABLE_MOCK_SERVER === "true"
    ? mockURL
    : localServerURL;
};

const baseURL = selectBaseURL();

export { baseURL };
