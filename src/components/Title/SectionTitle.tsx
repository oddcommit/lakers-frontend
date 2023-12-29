import { Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}
export const SectionTitle: React.FC<Props> = ({ children }) => {
  return (
    <Typography
      sx={{
        fontSize: "20px",
        px: 2,
        py: 3,
      }}
    >
      {children}
    </Typography>
  );
};
