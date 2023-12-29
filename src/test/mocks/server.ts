import { setupServer } from "msw/node";
import { handlers as realEstateBookHandlers } from "./api/realEstateBook/handler";
import { handlers as authHandlers } from "./api/auth/handler";
import { handlers as optionHandlers } from "./api/option/handler";

export const server = setupServer(
  ...realEstateBookHandlers,
  ...authHandlers,
  ...optionHandlers
);
