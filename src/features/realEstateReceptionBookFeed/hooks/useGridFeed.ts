import { type GridSortDirection, type GridSortModel } from "@mui/x-data-grid";
import { format, parse } from "date-fns";
import { ja } from "date-fns/locale";
import { useEffect } from "react";
import {
  type IRealEstateReceptionBookResponse,
  type IRealEstateReceptionBookDataGridRow,
} from "../types";
import { type IUseFeedParams, useFeed } from "./useFeed";

interface IUseFeedGridParams extends Omit<IUseFeedParams, "size"> {
  page: number;
  pageSize: number;
}

interface IUseFeedGridReturnType {
  rows: IRealEstateReceptionBookDataGridRow[];
  allCount: number;
  loading: boolean;
  from: number;
  prev: () => void;
  next: () => void;
  sortByGridSortModel: (sortModel: GridSortModel | undefined) => void;
}

type Dictionary = Record<string, string>;
const AreaUsePurposeDictionary: Dictionary = {
  第一種低層住居専用地域: "一低",
  第二種低層住居専用地域: "二低",
  田園住居地域: "田住",
  第一種中高層住居専用地域: "一中高",
  第二種中高層住居専用地域: "二中高",
  第一種住居地域: "一住",
  第二種住居地域: "二住",
  準住居地域: "準住居",
  近隣商業地域: "近商",
  商業地域: "商業",
  準工業地域: "準工",
  工業地域: "工業",
  工業専用地域: "工業専",
};

const FEED_FETCH_SIZE = 5000;

// useFeedの結果を、DataGridに表示するためのデータに変換して返すcustom hook
export const useGridFeed = (
  params: IUseFeedGridParams
): IUseFeedGridReturnType => {
  const { page, pageSize, ...feedParams } = params;
  const { feed, allCount, from, prev, next, sort } = useFeed({
    ...feedParams,
    size: FEED_FETCH_SIZE,
  });
  

  // 現在取得済みの件数よりも、表示するページの件数が多い場合は、次のページを取得する
  useEffect(() => {
    const pageNumberForCalcDataset = page + 1;
    if (feed === null || feed === undefined) return;
    if (pageNumberForCalcDataset * pageSize <= feed.list.length) return;
    next();
  }, [page, pageSize]);

  // MUIのDataGridのソート条件を、APIのソート条件に変換する
  const sortByGridSortModel = (sortModel: GridSortModel | undefined): void => {
    sort(toSortCondition(sortModel));
  };

  return {
    rows: toGridRows(feed),
    allCount,
    loading: feed === undefined,
    from,
    prev,
    next,
    sortByGridSortModel,
  };
};

// Gridに表示するデータの型に変換する関数
const toGridRows = (
  data: IRealEstateReceptionBookResponse | undefined
): IRealEstateReceptionBookDataGridRow[] => {
  if (data === undefined) return [];
  return data.list.map((item) => {
    const receptionKindLabel = item.isNew ? "新" : "既";
    let areaUsePurpose = item.areaUsePurpose;
    if (areaUsePurpose) {
      const areaUsePurposeFull = areaUsePurpose;
      areaUsePurpose = AreaUsePurposeDictionary[areaUsePurposeFull] || areaUsePurposeFull;
    }

    return {
      id: item.id,
      chiban: item.chiban,
      kaokuNumber: item.kaokuNumber,
      realEstateBookType: item.realEstateBookTypeName,
      receptionReason: item.receptionReason,
      realEstateType: item.realEstateTypeName,
      receptionKind: receptionKindLabel,
      prefectures: item.prefecturesName,
      city: item.cityName,
      address: item.address,
      outside: item.outside,
      legalAffairsBureauRequestDate: format(
        parse(item.legalAffairsBureauRequestDate, "yyyy-MM-dd", new Date()),
        "yyyy年MM月dd日",
        {
          locale: ja,
        }
      ),
      legalAffairsBureauReceptionNumber: item.legalAffairsBureauReceptionNumber,
      estimatedChiseki: item.estimatedChiseki,
      publishedPrice: item.publishedPrice,
      estimatedPrice: item.estimatedPrice,
      areaUsePurpose,
      buildingRate: item.buildingRate,
      volumeRate: item.volumeRate,
    };
  });
};

/**
 * 引数の値が、キーとなるフィールド名かどうかを判定するType Guard関数
 */
const isConditionField = (
  field: string
): field is keyof Omit<IRealEstateReceptionBookDataGridRow, "id"> => {
  const keys: Array<keyof Omit<IRealEstateReceptionBookDataGridRow, "id">> = [
    "chiban",
    "kaokuNumber",
    "realEstateBookType",
    "receptionReason",
    "realEstateType",
    "receptionKind",
    "prefectures",
    "city",
    "address",
    "outside",
    "legalAffairsBureauRequestDate",
    "legalAffairsBureauReceptionNumber",
    "estimatedChiseki",
    "publishedPrice",
    "estimatedPrice",
    "areaUsePurpose",
    "buildingRate",
    "volumeRate",
  ];

  return keys.some((key) => key === field);
};

/**
 * 引数がソート順かどうかを判定するType Guard関数
 */
const isSortOrder = (order: GridSortDirection): order is "asc" | "desc" => {
  if (order === undefined || order === null) return false;
  return ["asc", "desc"].includes(order);
};

/**
 * MUI Data Gridのソート条件を、APIのソート条件に変換する関数
 */
const toSortCondition = (
  model: GridSortModel | undefined
): Parameters<ReturnType<typeof useFeed>["sort"]>[0] | undefined => {
  if (model === undefined || model.length === 0) return undefined;

  // 無料版のMUI Data Gridは複数列のソートに対応していないので、
  // 1列目のみをソート条件として扱う
  const { field, sort } = model[0];
  if (!isConditionField(field) || !isSortOrder(sort)) return undefined;
  return { sortBy: field, order: sort };
};
