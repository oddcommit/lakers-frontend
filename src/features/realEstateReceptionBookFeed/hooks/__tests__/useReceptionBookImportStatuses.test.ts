import { renderHook, waitFor } from "@testing-library/react";
import { useReceptionBookImportStatuses } from "../useReceptionBookImportStatuses";

describe("useReceptionBookImportStatuses", () => {
  it("県別受付帳取込状況が取得できること", async () => {
    const { result } = renderHook(() => useReceptionBookImportStatuses());

    // 取得前は空配列であること
    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current.length).toEqual(2);
    });
    expect(result.current[0]).toMatchObject({
      prefecturesName: "東京都",
      importDate: "2023-07-14",
      legalAffairsBureauRequestMonth: "2023-06"
    });
    expect(result.current[1]).toMatchObject({
      prefecturesName: "神奈川県",
      importDate: "2023-06-23",
      legalAffairsBureauRequestMonth: "2023-05"
    });
  });
});
