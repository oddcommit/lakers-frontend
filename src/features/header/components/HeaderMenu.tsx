import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useHeaderMenu } from "../hooks/useHeaderMenu";
import {
  MenuItem,
  IconButtonMenu,
  MenuItemDivider,
} from "../../../components/Menu";

export const HeaderMenu: React.FC = () => {
  const { isVisible, handleClickAccountInfo, handleManualInfo, handleClickLogout } =
    useHeaderMenu();

  if (!isVisible) return null;

  return (
    <IconButtonMenu icon={<ManageAccountsIcon sx={{ color: "#FFF" }} />}>
      <MenuItem onClick={handleClickAccountInfo}>アカウント情報</MenuItem>
      <MenuItemDivider />
      <MenuItem onClick={handleManualInfo}>マニュアル</MenuItem>
      <MenuItemDivider />
      <MenuItem onClick={handleClickLogout}>ログアウト</MenuItem>
    </IconButtonMenu>
  );
};
