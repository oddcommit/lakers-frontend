import { useApiClient } from "../../../hooks/useApiClient";
import useSWRImmutable from "swr/immutable";
import { type IRealEstateReceptionBookImportStatusResponse, type IRealEstateReceptionBookImportStatusObject } from "../types";


export const useReceptionBookImportStatuses = (): IRealEstateReceptionBookImportStatusObject[] => {
  const { apiClient } = useApiClient();

  // swrに引き渡すfetcher
  const fetcher = async (url: string): Promise<IRealEstateReceptionBookImportStatusResponse> => {
    const { data } = await apiClient.get<IRealEstateReceptionBookImportStatusResponse>(url);
    return data;
  };

  const toObjectList = (
    data: IRealEstateReceptionBookImportStatusResponse | undefined
  ): IRealEstateReceptionBookImportStatusObject[] => {
    if (data === undefined) return [];
    return data.list;
  };

  const { data: importStatuses } = useSWRImmutable("/real-estate-book/import-status", fetcher);

  return toObjectList(importStatuses);
};