import { rest } from "msw";
import { cityOptions, receptionReasonOptions } from "./response";

export const handlers = [
  rest.get("/option/city", async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json({ list: cityOptions }));
  }),
  rest.get("/option/reception-reason", async (req, res, ctx) => {
    return await res(
      ctx.status(200),
      ctx.json({ list: receptionReasonOptions })
    );
  }),
];
