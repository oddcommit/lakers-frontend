import { Box, FormControl, FormGroup } from "@mui/material";
import { Label } from "../Label";

interface IProps {
  label: string;
  children: React.ReactNode;
}

const CheckboxGroup: React.FC<IProps> = (props) => {
  const { label, children } = props;

  return (
    <FormControl>
      <Label>{label}</Label>
      <Box sx={{ marginLeft: "4px" }}>
        <FormGroup>{children}</FormGroup>
      </Box>
    </FormControl>
  );
};

export { CheckboxGroup };
