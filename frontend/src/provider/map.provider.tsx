import React , {createContext , useContext , useMemo , useState} from "react";
import {Category , FilterOptions , RestaurantWithImage} from "../services/api/interctive-map/interface.ts";
import {useGetFoodItemsWithRestaurants} from "../services/api/interctive-map/queries.ts";


const AppMapContext = createContext<AppMapContextType>({} as AppMapContextType);

interface AppMapContextType {
    restaurants: RestaurantWithImage[] | [],
    selectedRestaurantId: number,
    handleSelectRestaurant: (id: number) => void

}



export const AppMapProvider = ({ children }) => {
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        foodItemId: undefined,
        categoryId: undefined,
        restaurantId: undefined,
        country: undefined
    });
    const [seletectedRestaurantId, setSelectedRestaurantId] = useState<number>(-1)
    const {data: foodItemsWithRestaurants, isLoading, isSuccess} = useGetFoodItemsWithRestaurants(filterOptions)

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

    const handleClickMapPoint= (id: number) => {
        setSelectedRestaurantId(id)
    }
    return (
        <AppMapContext.Provider value={{ restaurants,selectedRestaurantId: seletectedRestaurantId, handleSelectRestaurant: handleClickMapPoint}}>
            {children}
        </AppMapContext.Provider>
    );
};

export const useAppMapContext = () => useContext(AppMapContext);
