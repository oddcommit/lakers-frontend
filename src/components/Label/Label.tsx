import { Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}
export const Label: React.FC<Props> = ({ children }) => {
  return <Typography sx={{ fontWeight: "700", mb: 1 }}>{children}</Typography>;
};
