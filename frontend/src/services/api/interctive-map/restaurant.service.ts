import {httpClient} from "../../../lib/http-client.ts";
import {FilterOptions , FoodItem} from "./interface.ts";
import {AxiosResponse} from "axios";




class RestaurantService {

    public getNearByRestaurants(latitude: number, longitude: number) {
        return httpClient.get(`/nearbyrestaurants?latitude=${latitude}&longitude=${longitude}`)
    }

    public getFoodItems(filterOptions: FilterOptions): Promise<AxiosResponse<FoodItem[]>> {
        const searchParams: Record<string, any> = new URLSearchParams();
        Object.keys(filterOptions).forEach(key => {
            const value = filterOptions[key as keyof FilterOptions];
            if (value !== undefined) {
                searchParams.append(key, value.toString());
            }
        });
        console.log(searchParams)
        return httpClient.get<FoodItem[]>('/fooditems/items?' + searchParams.toString())
    }
}

export const restaurantService = new RestaurantService();
