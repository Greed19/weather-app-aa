import { Coordinates } from "@/api/types";
import { weatherPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
    weather: (coords: Coordinates) => ['weather', coords] as const,
    forecast: (coords: Coordinates) => ['forecast', coords] as const,
    location: (coords: Coordinates) => ['location', coords] as const,
    search: (query: string) => ['location-search', query] as const,
} as const

export function useWeatherQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates
    })
}
export function useForecastQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherPI.getForecast(coordinates) : null,
        enabled: !!coordinates
    })
}
export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherPI.reverseGeocode(coordinates) : null,
        enabled: !!coordinates
    })
}
export function useLocationSearch(query: string) {
    return useQuery({
        queryKey: WEATHER_KEYS.search(query),
        queryFn: () => weatherPI.searchLocations(query),
        enabled: query.length >= 3,
    });
}