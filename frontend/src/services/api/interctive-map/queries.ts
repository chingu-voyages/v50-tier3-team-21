import {useQuery} from "@tanstack/react-query";
import {FilterOptions , FoodItem} from "./interface.ts";
import {restaurantService} from "./restaurant.service.ts";
import {AxiosError} from "axios";
import {IResponseWithData} from "../../../types/api-response.types.ts";




export const useGetFoodItemsWithRestaurants = (filterOptions: FilterOptions) => {
   return useQuery<IResponseWithData<FoodItem[]>, AxiosError>({
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

