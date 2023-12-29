import { useApiClient } from "../../../hooks/useApiClient";
import { type ISelectObject } from "../../../types/select";
import useSWRImmutable from "swr/immutable";
import { type IReceptionReasonResponse } from "../types";

interface IUseReceptionReasonOptionsReturnType {
  receptionReasonOptions: ISelectObject[];
}

export const useReceptionReasonOptions =
  (): IUseReceptionReasonOptionsReturnType => {
    const { apiClient } = useApiClient();

    // swrに引き渡すfetcher
    const fetcher = async (url: string): Promise<IReceptionReasonResponse> => {
      const { data } = await apiClient.get<IReceptionReasonResponse>(url);
      return data;
    };

    // IReceptionReasonResponseをISelectObject[]に変換する関数
    const toSelectObjectList = (
      data: IReceptionReasonResponse | undefined
    ): ISelectObject[] => {
      if (data === undefined) return [];
      return data.list.map((receptionReason) => ({
        value: receptionReason.id.toString(),
        label: receptionReason.name,
      }));
    };

    const { data: receptionReasonOptions } = useSWRImmutable(
      "/option/reception-reason",
      fetcher
    );
    
    return {
      receptionReasonOptions: toSelectObjectList(receptionReasonOptions),
    };
  };
