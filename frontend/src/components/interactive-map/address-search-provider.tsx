import React , {createContext , useCallback , useContext , useState} from "react";

const AddressSearchContext = createContext<AddressSearchContextType>({} as AddressSearchContextType);

interface AddressSearchContextType {
    selectedLocation: ISelectedLocation,
    handleSelectLocation: (data: ISelectedLocation) => void,
    handleSearchQuery: (query: string) => void,
    isOpen: boolean
    query: string
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
    const [isOpen, setIsOpen ] = useState<boolean>(true)
    const handleSelectLocation = useCallback((data: ISelectedLocation) => {
       setSelectedLocation(data);
       setQuery(data.name!)
       setIsOpen(false)
    }, [])
    const handleSearchQuery = useCallback((query: string) =>  {
        setQuery(query)
        setIsOpen(true)
    },[query])

    return (
        <AddressSearchContext.Provider value={{selectedLocation, handleSelectLocation, query, handleSearchQuery, isOpen}}>
            {children}
        </AddressSearchContext.Provider>
    );
};

export const useAddressSearch = () => useContext(AddressSearchContext);
