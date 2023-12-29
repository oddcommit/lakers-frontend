import { getStartAndEndDate } from "../dateTime"


describe("getStartAndEndDate", () => {
    it("2023年6月10日の開始日は2023年1月1日で終了日が6月30日", () => {
        const [startDate, endDate] = getStartAndEndDate(new Date(2023, 5, 10));
        expect(startDate).toEqual(new Date(2023, 0, 1));
        expect(endDate).toEqual(new Date(2023, 5, 30));
    }
    ) 
    it("閏年ではない2023年2月10日の開始日は2023年1月1日で終了日が2月28日", () => {
        const [startDate, endDate] = getStartAndEndDate(new Date(2023, 1, 10));
        expect(startDate).toEqual(new Date(2023, 0, 1));
        expect(endDate).toEqual(new Date(2023, 1, 28));
    }
    )
    it("閏年の2024年2月10日の開始日は2024年1月1日で終了日が2月29日", () => {
        const [startDate, endDate] = getStartAndEndDate(new Date(2024, 1, 10));
        expect(startDate).toEqual(new Date(2024, 0, 1));
        expect(endDate).toEqual(new Date(2024, 1, 29));
    }
    ) 

})