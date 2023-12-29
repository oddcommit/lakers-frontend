import { useApiClient } from "../../../hooks/useApiClient";
import useSWR from "swr";
import { type ICityResponse, type ICityParams } from "../types";

export const useCityOptions = (): ICityParams => {
  const { apiClient } = useApiClient();

  // swrに引き渡すfetcher
  const fetcher = async (url: string): Promise<ICityResponse> => {
    const { data } = await apiClient.get<ICityResponse>(url);
    return data;
  };

  const { data: cityOptions } = useSWR("/option/city", fetcher);

  if (cityOptions === undefined) {
    return { cityParams: [] }
  }
  return { cityParams: cityOptions.list };
};
