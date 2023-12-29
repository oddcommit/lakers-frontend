import { rest } from "msw";
import { parse, isAfter, isBefore, isSameDay } from "date-fns";
import {receptionReasonOptions} from "../option/response";
import { getResponse, importStatuses } from "./response";

interface IBody {
  body : {
    legal_affairs_bureau_request_date_start: string | null;
    legal_affairs_bureau_request_date_end: string | null;
    real_estate_book_type_tandoku: boolean;
    real_estate_book_type_rensaki_renzoku: boolean;
    real_estate_type_tochi: boolean;
    real_estate_type_kutate: boolean;
    real_estate_type_tatemono: boolean;
    real_estate_type_kyotan: boolean;
    cities: string[];
    prefectures: string[];
    reception_reasons: string[];
    size: number;
    from_count: number;
    soto_range: Record<string, number>;
    estimate_acreage_range: Record<string, number>;
    estimate_land_price_range: Record<string, number>;
    approximate_estimate_price_range: Record<string, number>;
    residence_options: Record<string, boolean>;
    commercial_options: Record<string, boolean>;
    industry_options: Record<string, boolean>;
    yoseki_ratio_range: Record<string, number>;
    kenpei_ratio_range: Record<string, number>;
  }
}

export const handlers = [
  rest.post("/real-estate-book/feed", async (req, res, ctx) => {
    const reqBody = JSON.parse(await req.text()) as IBody
    const legalAffairsBureauRequestDateStart = reqBody.body.legal_affairs_bureau_request_date_start;
    const legalAffairsBureauRequestDateEnd = reqBody.body.legal_affairs_bureau_request_date_end;
    const realEstateBookTypeTandoku = reqBody.body.real_estate_book_type_tandoku
    const realEstateBookTypeRensakiRenzoku = reqBody.body.real_estate_book_type_rensaki_renzoku
    const realEstateTypeTochi = reqBody.body.real_estate_type_tochi
    const realEstateTypeKutate = reqBody.body.real_estate_type_kutate
    const realEstateTypeTatemono = reqBody.body.real_estate_type_tatemono
    const realEstateTypeKyotan = reqBody.body.real_estate_type_kyotan
    const cities = reqBody.body.cities;
    const receptionReasons = reqBody.body.reception_reasons;
    const size = reqBody.body.size;
    const fromCount = reqBody.body.from_count;

    //
    // 本来はサーバーサイドでやる処理
    //
    let response = getResponse;

    // 法務局受付日
    if (
      legalAffairsBureauRequestDateStart != null &&
      legalAffairsBureauRequestDateEnd != null
    ) {
      response = response.filter((item) => {
        const parsedResponseDate = parse(
          item.legal_affairs_bureau_request_date,
          "yyyy-MM-dd",
          new Date()
        );
        const parsedDateStart = parse(
          legalAffairsBureauRequestDateStart,
          "yyyy-MM-dd",
          new Date()
        );
        const parsedDateEnd = parse(
          legalAffairsBureauRequestDateEnd,
          "yyyy-MM-dd",
          new Date()
        );
        const isAfter_ =
          isAfter(parsedResponseDate, parsedDateStart) ||
          isSameDay(parsedResponseDate, parsedDateStart);

        const isBefore_ =
          isBefore(parsedResponseDate, parsedDateEnd) ||
          isSameDay(parsedResponseDate, parsedDateEnd);

        return isAfter_ && isBefore_;
      });
    }
    // 申請種別
    const selectedRealEstateBookType = [] as number[];
    if (realEstateBookTypeTandoku != null) {
      selectedRealEstateBookType.push(3);
    }
    if (realEstateBookTypeRensakiRenzoku != null) {
      selectedRealEstateBookType.push(2);
      selectedRealEstateBookType.push(1);
    }
    if (selectedRealEstateBookType.length !== 0) {
      response = response.filter(
        (item) =>
          item.real_estate_book_type_id !== null &&
          selectedRealEstateBookType.includes(item.real_estate_book_type_id)
      );
    }
    // 不動産種別
    const selectedRealEstateType = [] as number[];
    if (realEstateTypeTochi != null) {
      selectedRealEstateType.push(2);
    }
    if (realEstateTypeKutate != null) {
      selectedRealEstateType.push(3);
    }
    if (realEstateTypeTatemono != null) {
      selectedRealEstateType.push(1);
    }
    if (realEstateTypeKyotan != null) {
      selectedRealEstateType.push(4);
    }
    if (selectedRealEstateType.length !== 0) {
      response = response.filter(
        (item) =>
          item.real_estate_type_id != null &&
          selectedRealEstateType.includes(item.real_estate_type_id)
      );
    }
    // 市区町村
    const parsedCities =
      cities !== null ? cities : null;
    if (parsedCities != null && parsedCities.length !== 0) {
      response = response.filter((item) =>
        parsedCities.includes(String(item.city_id))
      );
    }
    // 登記原因
    const parsedReceptionReasons =
      receptionReasons !== null
        ? (receptionReasons) : null;
    if (parsedReceptionReasons != null && parsedReceptionReasons.length !== 0) {
      const isSelectedOthers = parsedReceptionReasons.includes("999");
      const selectedReceptionReasonsText = receptionReasonOptions
        .filter((item) => parsedReceptionReasons.includes(item.id.toString()))
        .map((item) => item.name);

      const allReceptionReasonsText = receptionReasonOptions.map(
        (item) => item.name
      );

      if (isSelectedOthers) {
        response = response.filter(
          (item) =>
            selectedReceptionReasonsText.includes(item.reception_reason) ||
            !allReceptionReasonsText.includes(item.reception_reason)
        );
      } else {
        response = response.filter((item) =>
          selectedReceptionReasonsText.includes(item.reception_reason)
        );
      }
    }

    const limitedResponse = response.slice(
      Number(fromCount),
      Number(fromCount) + Number(size)
    );

    return await res(
      ctx.status(200),
      ctx.json({ list: limitedResponse, count: response.length })
    );
  }),
  rest.get("/real-estate-book/import-status", async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json({ list: importStatuses }));
  }),
];
