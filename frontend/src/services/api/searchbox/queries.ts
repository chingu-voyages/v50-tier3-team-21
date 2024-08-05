import {useQuery} from "@tanstack/react-query";
import {ISearchResult} from "../../../components/interactive-map/address-search-provider.tsx";


const getSuggestions = async (sessionToken: string, location) => {
    const response = await fetch(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${location}&session_token=${sessionToken}&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}` );
    return response.json();
}

const getReverseGeoCoding = async (longitute: string, latitude: string) => {
    const response = await fetch(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitute}&latitude=${latitude}&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`);
    return response.json();
}


const getSelectedLocation = async (query: name) => {
    const response = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${query}&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`);
    return response.json();
}


export const useGetSuggestions = (sessionToken: string, location: string) => {
   return useQuery({
       queryKey: [location],
       queryFn: () => getSuggestions(sessionToken,location),
       enabled: location != ""
   }
   )
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





