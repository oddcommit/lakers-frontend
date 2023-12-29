import { type AxiosResponse } from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { type ICookiesType } from "../types/cookies";
import { type IJwtResponse } from "../types/jwt";
import { useApiClient } from "./useApiClient";

interface ReturnTypes {
  isLoggedIn: boolean;
  login: (email: string, password: string, userIp: string) => Promise<void>;
  logout: () => void;
}
export const useLogin = (): ReturnTypes => {
  const [cookies, setCookie, removeCookie] = useCookies(); // eslint-disable-line
  const typedCookies = cookies as ICookiesType;
  const navigate = useNavigate();
  const { apiClient } = useApiClient();

  const login = async (
    email: string,
    password: string,
    userIp: string,
  ): Promise<void> => {
    await apiClient
      .post("auth/jwt/create", {
        email,
        password,
        userIp,
      })
      .then((response: AxiosResponse<IJwtResponse>) => {
        setCookie("accesstoken", response.data.access);
        setCookie("refreshtoken", response.data.refresh);
        setCookie("isLogin", "true");
        navigate("/feed");
      })
      .catch(() => {
        toast.error("ログインに失敗しました");
      });
  };

  const logout = (): void => {
    removeCookie("accesstoken");
    removeCookie("refreshtoken");
    setCookie("isLogin", "false");
    navigate("/login");
  };

  return {
    isLoggedIn: typedCookies.isLogin === "true",
    login,
    logout,
  };
};
