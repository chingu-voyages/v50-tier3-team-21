import React , {createContext , useCallback , useContext , useMemo , useState} from "react";
import {Category , FilterOptions , FoodItem , RestaurantWithImage} from "../services/api/interctive-map/interface.ts";
import {useGetFoodItemsWithRestaurants} from "../services/api/interctive-map/queries.ts";
import {useGeoLocation} from "../hooks";
import {useModal} from "../hooks/modal.hook.ts";
import {haversineDistance} from "../utils/geospatial.ts";
import {useAddressSearch} from "../components/interactive-map/address-search-provider.tsx";




const AppMapContext = createContext<AppMapContextType>({} as AppMapContextType);

export interface DistancePriceFilters {
    distance?: number;
    price?: number;
}
interface AppMapContextType {
    restaurants: RestaurantWithImage[] | [],
    countries: string[] | [],
    categories: Category[] | []
    selectedRestaurantId: number,
    handleSelectRestaurant: (id: number) => void,
    updateFilterOptions: (options: Partial<FilterOptions>) => void,
    updateDistancePriceFilters: (options: Partial<DistancePriceFilters>) => void,
    isFilterModalOpen: boolean,
    handleOnOpenModal: () => void,
    handleOnCloseModal: () => void,
    filterOptions: FilterOptions,
    distancePriceFilters: DistancePriceFilters,
    geoLocation: {
        lat: number,
        long: number,
    }

}

type AppMapProviderType = {
    children: React.ReactNode
}
export const AppMapProvider = ({ children }: AppMapProviderType) => {
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        foodItemId: undefined,
        categoryId: undefined,
        restaurantId: undefined,
        country: undefined,
    });
    const [distancePriceFilters, setDistancePriceFilters] = useState<DistancePriceFilters>({
        distance: undefined,
        price: undefined,
    });

    const [seletectedRestaurantId, setSelectedRestaurantId] = useState<number>(-1);
    const {data: foodItemsWithRestaurants, isSuccess} = useGetFoodItemsWithRestaurants(filterOptions);
    const { location } = useGeoLocation();
    const {selectedLocation} = useAddressSearch()
    const { handleOnOpenModal, modal, handleOnCloseModal} = useModal();


    const restaurants = useMemo(() => {
        if (!isSuccess || !foodItemsWithRestaurants?.data?.data) {
            return [];
        }

        const userCoords = [
            selectedLocation?.coordinates?.latitude ?? 48.00,
            selectedLocation?.coordinates?.longitude ?? -78.00
        ];

        const uniqueRestaurants: { [key: number]: RestaurantWithImage } = {};

        foodItemsWithRestaurants.data.data.forEach(item => {
            const { latitude, longitude } = item.restaurant;
            const restaurantCoords = [latitude, longitude];
            const distance = haversineDistance(restaurantCoords, userCoords);

            const meetsPriceCriteria = distancePriceFilters.price === undefined || item.price <= distancePriceFilters.price ;
            const meetsDistanceCriteria = distancePriceFilters.distance === undefined || distance <= distancePriceFilters.distance;

            if (meetsPriceCriteria && meetsDistanceCriteria) {
                if (!uniqueRestaurants[item.restaurant.id]) {
                    uniqueRestaurants[item.restaurant.id] = {
                        ...item.restaurant,
                        imageUrl: item.imageUrl,
                        price: item.price
                    };
                }
            }
        });

        return Object.values(uniqueRestaurants);
    }, [foodItemsWithRestaurants, isSuccess,distancePriceFilters.price, distancePriceFilters.distance, selectedLocation?.coordinates]);


    const uniqueCountries = useMemo(() => {
        if (!isSuccess || !foodItemsWithRestaurants?.data) return [];
        const countriesSet = new Set(foodItemsWithRestaurants.data.data.map(item => item.restaurant.country));
        return Array.from(countriesSet);
    }, [foodItemsWithRestaurants, isSuccess]);

    const uniqueCategories = useMemo(() => {
        if (!isSuccess || !foodItemsWithRestaurants?.data) return [];
        const categoriesSet = new Map<number, Category>();

        foodItemsWithRestaurants.data.data.forEach((item: Omit<FoodItem, 'categories'> & { Categories: Category[]}) => {
            if(item.Categories.length > 0){
                item.Categories.forEach((cat: Category) => {
                    if (!categoriesSet.has(cat.id)) {
                        categoriesSet.set(cat.id, cat);
                    }
                });
            }

        });

        return Array.from(categoriesSet.values());
    }, [foodItemsWithRestaurants, isSuccess]);

    const updateFilterOptions = useCallback((options: Partial<FilterOptions>) => {
        setFilterOptions(prevState => ({
            ...prevState ,
            ...options
        }))},[])
    const updateDistancePriceFilters = useCallback((options: Partial<DistancePriceFilters>) => {
        setDistancePriceFilters(prevState => ({
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
                updateDistancePriceFilters,
                filterOptions,
                distancePriceFilters,
                handleOnCloseModal,
                handleOnOpenModal,
                categories: uniqueCategories,
                countries: uniqueCountries,
                isFilterModalOpen: modal,
        }}>
            {children}
        </AppMapContext.Provider>
    );
};

export const useAppMapContext = () => useContext(AppMapContext);
