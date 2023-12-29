interface ICookiesType {
  isLogin: "true" | "false" | "" | undefined;
  refreshtoken: string;
  accesstoken: string;
}

export type { ICookiesType };
