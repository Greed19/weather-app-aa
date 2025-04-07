import { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeolocationStates {
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;
}

export function useGeolocation() {
    const [locationData, setLocationData] = useState<GeolocationStates>({
        coordinates: null,
        error: null,
        isLoading: true,
    })

    const getLocation = () => {
        setLocationData(prev => ({
            ...prev,
            isLoading: true,
            error: null
        }))
        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                isLoading: false,
                error: "Geolocation is not supported by your browser"
            })
            return
        }
        navigator.geolocation.getCurrentPosition((position) => {
            setLocationData({
                coordinates: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                error: null,
                isLoading: false
            })
        }, (err) => {
            let errMsg: string;
            const msgObg: Record<string, string> = {
                1: 'Location permission denied. Please enable location access.',
                2: 'Location information is unavailable.',
                3: 'Location request timeout'
            }
            errMsg = msgObg[err.code] ?? 'An unknown error occured';

            // switch (err.code) {
            //     case err.PERMISSION_DENIED:
            //         errMsg = 'Location permission denied. Please enable location access.'
            //         break;
            //     case err.POSITION_UNAVAILABLE:
            //         errMsg = 'Location information is unavailable.'
            //         break;
            //     case err.TIMEOUT:
            //         errMsg = 'Location request timeout'
            //         break;
            //     default:
            //         errMsg = 'An unknown error occured'
            // }

            setLocationData({
                coordinates: null,
                error: errMsg,
                isLoading: false,
            })
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
    }

    useEffect(() => {
        getLocation()
    }, [])

    return {
        ...locationData,
        getLocation
    }
}