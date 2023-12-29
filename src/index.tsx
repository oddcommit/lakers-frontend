import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { initMocks } from "./test/mocks";

// HACK: mockで起動時に初回のAPIがエラーになる
// top-level awaitにすることで解消するが、その場合npm run bulidに失敗する
// viteのビルドオプションを変えればこれも解決するが、動作するブラウザのバージョンが限定されてしまう
// eslint-disable-next-line @typescript-eslint/no-floating-promises
initMocks();

const rootElement = document.getElementById("root");
if (rootElement == null) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </BrowserRouter>
);
