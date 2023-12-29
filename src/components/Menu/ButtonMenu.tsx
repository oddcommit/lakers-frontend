import { useState } from "react";
import { Button as MuiButton, Menu } from "@mui/material";

enum ColorOption {
  Inherit = "inherit",
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning",
}

interface IProps {
  label: string;
  children: React.ReactNode;
  buttonColor?: ColorOption;
}

const ButtonMenu: React.FC<IProps> = (props) => {
  const { label, children, buttonColor } = props;
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
      <MuiButton
        id="basic-button"
        aria-controls={isOpen ? "button-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={handleClick}
        color={buttonColor}
      >
        {label}
      </MuiButton>
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

ButtonMenu.defaultProps = {
  buttonColor: ColorOption.Inherit,
};

export { ButtonMenu };
