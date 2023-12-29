import { Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}
export const PageTitle: React.FC<Props> = ({ children }) => {
  return (
    <Typography
      sx={{
        fontSize: "24px",
        fontWeight: "700",
      }}
    >
      {children}
    </Typography>
  );
};
