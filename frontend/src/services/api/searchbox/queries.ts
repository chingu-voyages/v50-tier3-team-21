import {useQuery} from "@tanstack/react-query";
import {ISearchResult} from "../../../components/interactive-map/address-search-provider.tsx";



const getReverseGeoCoding = async (longitute: number, latitude: number) => {
    const response = await fetch(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitute}&latitude=${latitude}&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`);
    return response.json();
}


const getSelectedLocation = async (query: string) => {
    const response = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${query}&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`);
    return response.json();
}


export const useGetLocation = (query: string) => {
    return useQuery({
            queryKey: ['location', query],
            queryFn: () => getSelectedLocation(query),
            enabled: query != ""
        }
    )
}

export const useReverseGeoCoding = (longitude: number, latitude: number) => {
    return useQuery<ISearchResult>({
            queryKey: [longitude, latitude],
            queryFn: () => getReverseGeoCoding(longitude, latitude),
            enabled: !isNaN(longitude) && !isNaN(latitude)
        }
    )
}





