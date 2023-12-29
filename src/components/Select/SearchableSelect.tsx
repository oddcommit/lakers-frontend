import { useMemo, useState } from "react";
import {
  FormControl,
  Select as MuiSelect,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment,
  type SelectChangeEvent,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { type ISelectObject } from "../../types/select";
import { SizingWrapper, type ISizingWrapperProps } from "../Wrapper";

interface IProps extends ISizingWrapperProps {
  label: string;
  options: ISelectObject[];
  onChange: (value: string) => void;
  isClearable?: boolean;
}

const containsText = (text: string, searchText: string): boolean =>
  text.toLowerCase().includes(searchText.toLowerCase());

const SearchableSelect: React.FC<IProps> = (props) => {
  // HACK: TextFieldにFocusがかかるようにする(autoFocusつけたり色々試したができなかった)
  // HACK: 何か選択済みで検索をかけるとwarningが表示される
  //       material-uiが選択済みの状態でoptionがfilterされるのを考慮していないため

  const { label, options, onChange, isClearable = true, size } = props;
  const [displayValue, setDisplayValue] = useState("");
  const [searchText, setSearchText] = useState("");

  const displayedOptions = useMemo(
    () => options.filter((option) => containsText(option.label, searchText)),
    [searchText, options]
  );

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
        <InputLabel id="searchable-select-label">{label}</InputLabel>
        <MuiSelect
          id="searchable-select-id"
          labelId="searchable-select-label"
          label={label}
          onChange={handleChange}
          onClose={() => {
            setSearchText("");
          }}
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
          <ListSubheader>
            <TextField
              fullWidth
              size="small"
              placeholder="検索"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  // Prevents autoselecting item while typing (default Select behaviour)
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>

          {displayedOptions.map((option, index) => (
            <MenuItem key={index} value={JSON.stringify(option)}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </SizingWrapper>
  );
};

export { SearchableSelect };
