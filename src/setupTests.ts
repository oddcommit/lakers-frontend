import { configure } from "@testing-library/react";
import { server } from "./test/mocks/server";

const navigateMock = jest.fn();
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigateMock,
}));

// デフォルトのtimeout1秒だとgithub actionsでテストが失敗するため、timeoutを5秒に設定
configure({ asyncUtilTimeout: 5000 });

beforeAll(() => {
  server.listen({
    onUnhandledRequest: (req) => {
      console.error(`UnhandledRequest: ${req.url.href}`);
    },
  });
});
beforeEach(() => {
  navigateMock.mockReset();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
