import { type ISelectObject } from "../../../types/select";

interface IRealEstateReceptionBookFeedPresenterProps {
  setLegalAffairsBureauRequestDateStart: React.Dispatch<
    React.SetStateAction<Date | null>
  >;
  setLegalAffairsBureauRequestDateEnd: React.Dispatch<
    React.SetStateAction<Date | null>
  >;
  setRealEstateBookTypeTandoku: React.Dispatch<React.SetStateAction<boolean>>;
  setRealEstateBookTypeRensakiRenzoku: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setRealEstateTypeTochi: React.Dispatch<React.SetStateAction<boolean>>;
  setRealEstateTypeKutate: React.Dispatch<React.SetStateAction<boolean>>;
  setRealEstateTypeTatemono: React.Dispatch<React.SetStateAction<boolean>>;
  setRealEstateTypeKyotan: React.Dispatch<React.SetStateAction<boolean>>;
  setReceptionReasons: React.Dispatch<React.SetStateAction<string[]>>;
  setCities: React.Dispatch<React.SetStateAction<string[]>>;
  setPrefectures: React.Dispatch<React.SetStateAction<string[]>>;
  handleSearch: () => void;
  setSotoRange: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  setEstimateAcreageRange: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  setEstimateLandPriceRange: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  setApproximateEstimatePriceRange: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  setResidenceOptions: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setCommercialOptions: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setIndustryOptions: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setYosekiRatioRange: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  setKenpeiRatioRange: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  cities: string[];
  prefectures: string[];
  receptionReasons: string[];
  legalAffairsBureauRequestDateStart: null | Date;
  legalAffairsBureauRequestDateEnd: null | Date;
  realEstateBookTypeTandoku: boolean;
  realEstateBookTypeRensakiRenzoku: boolean;
  realEstateTypeTochi: boolean;
  realEstateTypeKutate: boolean;
  realEstateTypeTatemono: boolean;
  realEstateTypeKyotan: boolean;
  cityOptions: ISelectObject[];
  prefectureOptions: ISelectObject[];
  receptionReasonOptions: ISelectObject[];
  filterCondition: IFilterCondition;
  importStatuses: IRealEstateReceptionBookImportStatusObject[];
  startDate: Date;
  endDate: Date;
  minDate: Date;
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

interface IRealEstateReceptionBookDataGridRow {
  id: number;
  chiban: string;
  kaokuNumber: string;
  realEstateBookType: string;
  receptionReason: string;
  realEstateType: string;
  receptionKind: string;
  prefectures: string;
  city: string;
  address: string;
  outside: string;
  legalAffairsBureauRequestDate: string;
  legalAffairsBureauReceptionNumber: string;
  estimatedChiseki: number | null;
  publishedPrice: number | null;
  estimatedPrice: number | null;
  areaUsePurpose: string | null;
  buildingRate: number | null;
  volumeRate: number | null;
}

interface IRealEstateReceptionBookObject {
  id: number;
  createdAt: string;
  updatedAt: string;
  chiban: string;
  kaokuNumber: string;
  realEstateBookTypeId: number;
  realEstateBookTypeName: string;
  receptionReason: string;
  realEstateTypeId: number;
  realEstateTypeName: string;
  isNew: boolean;
  prefecturesCityId: number;
  prefecturesId: number;
  prefecturesName: string;
  cityId: number;
  cityName: string;
  address: string;
  outside: string;
  legalAffairsBureauRequestDate: string;
  legalAffairsBureauReceptionNumber: string;
  estimatedChiseki: number | null;
  publishedPrice: number | null;
  estimatedPrice: number | null;
  areaUsePurpose: string | null;
  buildingRate: number | null;
  volumeRate: number | null;
}

interface IRealEstateReceptionBookResponse {
  list: IRealEstateReceptionBookObject[];
  count: number;
}

interface ICityObject {
  id: number;
  name: string;
  cityCode: string;
  prefCode: string;
}

interface ICityParams {
  cityParams: ICityObject[];
}


interface ICityResponse {
  list: ICityObject[];
}

interface IPrefectureObject {
  id: number;
  name: string;
  prefectureCode: string;
}

interface IPrefectureResponse {
  list: IPrefectureObject[];
}

interface IReceptionReasonObject {
  id: number;
  name: string;
}

interface IReceptionReasonResponse {
  list: IReceptionReasonObject[];
}

interface IFilterCondition {
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

interface ISetCityParams {
  cities: string[];
  prefectures: string[]
}

interface IRealEstateReceptionBookImportStatusObject {
  prefecturesId: number;
  prefecturesName: string;
  importDate: string;
  legalAffairsBureauRequestMonth: string;
}

interface IRealEstateReceptionBookImportStatusResponse {
  list: IRealEstateReceptionBookImportStatusObject[];
}

interface IRealEstateReceptionBookImportStatusObject {
  prefecturesId: number;
  prefecturesName: string;
  importDate: string;
  legalAffairsBureauRequestMonth: string;
}

interface IRealEstateReceptionBookImportStatusResponse {
  list: IRealEstateReceptionBookImportStatusObject[];
}

export type {
  IRealEstateReceptionBookFeedPresenterProps,
  IRealEstateReceptionBookDataGridRow,
  IRealEstateReceptionBookResponse,
  ICityResponse,
  ICityObject,
  IReceptionReasonResponse,
  IFilterCondition,
  IPrefectureResponse,
  IPrefectureObject,
  ISetCityParams,
  ICityParams,
  IRealEstateReceptionBookImportStatusObject,
  IRealEstateReceptionBookImportStatusResponse,
};
