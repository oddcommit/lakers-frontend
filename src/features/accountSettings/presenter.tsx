import { Box, FormHelperText, Link, Typography } from "@mui/material";
import { TextFieldPassword } from "../../components/TextField";
import { Button, ButtonVariantOption } from "../../components/Button";
import { SizingWrapperStyle } from "../../components/Wrapper";
import { Divider } from "../../components/Divider";
import { PagePaper, SectionPaper } from "../../components/Paper";
import { PageTitle, SectionTitle } from "../../components/Title";
import { Label } from "../../components/Label";
import { KeyboardArrowLeft } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";

interface IAccountSettingsPresenterProps {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
  currentPasswordErrors: string[];
  newPasswordErrors: string[];
  onChangeCurrentPassword: (value: string) => void;
  onChangeNewPassword: (value: string) => void;
  onChangeNewPasswordConfirmation: (value: string) => void;
  handleSubmit: () => Promise<void>;
}
export const AccountSettingsPresenter: React.FC<
  IAccountSettingsPresenterProps
> = ({
  currentPassword,
  newPassword,
  newPasswordConfirmation,
  currentPasswordErrors,
  newPasswordErrors,
  onChangeCurrentPassword,
  onChangeNewPassword,
  onChangeNewPasswordConfirmation,
  handleSubmit,
}) => {
  return (
    <PagePaper>
      <form>
        {/* ページタイトル */}
        <Box sx={{ display: "flex", mb: 3 }}>
          <PersonIcon sx={{ mr: 1 }} fontSize="large" />
          <PageTitle>アカウント情報</PageTitle>
        </Box>

        <SectionPaper>
          <SectionTitle>パスワードの変更</SectionTitle>
          <Divider />

          {/* パスワード変更 */}
          <Box sx={{ m: 2 }}>
            <Label>パスワード変更</Label>
            <Box sx={{ mb: 2 }}>
              <TextFieldPassword
                id="current_password"
                label="現在のパスワード"
                value={currentPassword}
                onChange={onChangeCurrentPassword}
              />
              {currentPasswordErrors.map((error, i) => (
                <FormHelperText key={i} error>
                  {error}
                </FormHelperText>
              ))}
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextFieldPassword
                id="new_password"
                label="新しいパスワード"
                value={newPassword}
                onChange={onChangeNewPassword}
              />
            </Box>

            <TextFieldPassword
              id="new_password_confirmation"
              label="新しいパスワード（確認）"
              value={newPasswordConfirmation}
              onChange={onChangeNewPasswordConfirmation}
            />
            {newPasswordErrors.map((error, i) => (
              <FormHelperText key={i} error>
                {error}
              </FormHelperText>
            ))}
          </Box>

          <Divider />

          {/* 保存ボタン */}
          <Box
            sx={{
              mr: 2,
              my: 3,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              label="保存"
              onClick={() => {
                void handleSubmit();
              }}
              variant={ButtonVariantOption.Contained}
              size={SizingWrapperStyle.SMALL}
            />
          </Box>
        </SectionPaper>

        {/* 戻る */}
        <Box sx={{ mt: 2 }}>
          <Link href="/feed" sx={{ display: "inline-block" }}>
            <Box sx={{ display: "flex" }}>
              <KeyboardArrowLeft />
              <Typography>不動産登記受付帳検索に戻る</Typography>
            </Box>
          </Link>
        </Box>
      </form>
    </PagePaper>
  );
};
