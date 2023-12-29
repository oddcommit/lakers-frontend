import { TextField as MuiTextField, FormControl } from "@mui/material";
import { SizingWrapper, type ISizingWrapperProps } from "../Wrapper";

interface IProps extends ISizingWrapperProps {
  label: string;
  value: string;
}

const TextFieldReadOnly: React.FC<IProps> = (props) => {
  const { label, value, size } = props;

  return (
    <SizingWrapper size={size}>
      <FormControl fullWidth>
        <MuiTextField
          id="text-field-read-only"
          label={label}
          value={value}
          InputProps={{
            readOnly: true,
          }}
        />
      </FormControl>
    </SizingWrapper>
  );
};

export { TextFieldReadOnly };
