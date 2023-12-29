import { TextField as MuiTextField, FormControl } from "@mui/material";
import { SizingWrapper, type ISizingWrapperProps } from "../Wrapper";

interface IProps extends ISizingWrapperProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoFocus?: boolean;
  type?: React.InputHTMLAttributes<unknown>["type"];
}

const TextField: React.FC<IProps> = (props) => {
  const { label, value, onChange, required, autoFocus, type, id, size } = props;

  return (
    <SizingWrapper size={size}>
      <FormControl fullWidth>
        <MuiTextField
          id={id}
          label={label}
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value);
          }}
          required={required}
          autoFocus={autoFocus}
          type={type}
        />
      </FormControl>
    </SizingWrapper>
  );
};

TextField.defaultProps = {
  required: false,
  autoFocus: false,
  type: undefined,
};

export { TextField };
