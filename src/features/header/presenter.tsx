import { Toolbar, AppBar, Box } from "@mui/material";
import { HeaderMenu } from "./components/HeaderMenu";
import logo from "../../assets/logo.svg";

const HeaderPresenter: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <img src={logo} alt="logo" height="32px" />
        </Box>
        <HeaderMenu />
      </Toolbar>
    </AppBar>
  );
};

export { HeaderPresenter };
