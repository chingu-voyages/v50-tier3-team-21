import {useQuery} from "@tanstack/react-query";
import {FilterOptions } from "./interface.ts";
import {restaurantService} from "./restaurant.service.ts";



//interface ApiResponse<T> {
    //data: T
//}

export const useGetFoodItemsWithRestaurants = (filterOptions: FilterOptions) => {
   return useQuery({
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

