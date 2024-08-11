import {httpClient} from "../../../lib/http-client.ts";
import {FilterOptions , FoodItem} from "./interface.ts";
import {IResponseWithData} from "../../../types/api-response.types.ts";




class RestaurantService {

    public getNearByRestaurants(latitude: number, longitude: number) {
        return httpClient.get(`/nearbyrestaurants?latitude=${latitude}&longitude=${longitude}`)
    }

    public getFoodItems(filterOptions: FilterOptions): Promise<IResponseWithData<FoodItem[]>> {
        const searchParams: Record<string, any> = new URLSearchParams();
        Object.keys(filterOptions).forEach(key => {
            const value = filterOptions[key as keyof FilterOptions];
            if (value !== undefined) {
                searchParams.append(key, value.toString());
            }
        });

        return httpClient.get('/fooditems/items?' + searchParams.toString())
    }
}

export const restaurantService = new RestaurantService();
