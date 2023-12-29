import { Button as MuiButton, FormControl } from "@mui/material";
import { SizingWrapper, type ISizingWrapperProps } from "../Wrapper";

enum VariantOption {
  Text = "text",
  Outlined = "outlined",
  Contained = "contained",
}

enum ColorOption {
  Inherit = "inherit",
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning",
}

interface IProps extends ISizingWrapperProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  variant: VariantOption;
  color?: ColorOption;
  fullWidth?: boolean;
}

const Button: React.FC<IProps> = (props) => {
  const { label, onClick, variant, color, fullWidth, size } = props;

  return (
    <SizingWrapper size={size}>
      <FormControl fullWidth>
        <MuiButton
          variant={variant}
          onClick={onClick}
          color={color}
          fullWidth={fullWidth}
        >
          {label}
        </MuiButton>
      </FormControl>
    </SizingWrapper>
  );
};

Button.defaultProps = {
  color: ColorOption.Primary,
  fullWidth: false,
};

export {
  Button,
  VariantOption as ButtonVariantOption,
  ColorOption as ButtonColorOption,
};
