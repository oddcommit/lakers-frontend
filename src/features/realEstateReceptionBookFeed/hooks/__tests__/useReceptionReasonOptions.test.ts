import { renderHook, waitFor } from "@testing-library/react";
import { useReceptionReasonOptions } from "../useReceptionReasonOptions";

describe("useReceptionReasonOptions.test", () => {
  it("登記原因が取得できること", async () => {
    const { result } = renderHook(() => useReceptionReasonOptions());

    // 取得前は空配列であること
    expect(result.current.receptionReasonOptions).toEqual([]);

    await waitFor(() => {
      // 登記原因が1件以上取得できること
      expect(result.current.receptionReasonOptions.length).toBeGreaterThan(0);
    });

    // 登記原因が{ label, value }の形式で保持されていること
    expect(result.current.receptionReasonOptions[0]).toStrictEqual({
      value: "1",
      label: "所有権移転相続・法人合併",
    });
    expect(result.current.receptionReasonOptions[1]).toStrictEqual({
      value: "2",
      label: "所有権移転遺贈・贈与その他無償名義",
    });
    expect(
      result.current.receptionReasonOptions[
        result.current.receptionReasonOptions.length - 1
      ]
    ).toStrictEqual({
      value: "999",
      label: "その他",
    });
  });
});
