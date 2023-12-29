import { renderHook, waitFor } from "@testing-library/react";
import { useCityOptions } from "../useCityOptions";
import { useCitySelect } from "../useCitySelect";


describe("useCityOptions", () => {
  it("都市を指定しない場合でデータを取得する場合(モックの東京都のデータが3件以上あるのでそれが前提)", async () => {
    const { result } = renderHook(() => useCityOptions());

    await waitFor(() => {
      // 市区町村が1件以上取得できること(本来はここをテストにする必要はないけどダミーのコードとして追加)
      expect(result.current.cityParams.length).toBeGreaterThan(0);
    });
      
    const prefectures: string[] = [];


    const { cityOptions } = useCitySelect(prefectures, result.current.cityParams);

      
    // 市区町村が{ label, value }の形式で保持されていること
    expect(cityOptions[0]).toStrictEqual({
      value: "655",
      label: "千代田区"
    });
    expect(cityOptions[1]).toStrictEqual({
      value: "656",
      label: "中央区",
    });
    expect(
      cityOptions[cityOptions.length - 3]
    ).toStrictEqual({
      value: "717",
      label: "横浜市青葉区",
    });
    expect(
      cityOptions[cityOptions.length - 2]
    ).toStrictEqual({
      value: "718",
      label: "さいたま市大宮区",
    });
    expect(
      cityOptions[cityOptions.length - 1]
    ).toStrictEqual({
      value: "9999",
      label: "不明",
    });
  });
    it("都市を1つ指定する場合でデータを取得する場合(神奈川県)", async () => {
        const { result } = renderHook(() => useCityOptions());


        await waitFor(() => {
          // 市区町村が1件以上取得できること(本来はここをテストにする必要はないけどダミーのコードとして追加)
          expect(result.current.cityParams.length).toBeGreaterThan(0);
        });
      
        const prefectures: string[] = ["14"];


        const { cityOptions } = useCitySelect(prefectures, result.current.cityParams);

      
        // 市区町村が{ label, value }の形式で保持されていることかつ神奈川県のみ取得できていること
        expect(cityOptions[0]).toStrictEqual({
            value: "717",
            label: "横浜市青葉区",
        });
        expect(cityOptions.length).toEqual(1)
    });
    it("都市を1つ指定する場合でデータを取得する場合(埼玉県)", async () => {
        const { result } = renderHook(() => useCityOptions());

        await waitFor(() => {
            // 市区町村が1件以上取得できること
            expect(result.current.cityParams.length).toBeGreaterThan(0);
        });
      
        const prefectures: string[] = ["12"];


        const { cityOptions } = useCitySelect(prefectures, result.current.cityParams);

      
        // 市区町村が{ label, value }の形式で保持されていることかつ埼玉県のみ取得できていること
        expect(cityOptions[0]).toStrictEqual({
            value: "718",
            label: "さいたま市大宮区",
        });
        expect(cityOptions.length).toEqual(1)
    });
    it("都市を1つ指定する場合でデータを取得する場合(埼玉県と神奈川県)", async () => {
        const { result } = renderHook(() => useCityOptions());


        await waitFor(() => {
          // 市区町村が1件以上取得できること(本来はここをテストにする必要はないけどダミーのコードとして追加)
            expect(result.current.cityParams.length).toBeGreaterThan(0);
        });
      
        const prefectures: string[] = ["12", "14"];


        const { cityOptions } = useCitySelect(prefectures, result.current.cityParams);

      
        // 市区町村が{ label, value }の形式で保持されていることかつ埼玉県と神奈川県のみ取得できていること
        expect(cityOptions[0]).toStrictEqual({
            value: "717",
            label: "横浜市青葉区",
        });
        expect(cityOptions[1]).toStrictEqual({
            value: "718",
            label: "さいたま市大宮区",
        });
        expect(cityOptions.length).toEqual(2)
    });

});