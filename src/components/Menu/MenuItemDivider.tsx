import { Box } from "@mui/material";

const MenuItemDivider: React.FC = () => {
  return (
    <Box
      sx={{
        my: 1,
        borderTop: "max(1px, 0.0625rem) solid #d0d7de",
      }}
    />
  );
};

export { MenuItemDivider };
