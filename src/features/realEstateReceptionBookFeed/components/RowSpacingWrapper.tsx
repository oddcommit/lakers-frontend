import { Box } from "@mui/material";

interface IProps {
  children: React.ReactNode;
}

const RowSpacingWrapper: React.FC<IProps> = (props) => {
  const { children } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "wrap",
        "& > div:not(:last-of-type)": {
          mr: 1,
        },
      }}
    >
      {children}
    </Box>
  );
};

export { RowSpacingWrapper };
