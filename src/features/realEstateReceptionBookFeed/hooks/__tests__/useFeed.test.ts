import { act, renderHook, waitFor } from "@testing-library/react";
import { type IUseFeedParams, useFeed } from "../useFeed";

describe("useFeed", () => {
  const commonParams: IUseFeedParams = {
    size: 100,
    legalAffairsBureauRequestDateStart: new Date("2022-01-01"),
    legalAffairsBureauRequestDateEnd: new Date("2023-03-31"),
    realEstateBookTypeTandoku: false,
    realEstateBookTypeRensakiRenzoku: false,
    realEstateTypeTochi: false,
    realEstateTypeKutate: false,
    realEstateTypeTatemono: false,
    realEstateTypeKyotan: false,
    cities: [],
    prefectures: [],
    receptionReasons: [],
    sotoRange: {
      min: 0,
      max: 0,
    },
    estimateAcreageRange: {
      min: 0,
      max: 0,
    },
    estimateLandPriceRange: {
      min: 0,
      max: 0,
    },
    approximateEstimatePriceRange: {
      min: 0,
      max: 0,
    },
    residenceOptions: {
      ittei: false,
      icchuko: false,
      ichiju: false,
      nitei: false,
      nichuko: false,
      niju: false,
      denju: false,
      junju: false,
    },
    commercialOptions: {
      kinsyo: false,
      syogyo: false,
    },
    industryOptions: {
      junko: false,
      kogyo: false,
      kosen: false,
    },
    yosekiRatioRange: {
      min: 0,
      max: 0,
    },
    kenpeiRatioRange: {
      min: 0,
      max: 0,
    },
  };

  it("指定したサイズで取得できること", async () => {
    const { result: hundredSizeFeed, unmount } = renderHook(() =>
      useFeed(commonParams)
    );

    const { result: thousandSizeFeed } = renderHook(() =>
      useFeed({
        ...commonParams,
        size: 1000,
      })
    );

    await waitFor(() => {
      expect(hundredSizeFeed.current.feed).not.toBeUndefined();
      expect(hundredSizeFeed.current.feed).not.toBeUndefined();
    });

    // それぞれのサイズで取得できていること
    expect(hundredSizeFeed.current.feed?.list).toHaveLength(100);
    expect(thousandSizeFeed.current.feed?.list).toHaveLength(1000);
    // 全件数は同じであること
    expect(hundredSizeFeed.current.feed?.count).toBe(
      thousandSizeFeed.current.feed?.count
    );

    unmount();
  });

  it("取得直後にprev関数を叩いてもfromの値が変わらないこと", async () => {
    const { result, unmount } = renderHook(() => useFeed(commonParams));

    await waitFor(() => {
      expect(result.current.from).toBe(0);
    });

    act(() => {
      result.current.prev();
    });

    expect(result.current.from).toBe(0);

    unmount();
  });

  it("next関数を実行すると、fromの値がsize分変わること", async () => {
    const { result, unmount } = renderHook(() => useFeed(commonParams));

    await waitFor(() => {
      expect(result.current.from).toBe(0);
    });

    act(() => {
      result.current.next();
    });

    expect(result.current.from).toBe(100);

    unmount();
  });

  it("next関数実行後prev関数を実行すると、fromの値がsize分戻ること", async () => {
    const { result, unmount } = renderHook(() => useFeed(commonParams));

    await waitFor(() => {
      expect(result.current.from).toBe(0);
    });

    act(() => {
      result.current.next();
    });

    expect(result.current.from).toBe(100);

    act(() => {
      result.current.prev();
    });

    expect(result.current.from).toBe(0);

    unmount();
  });
});
