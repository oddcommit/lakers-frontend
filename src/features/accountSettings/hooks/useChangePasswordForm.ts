import { useState } from "react";
import { useApiClient } from "../../../hooks/useApiClient";
import { toast } from "react-toastify";
import { isAxiosError, type AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
  currentPasswordErrors: string[];
  newPasswordErrors: string[];
  handleChangeCurrentPassword: (value: string) => void;
  handleChangeNewPassword: (value: string) => void;
  handleChangeNewPasswordConfirmation: (value: string) => void;
  handleSubmit: () => Promise<void>;
}

interface ChangePasswordFormResponse {
  currentPassword: string[];
  newPassword: string[];
  reNewPassword: string[];
  nonFieldErrors: string[];
}

export const useChangePasswordForm = (): ChangePasswordForm => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>("");
  const [currentPasswordErrors, setCurrentPasswordErrors] = useState<string[]>(
    []
  );
  const [newPasswordErrors, setNewPasswordErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { apiClient } = useApiClient();

  // Stateを初期化する
  const resetState = (): void => {
    setCurrentPassword("");
    setNewPassword("");
    setNewPasswordConfirmation("");
    setCurrentPasswordErrors([]);
    setNewPasswordErrors([]);
  };

  // すべての文字が数字かどうかを判定する
  const isAllNumber = (value: string): boolean => {
    const regex = /^[0-9０-９]+$/;
    return regex.test(value);
  };

  const currentPasswordValidate = (): boolean => {
    const errors = [];
    if (currentPassword.length < 8) {
      errors.push("パスワードは8文字以上で入力してください");
    }

    setCurrentPasswordErrors(errors);
    return errors.length === 0;
  };

  const newPasswordValidate = (): boolean => {
    const errors = [];
    if (newPassword.length < 8) {
      errors.push("パスワードは8文字以上で入力してください");
    }
    if (isAllNumber(newPassword)) {
      errors.push("パスワードには数字以外も含めてください");
    }
    if (newPassword !== newPasswordConfirmation) {
      errors.push("パスワードが一致しません");
    }

    setNewPasswordErrors(errors);
    return errors.length === 0;
  };

  const validate = (): boolean => {
    const currentPasswordValid = currentPasswordValidate();
    const newPasswordValid = newPasswordValidate();
    return currentPasswordValid && newPasswordValid;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validate()) return;
    try {
      const response = await apiClient.post<
        AxiosResponse<ChangePasswordFormResponse>
      >("auth/users/set_password/", {
        currentPassword,
        newPassword,
        reNewPassword: newPasswordConfirmation,
      });

      // 204以外のステータスコードが返ってきた場合、想定外のためエラーを投げる
      if (response.status !== 204) {
        throw new Error();
      }

      resetState();
      toast.success("パスワードを変更しました");
      navigate("/feed");
    } catch (error) {
      if (!isAxiosError<ChangePasswordFormResponse>(error)) {
        toast.error("パスワードの変更に失敗しました");
        return;
      }
      if (error.response?.status === 400) {
        const data = error.response?.data;
        setCurrentPasswordErrors(data.currentPassword || []);
        setNewPasswordErrors(data.newPassword || data.nonFieldErrors || []);
      }
      // 想定外のステータスコードの場合、エラーメッセージを表示する
      else {
        toast.error("パスワードの変更に失敗しました");
      }
    }
  };

  return {
    currentPassword,
    newPassword,
    newPasswordConfirmation,
    currentPasswordErrors,
    newPasswordErrors,
    handleChangeCurrentPassword: setCurrentPassword,
    handleChangeNewPassword: setNewPassword,
    handleChangeNewPasswordConfirmation: setNewPasswordConfirmation,
    handleSubmit,
  };
};
