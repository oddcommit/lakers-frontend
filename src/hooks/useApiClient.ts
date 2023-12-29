import applyCaseMiddleware from "axios-case-converter"; // TODO: かなりニッチなライブラリのため、自前で実装するか他のライブラリを探す
import axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
} from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { type IJwtResponse } from "../types/jwt";
import { type ICookiesType } from "../types/cookies";
import { baseURL } from "../configs";

interface IUseApiClientReturnType {
  apiClient: AxiosInstance;
}

const useApiClient = (): IUseApiClientReturnType => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(); // eslint-disable-line
  const typedCookies = cookies as ICookiesType;

  const apiClient: AxiosInstance = applyCaseMiddleware(
    axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${typedCookies.accesstoken}`,
      },
    })
  );

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      // API通信時にトークン切れになった場合、トークンを更新する
      if (error.response?.config != null && error.response.status === 401) {
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
            setCookie("isLogin", "false");
            navigate("/login");
          });
      }
      return await Promise.reject(error);
    }
  );

  return { apiClient };
};

export { useApiClient };
