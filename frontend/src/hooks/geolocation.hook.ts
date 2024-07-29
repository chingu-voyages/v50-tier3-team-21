import {useEffect , useState} from "react";
import {useMap} from "react-map-gl";


interface ICoordinate {
    lat: number,
    long: number
}
export  const useGeoLocation = () => {
    const [viewport, setViewport] = useState<ICoordinate>({} as ICoordinate);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            setViewport({
                ...viewport,
                lat: position.coords.latitude,
                long: position.coords.longitude
            })
        })
    }, [])
    return { location: viewport }
}
