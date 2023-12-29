import { useEffect } from "react";
import { type AxiosResponse, type AxiosError } from "axios";
import { SWRConfig } from "swr";
import { useCookies } from "react-cookie";
import {
  useNavigate,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./features/header";
import { RealEstateReceptionBookFeed } from "./features/realEstateReceptionBookFeed";
import { Login } from "./features/login";
import { type IJwtResponse } from "./types/jwt";
import { type ICookiesType } from "./types/cookies";
import { useApiClient } from "./hooks/useApiClient";
import { useLogin } from "./hooks/useLogin";
import { AccountSettings } from "./features/accountSettings";

const App: React.FC = () => {
  // ---
  // hooks群
  // ---
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  const typedCookies = cookies as ICookiesType;
  const location = useLocation();
  const navigate = useNavigate();
  const { apiClient } = useApiClient();
  const { isLoggedIn } = useLogin();

  // ---
  // useEffect群
  // ---
  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        if (cookies.accesstoken === undefined) {
          toast.warning("ログインしてください");
          setCookie("isLogin", "false");
          navigate("/login");
        } else {
          await verifyAccessToken();
        }
      } else if (location.pathname !== "/login") {
        // 未ログインでURL直打ちした場合ログイン画面に遷移する
        toast.warning("ログインしてください");
        setCookie("isLogin", "false");
        navigate("/login");
      }
    })();
  }, []);

  // ---
  // function群
  // ---
  const refreshToken = async (): Promise<void> => {
    await apiClient
      .post("auth/jwt/refresh", {
        refresh: typedCookies.refreshtoken,
      })
      .then((res: AxiosResponse<IJwtResponse>) => {
        setCookie("accesstoken", res.data.access);
        setCookie("refreshtoken", res.data.refresh);
      })
      .catch(() => {
        // リレッシュトークンが期限切れの場合はログイン画面に遷移
        toast.warning("ログインしてください");
        setCookie("isLogin", "false");
        navigate("/login");
      });
  };

  const verifyAccessToken = async (): Promise<void> => {
    await apiClient
      .post("auth/jwt/verify", {
        token: typedCookies.accesstoken,
      })
      .catch(async (err: AxiosError) => {
        if (err.response != null && err.response.status === 401) {
          // アクセストークンが期限切れの場合は
          // リフレッシュトークンを用いて新しいアクセストークンとリフレッシュトークンを取得する
          await refreshToken();
        }
      });
  };

  return (
    <SWRConfig
      value={{
        errorRetryCount: 1,
        onError: (error: AxiosError) => {
          if (error.response?.status !== 401)
            toast.error("予期しないエラーが発生しました");
        },
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={`/feed`} element={<RealEstateReceptionBookFeed />} />
        <Route path={`/account`} element={<AccountSettings />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </SWRConfig>
  );
};

export { App };
