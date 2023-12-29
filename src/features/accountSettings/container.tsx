import { useChangePasswordForm } from "./hooks/useChangePasswordForm";
import { AccountSettingsPresenter } from "./presenter";

export const AccountSettingsContainer: React.FC = () => {
  const {
    currentPassword,
    newPassword,
    newPasswordConfirmation,
    currentPasswordErrors,
    newPasswordErrors,
    handleChangeCurrentPassword,
    handleChangeNewPassword,
    handleChangeNewPasswordConfirmation,
    handleSubmit,
  } = useChangePasswordForm();

  return (
    <AccountSettingsPresenter
      currentPassword={currentPassword}
      newPassword={newPassword}
      newPasswordConfirmation={newPasswordConfirmation}
      currentPasswordErrors={currentPasswordErrors}
      newPasswordErrors={newPasswordErrors}
      onChangeCurrentPassword={handleChangeCurrentPassword}
      onChangeNewPassword={handleChangeNewPassword}
      onChangeNewPasswordConfirmation={handleChangeNewPasswordConfirmation}
      handleSubmit={handleSubmit}
    />
  );
};
