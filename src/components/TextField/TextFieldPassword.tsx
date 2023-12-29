import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  type OutlinedInputProps,
} from "@mui/material";
import { useState } from "react";
import { SizingWrapper, type ISizingWrapperProps } from "../Wrapper";

type OmitKeys =
  | "id"
  | "type"
  | "label"
  | "value"
  | "endAdornment"
  | "size"
  | "onChange";

interface IProps
  extends ISizingWrapperProps,
    Omit<OutlinedInputProps, OmitKeys> {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TextFieldPassword: React.FC<IProps> = (props) => {
  const {
    id,
    label,
    value,
    onChange,
    size,
    required = true,
    ...otherProps
  } = props;

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const toggleVisibilityPassword = (): void => {
    setIsVisiblePassword((isVisible) => !isVisible);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // 全角文字がある場合の処理
    if (!event.target.value.match("^[0-9A-Za-z]+$")) {
      event.target.value = event.target.value.replace(/[^0-9a-z]/gi, "");
    }
    onChange(event.target.value);
  };

  return (
    <SizingWrapper size={size}>
      <FormControl
        fullWidth
        required={required}
        sx={{
          // 入力済みの際にアイコンが浮かないように
          background: value && "#E9F0FD",
        }}
      >
        <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>

        <OutlinedInput
          id={id}
          type={isVisiblePassword ? "text" : "password"}
          label={label}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleVisibilityPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {isVisiblePassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          {...otherProps}
        />
      </FormControl>
    </SizingWrapper>
  );
};

export { TextFieldPassword };
