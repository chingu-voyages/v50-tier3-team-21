import React , {createContext , useCallback , useContext , useMemo , useState} from "react";
import {FilterOptions , RestaurantWithImage} from "../services/api/interctive-map/interface.ts";
import {useGetFoodItemsWithRestaurants} from "../services/api/interctive-map/queries.ts";
import {useGeoLocation} from "../hooks";
import {useModal} from "../hooks/modal.hook.ts";



const AppMapContext = createContext<AppMapContextType>({} as AppMapContextType);

interface AppMapContextType {
    restaurants: RestaurantWithImage[] | [],
    selectedRestaurantId: number,
    handleSelectRestaurant: (id: number) => void,
    updateFilterOptions: (options: Partial<FilterOptions>) => void,
    isFilterModalOpen: boolean,
    handleOnOpenModal: () => void,
    handleOnCloseModal: () => void,
    geoLocation: {
        lat: number,
        long: number,
    }

}

export const AppMapProvider = ({ children }) => {
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        foodItemId: undefined,
        categoryId: undefined,
        restaurantId: undefined,
        country: undefined
    });
    const [seletectedRestaurantId, setSelectedRestaurantId] = useState<number>(-1);
    const {data: foodItemsWithRestaurants, isLoading, isSuccess} = useGetFoodItemsWithRestaurants(filterOptions);
    const { location } = useGeoLocation();
    const { handleOnOpenModal, modal, handleOnCloseModal} = useModal();
    const restaurants = useMemo(() => {
        if(isSuccess){
            if(!foodItemsWithRestaurants?.data) return []
            const uniqueRestaurants: { [key: number]: RestaurantWithImage } = {};

            foodItemsWithRestaurants.data.data.forEach(item => {
                if(!uniqueRestaurants[item.restaurantId]){
                    uniqueRestaurants[item.restaurantId] = {
                        ...item.restaurant,
                        imageUrl: item.imageUrl
                    }
                }
            })
            return Object.values(uniqueRestaurants);
        }
    }, [foodItemsWithRestaurants])

    const updateFilterOptions = useCallback((options: Partial<FilterOptions>) => {
        setFilterOptions(prevState => ({
            ...prevState ,
            ...options
        }))},[])


    const handleClickMapPoint= (id: number) => {
        setSelectedRestaurantId(id)
    }
    return (
        <AppMapContext.Provider
            value={{
                restaurants,
                selectedRestaurantId: seletectedRestaurantId,
                handleSelectRestaurant: handleClickMapPoint,
                geoLocation: location,
                updateFilterOptions,
                handleOnCloseModal,
                handleOnOpenModal,
                isFilterModalOpen: modal
        }}>
            {children}
        </AppMapContext.Provider>
    );
};

export const useAppMapContext = () => useContext(AppMapContext);
