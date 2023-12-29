import { useMemo } from "react";
import {
  Box,
  FormControl,
  Select as MuiSelect,
  MenuItem,
  InputLabel,
  type SelectChangeEvent,
  IconButton,
  Checkbox as MuiCheckbox,
  ListItemText,
  Chip,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { type ISelectObject } from "../../types/select";
import { SizingWrapper, type ISizingWrapperProps } from "../Wrapper";

interface IProps extends ISizingWrapperProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: ISelectObject[];
  isClearable?: boolean;
}

const MultiSelect: React.FC<IProps> = (props) => {
  const { label, options, value, onChange, isClearable = true, size} = props;
  const displayValueList = useMemo(
    () =>
      options
        .filter((item) => {
          return value.includes(item.value);
        })
        .map((item) => item.label),
    [value, options]
  );

  const handleChange = (event: SelectChangeEvent<string[]>): void => {
    const selected = event.target.value.slice(-1)[0];
    // undefinedの可能性を取り除く
    if (selected === undefined) return;

    // 文字列json → json
    const selectedObject = JSON.parse(selected) as ISelectObject;

    // 既に存在している場合はリストから外す、それ以外は追加
    const isExists = value.some((item) => item === selectedObject.value);
    if (isExists) {
      const filtered = value.filter((item) => item !== selectedObject.value);
      onChange(filtered);
    } else {
      onChange([...value, selectedObject.value]);
    }
  };

  const handleClearClick = (): void => {
    onChange([]);
  };

  return (
    <SizingWrapper size={size}>
      <FormControl fullWidth>
        <InputLabel id="multi-select-label">{label}</InputLabel>
        <MuiSelect
          id="multi-select-id"
          labelId="multi-select-label"
          label={label}
          onChange={handleChange}
          multiple
          value={displayValueList}
          defaultValue={[]}
          sx={{
            "#multi-select-id": {
              pr: 0,
            },
          }}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {selected.map((value) => (
                <Chip key={value} label={value} sx={{ cursor: "pointer" }} />
              ))}
            </Box>
          )}
          endAdornment={
            isClearable ? (
              <IconButton
                sx={{
                  display:
                    displayValueList.length === 0 ? "none" : "inline-flex",
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
              <MuiCheckbox
                checked={value.some((item) => item === option.value)}
              />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </SizingWrapper>
  );
};

export { MultiSelect };
