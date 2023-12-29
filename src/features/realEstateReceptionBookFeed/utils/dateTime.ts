/**
* 検索の開始日および終了日を取得する
* @param nowDate - 取得対象となる日付の基準日 デフォルトでは現在時刻が取得される
* @returns - 検索開始日と終了日
*/
export const getStartAndEndDate = (nowDate: Date = new Date()): [Date, Date] => {
    const year = nowDate.getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, nowDate.getMonth() + 1, 0);
    return [startDate, endDate];
}


/**
* 検索可能な日付の一番前の日付を取得する
* @returns - 検索可能な日付の一番前の日付
*/
export const getSearchMinDate = (): Date => {
    return new Date(2022, 0, 1)
}