import { Avatar, Box, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SizingWrapperStyle } from "../../components/Wrapper";
import { TextField, TextFieldPassword } from "../../components/TextField";
import { Button, ButtonVariantOption } from "../../components/Button";
import { type ILoginPresenterProps } from "./types";

const theme = createTheme();

const LoginPresenter: React.FC<ILoginPresenterProps> = (props) => {
  const { handleSubmit, setPassword, setEmail, password, email } = props;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 鍵アイコン */}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          {/* メールアドレス */}
          <Box sx={{ my: 1 }}>
            <TextField
              id="email"
              label="メールアドレス"
              value={email}
              onChange={setEmail}
              required={true}
              autoFocus={true}
              size={SizingWrapperStyle.LARGE}
            />
          </Box>

          {/* パスワード */}
          <Box sx={{ my: 1 }}>
            <TextFieldPassword
              id="password"
              label="パスワード"
              value={password}
              onChange={setPassword}
              size={SizingWrapperStyle.LARGE}
            />
          </Box>

          {/* ログインボタン */}
          <Box sx={{ my: 1 }}>
            <Button
              label="ログイン"
              onClick={() => {
                void handleSubmit();
              }}
              variant={ButtonVariantOption.Contained}
              size={SizingWrapperStyle.LARGE}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export { LoginPresenter };
