import { useState } from "react";
import {
  FormControl,
  Select as MuiSelect,
  MenuItem,
  InputLabel,
  type SelectChangeEvent,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { type ISelectObject } from "../../types/select";
import { SizingWrapper, type ISizingWrapperProps } from "../Wrapper";

interface IProps extends ISizingWrapperProps {
  label: string;
  options: ISelectObject[];
  onChange: (value: string) => void;
  isClearable?: boolean;
}

const Select: React.FC<IProps> = (props) => {
  const { label, options, onChange, isClearable = true, size } = props;
  const [displayValue, setDisplayValue] = useState("");

  const handleChange = (event: SelectChangeEvent<string>): void => {
    const selectedObject = JSON.parse(event.target.value) as ISelectObject;
    onChange(selectedObject.value);
    setDisplayValue(selectedObject.label);
  };

  const handleClearClick = (): void => {
    onChange("");
    setDisplayValue("");
  };

  return (
    <SizingWrapper size={size}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <MuiSelect
          id="select-id"
          labelId="select-label"
          label={label}
          onChange={handleChange}
          defaultValue=""
          renderValue={() => displayValue}
          endAdornment={
            isClearable ? (
              <IconButton
                sx={{
                  display: displayValue === "" ? "none" : "inline-flex",
                  marginRight: "10px",
                }}
                onClick={handleClearClick}
              >
                <ClearIcon />
              </IconButton>
            ) : (
              <></>
            )
          }
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={JSON.stringify(option)}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </SizingWrapper>
  );
};

export { Select };
