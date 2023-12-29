import { MenuItem as MuiMenuItem, type MenuItemProps } from "@mui/material";

interface IProps extends MenuItemProps {
  children: React.ReactNode;
}

const MenuItem: React.FC<IProps> = (props) => {
  const { children, sx, ...otherProps } = props;

  return (
    <MuiMenuItem sx={{ px: 2, py: 0, ...sx }} {...otherProps}>
      {children}
    </MuiMenuItem>
  );
};

export { MenuItem };
