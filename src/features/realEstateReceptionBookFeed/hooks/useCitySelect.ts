import { type ISelectObject } from "../../../types/select";
import { type ICityObject } from "../types";

export interface IUseCityOptionsReturnType {
  cityOptions: ISelectObject[];
}

export const useCitySelect= (prefectures: string[], cityTarget: ICityObject[]): IUseCityOptionsReturnType => {

  // ICityResponseをISelectObject[]に変換する関数
  const toSelectObjectList = (
    data: ICityObject[] 
  ): ISelectObject[] => {
      if (prefectures.length === 0) {
          return data.
          map((city) => ({
              value: city.id.toString(),
              label: city.name
        }));
      }
      
    return data.filter(
            (city) => prefectures.includes(city.prefCode)).
          map((city) => ({
      value: city.id.toString(),
      label: city.name,
    }));
  };

  return {
    cityOptions: toSelectObjectList(cityTarget),
  };
};
