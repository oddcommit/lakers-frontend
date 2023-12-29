import { useState } from "react";
import { IconButton, Menu, type SxProps } from "@mui/material";

interface IProps {
  icon: JSX.Element;
  children: React.ReactNode;
  sx?: SxProps;
}

const IconButtonMenu: React.FC<IProps> = (props) => {
  const { children, icon, sx } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={isOpen ? "button-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={handleClick}
        sx={sx}
      >
        {icon}
      </IconButton>
      <Menu
        id="button-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div onClick={handleClose}>{children}</div>
      </Menu>
    </>
  );
};

export { IconButtonMenu };
