import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Box, FormControlLabel, FormGroup, Grid, TextField } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Button, ButtonVariantOption } from "../../components/Button";
import { Checkbox, CheckboxGroup } from "../../components/Checkbox";
import { DateRangePicker } from "../../components/DatePicker";
import { Divider } from "../../components/Divider";
import { Label } from "../../components/Label";
import { PagePaper, SectionPaper } from "../../components/Paper";
import { MultiSelect } from "../../components/Select";
import { PageTitle, SectionTitle } from "../../components/Title";
import { SizingWrapperStyle } from "../../components/Wrapper";
import { FeedGrid } from "./components/FeedGrid";
import { ReceptionBookImportStatus } from "./components/ReceptionBookImportStatus";
import { RowSpacingWrapper } from "./components/RowSpacingWrapper";
import { type IRealEstateReceptionBookFeedPresenterProps } from "./types";

import React from "react";

const RealEstateReceptionBookFeedPresenter: React.FC<
  IRealEstateReceptionBookFeedPresenterProps
> = (props) => {
  const {
    setLegalAffairsBureauRequestDateStart,
    setLegalAffairsBureauRequestDateEnd,
    setRealEstateBookTypeTandoku,
    setRealEstateBookTypeRensakiRenzoku,
    setRealEstateTypeTochi,
    setRealEstateTypeKutate,
    setRealEstateTypeTatemono,
    setRealEstateTypeKyotan,
    setReceptionReasons,
    setCities,
    setPrefectures,
    handleSearch,
    setSotoRange,
    setEstimateAcreageRange,
    setEstimateLandPriceRange,
    setApproximateEstimatePriceRange,
    setResidenceOptions,
    setCommercialOptions,
    setIndustryOptions,
    setYosekiRatioRange,
    setKenpeiRatioRange,
    cities,
    prefectures,
    receptionReasons,
    legalAffairsBureauRequestDateStart,
    legalAffairsBureauRequestDateEnd,
    realEstateBookTypeTandoku,
    realEstateBookTypeRensakiRenzoku,
    realEstateTypeTochi,
    realEstateTypeKutate,
    realEstateTypeTatemono,
    realEstateTypeKyotan,
    cityOptions,
    prefectureOptions,
    receptionReasonOptions,
    filterCondition,
    importStatuses,
    startDate,
    endDate,
    minDate,
    sotoRange,
    estimateAcreageRange,
    estimateLandPriceRange,
    approximateEstimatePriceRange,
    residenceOptions,
    commercialOptions,
    industryOptions,
    yosekiRatioRange,
    kenpeiRatioRange,
  } = props;

  // テキストフィールドが変更されたときの処理
  const handleInputChange = (
    key:string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    handleTarget:string
    ) : void => {
    
    // 入力された値を取得
    const value : string= event.target.value;

    if (handleTarget === "soto"){
      sotoRange[key] = Number(value);
      setSotoRange(sotoRange);
    } else if(handleTarget === "estimateAcreage") {
      estimateAcreageRange[key] = Number(value);
      setEstimateAcreageRange(estimateAcreageRange);
    } else if(handleTarget === "estimateLandPrice"){
      estimateLandPriceRange[key] = Number(value);
      setEstimateLandPriceRange(estimateLandPriceRange);
    } else if(handleTarget === "approximateEstimatePrice"){
      approximateEstimatePriceRange[key] = Number(value);
      setApproximateEstimatePriceRange(approximateEstimatePriceRange);
    } else if(handleTarget === "yosekiRatio"){
      yosekiRatioRange[key] = Number(value);
      setYosekiRatioRange(yosekiRatioRange);
    } else if(handleTarget === "kenpeiRatio"){
      kenpeiRatioRange[key] = Number(value);
      setKenpeiRatioRange(kenpeiRatioRange);
    }
  };

  // 住居系のチェックボックスの状態を管理するステート
  const [residenceAllChecked, setResidenceAllChecked] = React.useState(false);
  // 商業系のチェックボックスの状態を管理するステート
  const [commercialAllChecked, setCommercialAllChecked] = React.useState(false);
  // 工業系のチェックボックスの状態を管理するステート
  const [industryAllChecked, setIndustryAllChecked] = React.useState(false);
  
  // 住居系のチェックボックスの一括処理
  const handleResidenceChangeAll = (event: boolean) : void => {
    // チェックボックスの状態を反転させる
    setResidenceAllChecked(!residenceAllChecked);
    // 選択肢のチェックボックスの状態を全て同じにする
    setResidenceOptions({
      ittei: event,
      icchuko: event,
      ichiju: event,
      nitei: event,
      nichuko: event,
      niju: event,
      denju: event,
      junju: event,
    });
  };

  // 商業系のチェックボックスの一括処理
  const handleCommercialChangeAll = (event: boolean) : void => {
    // チェックボックスの状態を反転させる
    setCommercialAllChecked(!commercialAllChecked);
    // 選択肢のチェックボックスの状態を全て同じにする
    setCommercialOptions({
      kinsyo: event,
      syogyo: event,
    });
  };

  // 工業系のチェックボックスの一括処理
  const handleIndustryChangeAll = (event: boolean) : void => {
    // チェックボックスの状態を反転させる
    setIndustryAllChecked(!industryAllChecked);
    // 選択肢のチェックボックスの状態を全て同じにする
    setIndustryOptions({
      junko: event,
      kogyo: event,
      kosen: event,
    });
  };

  // 選択肢のチェックボックスが変更されたときの処理
  const handleOptionChange = (
    event: boolean, 
    handleTarget:string,
    key:string,
    ) : void => {
      // 選択肢のチェックボックスが全てチェックされているかどうかを判定する
      // const isAllChecked = Object.values(options).every((value) => value);

      if (handleTarget === "residence") {
        setResidenceOptions({
          ...residenceOptions,
          [key]: event,
        });
        // 全選択がうまく機能しないので保留
        // setResidenceAllChecked(isAllChecked);
      } else if (handleTarget === "commercial") {
        setCommercialOptions({
          ...commercialOptions,
          [key]: event,
        });
        // 全選択がうまく機能しないので保留
        // setCommercialAllChecked(isAllChecked);
      } else if (handleTarget === "industry") {
        setIndustryOptions({
          ...industryOptions,
          [key]: event,
        });
        // 全選択がうまく機能しないので保留
        // setIndustryAllChecked(isAllChecked);
      }
  };

  return (
    <>
      <PagePaper>
        <Accordion defaultExpanded sx={{ mb: 1 }}>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
          >
            <Typography variant="h6">お知らせ</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ReceptionBookImportStatus importStatuses={importStatuses}/>
          </AccordionDetails>
        </Accordion>
        <Box sx={{ display: "flex", mb: 3 }}>
          <MenuBookIcon sx={{ mr: 1 }} fontSize="large" />
          <PageTitle>不動産登記受付帳検索</PageTitle>
        </Box>

        <SectionPaper>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SectionTitle>絞り込み</SectionTitle>
          </Box>
          <Box sx={{ mx: 2 }}>
            <Divider />
          </Box>

          {/* 不動産登記情報 */}
          <Box sx={{ mx: 2, mt: 2, mb: 1 }}>
            <Label>不動産登記情報</Label>
            <RowSpacingWrapper>
              <Box sx={{ my: 1 }}>
                <MultiSelect
                  label="都道府県"
                  value={prefectures}
                  onChange={setPrefectures}
                  options={prefectureOptions}
                />
              </Box>
              <Box sx={{ my: 1 }}>
                <MultiSelect
                  label="市区町村"
                  value={cities}
                  onChange={setCities}
                  options={cityOptions}
                />
              </Box>
              <Box sx={{ display: "flex", my: 1 }}>
                <DateRangePicker
                  startDateLabel="法務局受付日  開始"
                  startDate={legalAffairsBureauRequestDateStart}
                  onChangeStartDate={setLegalAffairsBureauRequestDateStart}
                  endDateLabel="法務局受付日  終了"
                  endDate={legalAffairsBureauRequestDateEnd}
                  onChangeEndDate={setLegalAffairsBureauRequestDateEnd}
                  minDate={minDate}
                  maxDate={endDate}
                  defaultCalendarMonth={startDate}
                />
              </Box>
              <Box sx={{ my: 1 }}>
                <MultiSelect
                  label="登記原因"
                  value={receptionReasons}
                  onChange={setReceptionReasons}
                  options={receptionReasonOptions}
                />
              </Box>
            </RowSpacingWrapper>
          </Box>

          {/* 申請種別 */}
          <Box sx={{ mx: 2, mb: 2 }}>
            <CheckboxGroup label="申請種別">
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Checkbox
                  label="単独"
                  checked={realEstateBookTypeTandoku}
                  onChange={setRealEstateBookTypeTandoku}
                />
                <Checkbox
                  label="連先・連続"
                  checked={realEstateBookTypeRensakiRenzoku}
                  onChange={setRealEstateBookTypeRensakiRenzoku}
                />
              </Box>
            </CheckboxGroup>
          </Box>

          {/* 不動産種別 */}
          <Box sx={{ mx: 2, mb: 2 }}>
            <CheckboxGroup label="不動産種別">
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Checkbox
                  label="土地"
                  checked={realEstateTypeTochi}
                  onChange={setRealEstateTypeTochi}
                />
                <Checkbox
                  label="区分建物"
                  checked={realEstateTypeKutate}
                  onChange={setRealEstateTypeKutate}
                />
                <Checkbox
                  label="建物"
                  checked={realEstateTypeTatemono}
                  onChange={setRealEstateTypeTatemono}
                />
                <Checkbox
                  label="共担"
                  checked={realEstateTypeKyotan}
                  onChange={setRealEstateTypeKyotan}
                />
              </Box>
            </CheckboxGroup>
          </Box>

          <Accordion sx={{ mb: 1, boxShadow: "none", position: "static"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}  sx={{flexDirection: "row-reverse"}}>
            <Typography sx={{color:"blue"}}>さらに条件を追加する</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0}}>
            {/* 外 */}
            <Box sx={{ mx: 2, mb: 2, width : "800px" }}>
              <Label>外</Label>
              <Grid sx={{ display: "inline-block", top: "50%"}}>
                <TextField
                  onChange={(e) => { handleInputChange("min", e, "soto"); }}
                  size="small"
                  sx={{ width: "100px", top: "50%"}}
                  inputProps={{
                    min: 0,
                    type: "number",
                  }}
                />
                以上  〜
                <TextField
                  onChange={(e) => { handleInputChange("max", e, "soto"); }}
                  size="small"
                  sx={{ width: "100px", top: "50%"}}
                  inputProps={{
                    min: 0,
                    type: "number",
                  }}
                />
                以下
              </Grid>
            </Box>

            {/* 推計地積 */}
            <Box sx={{ mx: 2, mb: 2}}>
              <Grid sx={{ display: "inline-block", top: "50%"}}>
                <Label>推計地積</Label>
                <TextField
                  onChange={(e) => { handleInputChange("min", e, "estimateAcreage"); }}
                  size="small"
                  sx={{ width: "150px", top: "50%"}}
                  inputProps={{
                    min: 0,
                    type: "number",
                    step: "0.01"
                  }}
                />
                ㎡以上  〜
                <TextField
                  onChange={(e) => { handleInputChange("max", e, "estimateAcreage"); }}
                  size="small"
                  sx={{ width: "150px", top: "50%"}}
                  inputProps={{
                    min: 0,
                    type: "number",
                    step: "0.01"
                  }}
                />
                ㎡以下
              </Grid>
              <Grid sx={{ display: "inline-block", top: "50%", marginLeft: "20px"}}>
                <Label>公示価格</Label>
                <TextField
                  onChange={(e) => { handleInputChange("min", e, "estimateLandPrice"); }}
                  size="small"
                  sx={{ width: "150px", top: "50%"}}
                  inputProps={{
                    min: 0,
                    type: "number",
                  }}
                />
                円/㎡以上  〜
                <TextField
                  onChange={(e) => { handleInputChange("max", e, "estimateLandPrice"); }}
                  size="small"
                  sx={{ width: "150px", top: "50%"}}
                  inputProps={{
                    min: 0,
                    type: "number",
                  }}
                />
                円/㎡以下
              </Grid>
              <Grid sx={{ display: "inline-block", top: "50%", marginLeft: "20px"}}>
                <Label>概算価格（推計地積✕公示価格）</Label>
                <TextField
                  onChange={(e) => { handleInputChange("min", e, "approximateEstimatePrice"); }}
                  size="small"
                  sx={{ width: "150px", top: "50%"}}
                  inputProps={{
                    min: 0,
                    type: "number",
                  }}
                />
                円以上  〜
                <TextField
                  onChange={(e) => { handleInputChange("max", e, "approximateEstimatePrice"); }}
                  size="small"
                  sx={{ width: "150px", top: "50%"}}
                  inputProps={{
                    min: 0,
                    type: "number",
                  }}
                />
                円以下
              </Grid>
            </Box>

            {/* 住居系 */}
            <Box sx={{ mx: 2, mb: 2 }}>
              <CheckboxGroup label="用途地域">
                <Checkbox
                      label="住居系"
                      checked={residenceAllChecked}
                      onChange={handleResidenceChangeAll}
                    />
                <FormGroup id="areaUsePurpose" sx={{ marginLeft:"30px", display: "grid" , "grid-template-columns": "auto auto auto"}}>
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        label="第一種低層住居専用地域（略：一低）"
                        checked={residenceOptions.ittei}
                        onChange={(e) => { handleOptionChange(e, "residence", "ittei"); }}
                      />
                    }
                  />
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        label="第二種低層住居専用地域（略：二低）"
                        checked={residenceOptions.nitei}
                        onChange={(e) => { handleOptionChange(e, "residence", "nitei"); }}
                      />
                    }
                  />
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        label="田園住居地域（略：田住）"
                        checked={residenceOptions.denju} 
                        onChange={(e) => { handleOptionChange(e, "residence", "denju"); }} 
                      />
                    }
                  />
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        label="第一種中高層住居専用地域（略：一中高）"
                        checked={residenceOptions.icchuko}
                        onChange={(e) => { handleOptionChange(e, "residence", "icchuko"); }}
                      />
                    }
                  />
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        label="第二種中高層専用住居地域（略：二中高）"
                        checked={residenceOptions.nichuko}
                        onChange={(e) => { handleOptionChange(e, "residence", "nichuko"); }}
                      />
                    }
                  />
                  <div>
                    {/* 場所を作るための空要素 */}
                  </div>
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        label="第一種住居地域（略：一住）"
                        checked={residenceOptions.ichiju}
                        onChange={(e) => { handleOptionChange(e, "residence", "ichiju"); }}
                      />
                    }
                  />
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        label="第二種住居地域（略：二住）"
                        checked={residenceOptions.niju}
                        onChange={(e) => { handleOptionChange(e, "residence", "niju"); }}
                      />
                    }
                  />
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        label="準住居地域（略：準住）"
                        checked={residenceOptions.junju}
                        onChange={(e) => { handleOptionChange(e, "residence", "junju"); }} 
                      />
                    }
                  />
                </FormGroup>
              </CheckboxGroup>
            </Box>

            {/* 商業系 */}
            <Box sx={{ mx: 2, mb: 2 }}>
              <CheckboxGroup label="">
                <Checkbox
                      label="商業系"
                      checked={commercialAllChecked}
                      onChange={handleCommercialChangeAll}
                    />
                <FormGroup sx={{ marginLeft:"30px", display: "grid" , "grid-template-columns": "auto auto auto"}}>
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        label="近隣商業地域"
                        checked={commercialOptions.kinsyo}
                        onChange={(e) => { handleOptionChange(e, "commercial", "kinsyo"); }}
                      />
                    }
                  />
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        label="商業地域"
                        checked={commercialOptions.syogyo}
                        onChange={(e) => { handleOptionChange(e, "commercial", "syogyo"); }}
                      />
                    }
                  />
                </FormGroup>
              </CheckboxGroup>
            </Box>

            {/* 工業系 */}
            <Box sx={{ mx: 2, mb: 2 }}>
              <CheckboxGroup label="">
                <Checkbox
                      label="工業系"
                      checked={industryAllChecked}
                      onChange={handleIndustryChangeAll}
                    />
                <FormGroup sx={{ marginLeft:"30px", display: "grid" , "grid-template-columns": "auto auto auto"}}>
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        label="準工業地域"
                        checked={industryOptions.junko}
                        onChange={(e) => { handleOptionChange(e, "industry", "junko"); }}
                      />
                    }
                  />
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        label="工業地域"
                        checked={industryOptions.kogyo}
                        onChange={(e) => { handleOptionChange(e, "industry", "kogyo"); }}
                      />
                    }
                  />
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        label="工業専用地域"
                        checked={industryOptions.kosen}
                        onChange={(e) => { handleOptionChange(e, "industry", "kosen"); }}
                      />
                    }
                  />
                </FormGroup>
              </CheckboxGroup>
            </Box>

            {/* 容積率・建ぺい率 */}
            <Box sx={{ mx: 2, mb: 2}}>
              <Grid sx={{ display: "inline-block", top: "50%"}}>
                <Label>容積率</Label>
                <TextField
                  onChange={(e) => { handleInputChange("min", e, "yosekiRatio"); }}
                  size="small"
                  sx={{ width: "150px", top: "50%"}}
                  inputProps={{
                    min: 0,
                    type: "number",
                  }}
                />
                %以上  〜
                <TextField
                  onChange={(e) => { handleInputChange("max", e, "yosekiRatio"); }}
                  size="small"
                  sx={{ width: "150px", top: "50%"}}
                  inputProps={{
                    min: 0,
                    type: "number",
                  }}
                />
                %以下
              </Grid>
              <Grid sx={{ display: "inline-block", top: "50%", marginLeft: "20px"}}>
                <Label>建ぺい率</Label>
                <TextField
                  onChange={(e) => { handleInputChange("min", e, "kenpeiRatio"); }}
                  size="small"
                  sx={{ width: "150px", top: "50%"}}
                  inputProps={{
                    min: 0,
                    type: "number",
                    step: "0.01"
                  }}
                />
                %以上  〜
                <TextField
                  onChange={(e) => { handleInputChange("max", e, "kenpeiRatio"); }}
                  size="small"
                  sx={{ width: "150px", top: "50%"}}
                  inputProps={{
                    min: 0,
                    type: "number",
                    step: "0.01"
                  }}
                />
                %以下
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>

          {/* 検索 */}
          <Box sx={{ mx: 2 }}>
            <Divider />
          </Box>

          <Box
            sx={{ my: 3, mr: 2, display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              label="この条件で検索"
              onClick={handleSearch}
              variant={ButtonVariantOption.Contained}
              size={SizingWrapperStyle.SMALL}
            />
          </Box>
        </SectionPaper>

        <Box sx={{ mt: 3 }} />

        {/* 不動産登記受付帳一覧テーブル */}
        <SectionPaper>
          <SectionTitle>不動産登記受付帳一覧</SectionTitle>

          <Divider />

          <FeedGrid filterCondition={filterCondition} />

          <Divider />

          <Box sx={{ mb: 6 }} />
        </SectionPaper>
      </PagePaper>
    </>
  );
};

export { RealEstateReceptionBookFeedPresenter };
