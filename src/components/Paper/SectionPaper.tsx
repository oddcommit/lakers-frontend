import { Container } from "@mui/material";

interface Props {
  children: React.ReactNode;
}
export const SectionPaper: React.FC<Props> = ({ children }) => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #E0E0E0",
        boxShadow:
          "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12)",
        borderRadius: "4px",
      }}
    >
      {children}
    </Container>
  );
};
