import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useChangePasswordForm } from "../useChangePasswordForm";

describe("useChangePasswordForm", () => {
  it("パスワードが変更できること", async () => {
    const { result } = renderHook(() => useChangePasswordForm());

    act(() => {
      result.current.handleChangeCurrentPassword("trust1234"); // mockの固定値
      result.current.handleChangeNewPassword("hogehoge1234");
      result.current.handleChangeNewPasswordConfirmation("hogehoge1234");
    });

    // パスワードが変更できること
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(result.current.currentPasswordErrors).toEqual([]);
    expect(result.current.newPasswordErrors).toEqual([]);
  });

  it("現在のパスワードが8文字未満の場合、パスワードが変更できないこと", async () => {
    const { result } = renderHook(() => useChangePasswordForm());

    act(() => {
      result.current.handleChangeCurrentPassword("1234");
      result.current.handleChangeNewPassword("hogehoge1234");
      result.current.handleChangeNewPasswordConfirmation("hogehoge1234");
    });

    // パスワードが変更できないこと
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(result.current.currentPasswordErrors).toEqual([
      "パスワードは8文字以上で入力してください",
    ]);
    expect(result.current.newPasswordErrors).toEqual([]);
  });

  it("現在のパスワードが異常値の場合、パスワードが変更できないこと", async () => {
    const { result } = renderHook(() => useChangePasswordForm());

    act(() => {
      result.current.handleChangeCurrentPassword("12341234");
      result.current.handleChangeNewPassword("hogehoge1234");
      result.current.handleChangeNewPasswordConfirmation("hogehoge1234");
    });

    // パスワードが変更できないこと
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(result.current.currentPasswordErrors).toEqual([
      "現在のパスワードが間違っています",
    ]);
    expect(result.current.newPasswordErrors).toEqual([]);
  });

  it("新しいパスワードが異常値の場合、パスワードが変更できないこと", async () => {
    const { result } = renderHook(() => useChangePasswordForm());

    act(() => {
      result.current.handleChangeCurrentPassword("different1234"); // mockの固定値
      result.current.handleChangeNewPassword("1234");
      result.current.handleChangeNewPasswordConfirmation("5678");
    });

    // パスワードが変更できないこと
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(result.current.currentPasswordErrors).toEqual([]);
    expect(result.current.newPasswordErrors).toEqual([
      "パスワードは8文字以上で入力してください",
      "パスワードには数字以外も含めてください",
      "パスワードが一致しません",
    ]);
  });
});
