//small , useful function that used in the app

import {AxiosError} from "axios";
import {RestaurantWithImage} from "../services/api/interctive-map/interface.ts";

interface CustomErrorResponse {
    message: string;
}

export const isAxiosError = (error: any): error is AxiosError<CustomErrorResponse> => {
    return error.isAxiosError && error.response?.data;
};



export const getMaxPrice = (restaurants: RestaurantWithImage[]): number => {
    if (restaurants.length === 0) return 0;

    return Math.max(...restaurants.map(restaurant => restaurant.price));
};


export const calculateTotalPrice = (orderData: OrderData): number => {
    const itemTotal = orderData.orderFoodItems.reduce((total, orderItem) => {
        return total + orderItem.item.price * orderItem.quantity;
    }, 0);

    return itemTotal + orderData.deliveryCost + orderData.tip;
};


