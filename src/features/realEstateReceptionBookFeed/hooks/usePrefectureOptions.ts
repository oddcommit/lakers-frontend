import { useApiClient } from "../../../hooks/useApiClient";
import { type ISelectObject } from "../../../types/select";
import useSWR from "swr";
import { type IPrefectureResponse } from "../types";


interface IUsePrefectureOptionsReturnType {
  prefectureOptions: ISelectObject[];
}

export const usePrefectureOptions = (): IUsePrefectureOptionsReturnType => {
  const { apiClient } = useApiClient();

  // swrに引き渡すfetcher
  const fetcher = async (url: string): Promise<IPrefectureResponse> => {
    const { data } = await apiClient.get<IPrefectureResponse>(url);
    return data;
  };

  // IPrefectureResponseをISelectObject[]に変換する関数
  const toSelectObjectList = (
    data: IPrefectureResponse | undefined
  ): ISelectObject[] => {
    if (data === undefined) return [];
    return data.list.map((prefecture) => ({
      value: prefecture.id.toString(),
      label: prefecture.name,
    }));
  };

  const { data: prefectureOptions } = useSWR("/option/prefecture", fetcher);

  return {
    prefectureOptions: toSelectObjectList(prefectureOptions),
  };
};

