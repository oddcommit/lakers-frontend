import { Container } from "@mui/material";

interface Props {
  children: React.ReactNode;
}
export const PagePaper: React.FC<Props> = ({ children }) => {
  return (
    <Container maxWidth={false} disableGutters sx={{ p: 3 }}>
      {children}
    </Container>
  );
};
