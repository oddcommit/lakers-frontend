import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../hooks/useLogin";

interface ReturnTypes {
  isVisible: boolean;
  handleClickAccountInfo: () => void;
  handleManualInfo: () => void;
  handleClickLogout: () => void;
}
export const useHeaderMenu = (): ReturnTypes => {
  const { isLoggedIn, logout } = useLogin();
  const navigate = useNavigate();

  const handleClickAccountInfo = (): void => {
    navigate("/account");
  };

  const handleManualInfo = (): void => {
    window.open("https://trustart.notion.site/a11d52b037224591a30999b2a672e14b?pvs=4")
  };

  const handleClickLogout = (): void => {
    logout();
  };

  return {
    isVisible: isLoggedIn,
    handleClickAccountInfo,
    handleManualInfo,
    handleClickLogout,
  };
};
