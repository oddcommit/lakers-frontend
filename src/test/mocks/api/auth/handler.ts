import { rest } from "msw";
interface IJwtCreateBody {
  email: string;
  password: string;
}

interface IChangePasswordBody {
  current_password: string;
  new_password: string;
  re_new_password: string;
}

export const handlers = [
  rest.post("auth/jwt/create", async (req, res, ctx) => {
    const params = req.body as IJwtCreateBody;
    const email = params.email;
    const password = params.password;

    if (email === "mock@trustart.co.jp" && password === "trust1234") {
      const result = {
        accesstoken: "accesstoken_abc",
        refreshtoken: "refreshtoken_123",
      };
      return await res(ctx.status(200), ctx.json(result));
    }

    return await res(ctx.status(401));
  }),
  rest.post("auth/jwt/refresh", async (req, res, ctx) => {
    const result = {
      accesstoken: "accesstoken_abc",
      refreshtoken: "refreshtoken_123",
    };
    return await res(ctx.status(200), ctx.json(result));
  }),
  rest.post("auth/jwt/verify", async (req, res, ctx) => {
    return await res(ctx.status(200));
  }),
  rest.post("auth/users/set_password/", async (req, res, ctx) => {
    const params = req.body as IChangePasswordBody;
    const currentPassword = params.current_password;
    const newPassword = params.new_password;
    const reNewPassword = params.re_new_password;

    if (currentPassword !== "trust1234") {
      return await res(
        ctx.status(400),
        ctx.json({
          current_password: ["現在のパスワードが間違っています"],
        })
      );
    }
    if (newPassword !== reNewPassword) {
      return await res(
        ctx.status(400),
        ctx.json({
          non_field_errors: ["パスワードが一致しません"],
        })
      );
    }

    return await res(ctx.status(204));
  }),
];
