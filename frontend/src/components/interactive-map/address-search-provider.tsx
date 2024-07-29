import React , {createContext , useCallback , useContext , useState} from "react";
import {useMap} from "react-map-gl";

const AddressSearchContext = createContext<AddressSearchContextType>({} as AddressSearchContextType);

interface AddressSearchContextType {
    selectedLocation: ISelectedLocation,
    handleSelectLocation: (data: ISelectedLocation) => void,
    handleSearchQuery: (query: string) => void,
    flyTo: () => void,
    isOpen: boolean,
    query: string,
}
interface ISelectedLocation {
    name?: string,
    coordinates: {
        longitude: number,
        latitude: number
    }
}
export interface ISearchResult {
    features: ISuggestion[]
}

interface ISuggestion {
    properties: {
        place_formatted: string,
        name: string,
        full_address: string,
        coordinates: {
            longitude: string,
            latitude: string
        }
    }
}
export const AddressSearchProvider = ({ children }) => {
    const [selectedLocation, setSelectedLocation] = useState({} as ISelectedLocation);
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen ] = useState<boolean>(true);
    const {mapA}= useMap()
    const handleSelectLocation = useCallback((data: ISelectedLocation) => {
       setSelectedLocation(data);
       setQuery(data.name!)
       setIsOpen(false)
    }, [])
    const handleSearchQuery = useCallback((query: string) =>  {
        setQuery(query)
        setIsOpen(true)
    },[query])

    const handleFlyTo = () => {
        console.log(selectedLocation)
        if(selectedLocation){
            if (mapA) {
                mapA.flyTo({
                    center: [
                        selectedLocation.coordinates.longitude ,
                        selectedLocation.coordinates.latitude ,
                    ]
                })
            }
        }
    }

    return (
        <AddressSearchContext.Provider value={{selectedLocation, handleSelectLocation, query, handleSearchQuery, isOpen, flyTo: handleFlyTo}}>
            {children}
        </AddressSearchContext.Provider>
    );
};

export const useAddressSearch = () => useContext(AddressSearchContext);
