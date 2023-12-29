import { useState } from "react";
import { RealEstateReceptionBookFeedPresenter } from "./presenter";
import { useCityOptions } from "./hooks/useCityOptions";
import { useCitySelect } from "./hooks/useCitySelect";
import { usePrefectureOptions } from "./hooks/usePrefectureOptions";
import { useReceptionReasonOptions } from "./hooks/useReceptionReasonOptions";
import { type IFilterCondition } from "./types";
import { buildPrefectureAndCitySetter } from "./hooks/setPrefecturesWithCities";
import { useReceptionBookImportStatuses } from "./hooks/useReceptionBookImportStatuses";
import { getStartAndEndDate, getSearchMinDate } from "./utils/dateTime"


const RealEstateReceptionBookFeedContainer: React.FC = () => {
  
  const [startDate, endDate] = getStartAndEndDate();
  const minDate = getSearchMinDate();
  
  // ---
  // hooks群
  // ---
  const [
    legalAffairsBureauRequestDateStart,
    setLegalAffairsBureauRequestDateStart,
  ] = useState<Date | null>(startDate);
  const [
    legalAffairsBureauRequestDateEnd,
    setLegalAffairsBureauRequestDateEnd,
  ] = useState<Date | null>(endDate);
  const [
    realEstateBookTypeRensakiRenzoku,
    setRealEstateBookTypeRensakiRenzoku,
  ] = useState<boolean>(false);
  const [realEstateBookTypeTandoku, setRealEstateBookTypeTandoku] =
    useState<boolean>(false);
  const [realEstateTypeTochi, setRealEstateTypeTochi] =
    useState<boolean>(false);
  const [realEstateTypeKutate, setRealEstateTypeKutate] =
    useState<boolean>(false);
  const [realEstateTypeTatemono, setRealEstateTypeTatemono] =
    useState<boolean>(false);
  const [realEstateTypeKyotan, setRealEstateTypeKyotan] =
    useState<boolean>(false);
  const [cities, setCities] = useState<string[]>([]);
  const [prefectures, setPrefectures] = useState<string[]>([]);
  const [receptionReasons, setReceptionReasons] = useState<string[]>([]);
  const [sotoRange, setSotoRange] = useState<Record<string, number>>({
    min: 0,
    max: 0,
  });
  const [estimateAcreageRange, setEstimateAcreageRange] = useState<Record<string, number>>({
    min: 0,
    max: 0,
  });
  const [estimateLandPriceRange, setEstimateLandPriceRange] = useState<Record<string, number>>({
    min: 0,
    max: 0,
  });
  const [approximateEstimatePriceRange, setApproximateEstimatePriceRange] = useState<Record<string, number>>({
    min: 0,
    max: 0,
  });
  const [residenceOptions, setResidenceOptions] = useState<Record<string, boolean>>({
    ittei: false,
    icchuko: false,
    ichiju: false,
    nitei: false,
    nichuko: false,
    niju: false,
    denju: false,
    junju: false,
  });
  const [commercialOptions, setCommercialOptions] = useState<Record<string, boolean>>({
    kinsyo: false,
    syogyo: false,
  });
  const [industryOptions, setIndustryOptions] = useState<Record<string, boolean>>({
    junko: false,
    kogyo: false,
    kosen: false,
  });
  const [yosekiRatioRange, setYosekiRatioRange] = useState<Record<string, number>>({
    min: 0,
    max: 0,
  });
  const [kenpeiRatioRange, setKenpeiRatioRange] = useState<Record<string, number>>({
    min: 0,
    max: 0,
  });
  const [filterCondition, setFilterCondition] = useState<IFilterCondition>({
    legalAffairsBureauRequestDateStart,
    legalAffairsBureauRequestDateEnd,
    realEstateBookTypeRensakiRenzoku,
    realEstateBookTypeTandoku,
    realEstateTypeTochi,
    realEstateTypeKutate,
    realEstateTypeTatemono,
    realEstateTypeKyotan,
    cities,
    prefectures,
    receptionReasons,
    sotoRange,
    estimateAcreageRange,
    estimateLandPriceRange,
    approximateEstimatePriceRange,
    residenceOptions,
    commercialOptions,
    industryOptions,
    yosekiRatioRange,
    kenpeiRatioRange,
  });
  
  // ---
  // custom hooks群
  // ---
  const { prefectureOptions } = usePrefectureOptions();
  const { cityParams } = useCityOptions()
  const { cityOptions } = useCitySelect(prefectures, cityParams);
  const { receptionReasonOptions } = useReceptionReasonOptions();
  const importStatuses = useReceptionBookImportStatuses();    
  
  // ---
  // function群
  // ---
  const handleSearch = (): void => {
    setFilterCondition({
      legalAffairsBureauRequestDateStart,
      legalAffairsBureauRequestDateEnd,
      realEstateBookTypeRensakiRenzoku,
      realEstateBookTypeTandoku,
      realEstateTypeTochi,
      realEstateTypeKutate,
      realEstateTypeTatemono,
      realEstateTypeKyotan,
      cities,
      prefectures,
      receptionReasons,
      sotoRange,
      estimateAcreageRange,
      estimateLandPriceRange,
      approximateEstimatePriceRange,
      residenceOptions,
      commercialOptions,
      industryOptions,
      yosekiRatioRange,
      kenpeiRatioRange,
    });
  };
    
  const setPrefectureAndCity = buildPrefectureAndCitySetter(
    cityParams,
    cities,
    setCities,
    setPrefectures
  )

  return (
    <RealEstateReceptionBookFeedPresenter
      setLegalAffairsBureauRequestDateStart={
        setLegalAffairsBureauRequestDateStart
      }
      setLegalAffairsBureauRequestDateEnd={setLegalAffairsBureauRequestDateEnd}
      setRealEstateBookTypeTandoku={setRealEstateBookTypeTandoku}
      setRealEstateBookTypeRensakiRenzoku={setRealEstateBookTypeRensakiRenzoku}
      setRealEstateTypeTochi={setRealEstateTypeTochi}
      setRealEstateTypeKutate={setRealEstateTypeKutate}
      setRealEstateTypeTatemono={setRealEstateTypeTatemono}
      setRealEstateTypeKyotan={setRealEstateTypeKyotan}
      setReceptionReasons={setReceptionReasons}
      setCities={setCities}
      setPrefectures={setPrefectureAndCity}
      setSotoRange={setSotoRange}
      setEstimateAcreageRange={setEstimateAcreageRange}
      setEstimateLandPriceRange={setEstimateLandPriceRange}
      setApproximateEstimatePriceRange={setApproximateEstimatePriceRange}
      setResidenceOptions={setResidenceOptions}
      setCommercialOptions={setCommercialOptions}
      setIndustryOptions={setIndustryOptions}
      setYosekiRatioRange={setYosekiRatioRange}
      setKenpeiRatioRange={setKenpeiRatioRange}
      handleSearch={handleSearch}
      cities={cities}
      prefectures={prefectures}
      receptionReasons={receptionReasons}
      realEstateBookTypeTandoku={realEstateBookTypeTandoku}
      realEstateBookTypeRensakiRenzoku={realEstateBookTypeRensakiRenzoku}
      legalAffairsBureauRequestDateStart={legalAffairsBureauRequestDateStart}
      legalAffairsBureauRequestDateEnd={legalAffairsBureauRequestDateEnd}
      realEstateTypeTochi={realEstateTypeTochi}
      realEstateTypeKutate={realEstateTypeKutate}
      realEstateTypeTatemono={realEstateTypeTatemono}
      realEstateTypeKyotan={realEstateTypeKyotan}
      cityOptions={cityOptions}
      prefectureOptions={prefectureOptions}
      importStatuses={importStatuses}
      receptionReasonOptions={receptionReasonOptions}
      filterCondition={filterCondition}
      startDate={startDate}
      endDate={endDate}
      minDate={minDate}
      sotoRange={sotoRange}
      estimateAcreageRange={estimateAcreageRange}
      estimateLandPriceRange={estimateLandPriceRange}
      approximateEstimatePriceRange={approximateEstimatePriceRange}
      residenceOptions={residenceOptions}
      commercialOptions={commercialOptions}
      industryOptions={industryOptions}
      yosekiRatioRange={yosekiRatioRange}
      kenpeiRatioRange={kenpeiRatioRange}
    />
  );
};

export { RealEstateReceptionBookFeedContainer };
