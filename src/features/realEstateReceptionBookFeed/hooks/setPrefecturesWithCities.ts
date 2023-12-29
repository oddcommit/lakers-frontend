import { type ICityObject } from "../types";


export const buildPrefectureAndCitySetter = (
    selectedCities: ICityObject[],
    nowCities: string[],
    setCities: (value: React.SetStateAction<string[]>) => void,
    setPrefectures: (value: React.SetStateAction<string[]>) => void
) => {
    return (targetPrefectures: React.SetStateAction<string[]>): void => {
        const selectedCitiesInPrefectures = selectedCities.filter(city => (targetPrefectures as string[]).includes(city.prefCode))
                                                          .map(city => city.id.toString())
        const targetCities = nowCities.filter(city => selectedCitiesInPrefectures.includes(city))
        setCities(targetCities)
        setPrefectures(targetPrefectures)
    }
}