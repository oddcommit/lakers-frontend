import { useApiClient } from "../../../hooks/useApiClient";
import useSWR from "swr";
import {
  type IRealEstateReceptionBookDataGridRow,
  type IRealEstateReceptionBookResponse,
} from "../types";
import { format, isValid } from "date-fns";
import { useState } from "react";
import { camelToSnake } from "../../../utils/utils";

// custom hookの引数の型
export interface IUseFeedParams {
  size: number;
  legalAffairsBureauRequestDateStart: Date | null;
  legalAffairsBureauRequestDateEnd: Date | null;
  realEstateBookTypeTandoku: boolean;
  realEstateBookTypeRensakiRenzoku: boolean;
  realEstateTypeTochi: boolean;
  realEstateTypeKutate: boolean;
  realEstateTypeTatemono: boolean;
  realEstateTypeKyotan: boolean;
  cities: string[];
  prefectures: string[];
  receptionReasons: string[];
  sotoRange: Record<string, number>;
  estimateAcreageRange: Record<string, number>;
  estimateLandPriceRange: Record<string, number>;
  approximateEstimatePriceRange: Record<string, number>;
  residenceOptions: Record<string, boolean>;
  commercialOptions: Record<string, boolean>;
  industryOptions: Record<string, boolean>;
  yosekiRatioRange: Record<string, number>;
  kenpeiRatioRange: Record<string, number>;
}

// fetcherの引数の型
interface IFetchParams {
  legalAffairsBureauRequestDateStart: string | null;
  legalAffairsBureauRequestDateEnd: string | null;
  realEstateBookTypeTandoku: boolean;
  realEstateBookTypeRensakiRenzoku: boolean;
  realEstateTypeTochi: boolean;
  realEstateTypeKutate: boolean;
  realEstateTypeTatemono: boolean;
  realEstateTypeKyotan: boolean;
  cities: string[];
  prefectures: string[];
  receptionReasons: string[];
  size: number;
  fromCount: number;
  sortBy: string | undefined;
  order: string | undefined;
  sotoRange: Record<string, number>;
  estimateAcreageRange: Record<string, number>;
  estimateLandPriceRange: Record<string, number>;
  approximateEstimatePriceRange: Record<string, number>;
  residenceOptions: Record<string, boolean>;
  commercialOptions: Record<string, boolean>;
  industryOptions: Record<string, boolean>;
  yosekiRatioRange: Record<string, number>;
  kenpeiRatioRange: Record<string, number>;
}

// custom hookの戻り値の型
interface IUseFeedReturnType {
  feed: IRealEstateReceptionBookResponse | undefined;
  allCount: number;
  from: number;
  prev: () => void;
  next: () => void;
  sort: (condition: ISortCondition | undefined) => void;
}

interface ISortCondition {
  sortBy: keyof Omit<IRealEstateReceptionBookDataGridRow, "id">;
  order: "asc" | "desc";
}

// 不動産受付帳の一覧を取得するcustom hook
export const useFeed = (body: IUseFeedParams): IUseFeedReturnType => {
  const { apiClient } = useApiClient();
  // 何件目から取得するか。SQLでいうところのoffset
  const [from, setFrom] = useState<number>(0);
  // ソート条件
  const [sortCondition, setSortCondition] = useState<
    ISortCondition | undefined
  >();

  // swrに引き渡すfetcher
  const fetcher = async (
    args: [string, IFetchParams]
  ): Promise<IRealEstateReceptionBookResponse> => {
    const [url, body] = args;
    const { data } = await apiClient.post<IRealEstateReceptionBookResponse>(
      url,
      { body }
    );
    return data;
  };

  const { data } = useSWR<IRealEstateReceptionBookResponse>(
    ["/real-estate-book/feed", toFetchParams(body, from, sortCondition)],
    fetcher
  );

  const prev = (): void => {
    if (from === 0) return;
    setFrom(from - body.size);
  };

  const next = (): void => {
    if (data === undefined) return;

    const { size } = body;
    const { count } = data;
    if (from + size >= count) return;
    setFrom(from + size);
  };

  const sort = (params: ISortCondition | undefined): void => {
    setSortCondition(params);
  };

  return {
    feed: data,
    allCount: data?.count ?? 0,
    from,
    prev,
    next,
    sort,
  };
};

// Date型をyyyy-MM-ddの文字列に変換する関数
const dateToString = (date: Date | null): string | null => {
  if (date === null || !isValid(date)) return null;
  return format(date, "yyyy-MM-dd");
};

const convertToSnakeCase = (value: string | undefined): string | undefined => {
  if (value === undefined) return undefined;
  return camelToSnake(value);
};

// custom hookの引数の型をfetcherの引数の型に変換する関数
const toFetchParams = (
  params: IUseFeedParams,
  from: number,
  sortCondition: ISortCondition | undefined
): IFetchParams => {
  const {
    legalAffairsBureauRequestDateStart,
    legalAffairsBureauRequestDateEnd,
    cities,
    prefectures,
    receptionReasons,
    size,
  } = params;

  return {
    ...params,
    sortBy: convertToSnakeCase(sortCondition?.sortBy),
    order: sortCondition?.order,
    legalAffairsBureauRequestDateStart: dateToString(
      legalAffairsBureauRequestDateStart
    ),
    legalAffairsBureauRequestDateEnd: dateToString(
      legalAffairsBureauRequestDateEnd
    ),
    cities,
    prefectures,
    receptionReasons,
    // fromが大きく動かない前提のため、一度に取得する件数のみを増減させる
    // ex.) 5001件以降取得する場合は0〜10000件の取得となるが、そもそも5001件以降開くことをあまり想定しない
    size: from + size,
    fromCount: 0,
  };
};
