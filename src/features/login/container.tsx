import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { LoginPresenter } from "./presenter";

const LoginContainer: React.FC = () => {
  // ---
  // hooks群
  // ---
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { isLoggedIn, login } = useLogin();
  const [userIp, setIp] = useState<string>("");

  // ---
  // useEffect群
  // ---
  const getIp = async (): Promise<void> => {
    // 外部APIが機能しないときはundefindとして返す
    try{
      const response = await fetch("https://api.ipify.org/?format=json");
      const data = await response.json() as Record<string, string>;
      setIp(data.ip);
    }catch(e){
      setIp("undefined");
    }
  }

  useEffect(() => {
    // IPアドレスを取得
     (async() => {
      await getIp()
     })()
    // ログイン済みの場合は一覧画面に遷移させる
    if (isLoggedIn) {
      navigate("/feed");
    }
  }, [isLoggedIn]);

  // ---
  // function群
  // ---
  const handleSubmit = async (): Promise<void> => {
    await login(email, password, userIp);
  };

  return (
    <LoginPresenter
      handleSubmit={handleSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
      email={email}
      password={password}
    />
  );
};

export { LoginContainer };
