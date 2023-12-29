import { renderHook, waitFor } from "@testing-library/react";
import { useGridFeed } from "../useGridFeed";

describe("useGridFeed", () => {
  const commonParams: Parameters<typeof useGridFeed>[0] = {
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
    page: 1,
    pageSize: 10,
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

  it("行データが取得できること", async () => {
    const { result } = renderHook(() => useGridFeed(commonParams));

    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.rows).toHaveLength(5000);
    expect(result.current.from).toBe(0);
  });
});
