import {useCallback ,useState} from "react";



interface ICoordinate {
    lat: number,
    long: number
}
export  const useGeoLocation = () => {
    const [viewport, setViewport] = useState<ICoordinate>({} as ICoordinate);
    const getUserLocation = useCallback(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setViewport({
                lat: position.coords.latitude,
                long: position.coords.longitude
            });
        }, (error) => {
            console.error("Error getting location: ", error);
        });
    },[]);
    const setLocationEmpty = () => {
        setViewport({} as ICoordinate)
    }
    return { location: viewport , getUserLocation, setLocationEmpty}
}
