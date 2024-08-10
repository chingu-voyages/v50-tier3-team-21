import {useMutation} from "@tanstack/react-query";
const getSelectedLocation = async ( id: string) => {
    const response = await fetch(`https://api.mapbox.com/search/searchbox/v1/retrieve?${id}&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}` );
    return response.json();
}



export const useRetrieveSelectedLocation = () => {
    return useMutation({
            mutationKey: ['location'],
            mutationFn: (id: string) => getSelectedLocation(id),

        }
    )
}
