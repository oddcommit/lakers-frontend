import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";

interface IProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<IProps> = (props) => {
  const { label, checked, onChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          sx={{
            padding: "0px 4px",
          }}
          checked={checked}
          onChange={handleChange}
          name={label}
        />
      }
      label={label}
    />
  );
};

export { Checkbox };
