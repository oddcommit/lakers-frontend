import { renderHook, waitFor } from "@testing-library/react";
import { useCityOptions } from "../useCityOptions";

describe("useCityOptions", () => {
  it("市区町村が取得できること", async () => {
    const { result } = renderHook(() => useCityOptions());

    // 取得前は空配列であること
    expect(result.current.cityParams).toEqual([]);

    await waitFor(() => {
      // 市区町村が1件以上取得できること
      expect(result.current.cityParams.length).toBeGreaterThan(0);
    });

    // 市区町村が{ label, value }の形式で保持されていること
    expect(result.current.cityParams[0]).toStrictEqual({
      id: 655,
      name: "千代田区",
      cityCode: "13101",
      prefCode: "13",
    });
    expect(result.current.cityParams[1]).toStrictEqual({
      id: 656,
      name: "中央区",
      cityCode: "13102",
      prefCode: "13",
    });
    expect(
      result.current.cityParams[result.current.cityParams.length - 1]
    ).toStrictEqual({
      id: 9999,
      name: "不明",
      cityCode: "99999",
      prefCode: "99999",
    });
  });
});
