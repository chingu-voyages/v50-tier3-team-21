import {useQuery} from "@tanstack/react-query";
import {FilterOptions , FoodItem} from "./interface.ts";
import {restaurantService} from "./restaurant.service.ts";
import {AxiosError} from "axios";


export interface ApiResponse {
    data: {
        data: FoodItem[]
    }
}

export const useGetFoodItemsWithRestaurants = (filterOptions: FilterOptions) => {
   return useQuery<ApiResponse, AxiosError>({
       queryKey: ['food_items_restaurants', filterOptions],
       queryFn: () => restaurantService.getFoodItems(filterOptions)
   })
}



export const useGetNearByRestaurants = (latitude: number, longitude: number) => {
    return useQuery({
        queryKey: ['nearby_restaurants', latitude, longitude],
        queryFn: () => restaurantService.getNearByRestaurants(latitude, longitude)
    })
}

