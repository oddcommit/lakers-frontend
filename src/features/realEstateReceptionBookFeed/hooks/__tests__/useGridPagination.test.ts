import { act, renderHook } from "@testing-library/react";
import { useGridPagination } from "../useGridPagination";

describe("useGridPagination", () => {
  it("ページのデフォルト値が0であること", () => {
    const { result } = renderHook(() => useGridPagination());
    expect(result.current.page).toBe(0);
  });

  it("ページに表示する件数のデフォルト値が10であること", () => {
    const { result } = renderHook(() => useGridPagination());
    expect(result.current.pageSize).toBe(10);
  });

  it("ページを変更できること", () => {
    const { result } = renderHook(() => useGridPagination());
    // changePageに渡したページインデックスに1を足した値がページに設定されること
    act(() => {
      result.current.changePage(1);
    });
    expect(result.current.page).toBe(1);
  });

  it("ページに表示する件数を変更できること", () => {
    const { result } = renderHook(() => useGridPagination());
    act(() => {
      result.current.changePageSize(100);
    });
    expect(result.current.pageSize).toBe(100);
  });
});
