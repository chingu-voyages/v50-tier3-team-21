export interface FilterOptions {
    foodItemId?: number,
    categoryId?: number,
    restaurantId?: number,
    country?: string,
}




export interface Restaurant {
    id: number;
    name: string;
    country: string;
    longitude: number;
    latitude: number;
    createdAt: string;
    updatedAt: string;
}

export interface RestaurantWithImage extends  Restaurant {
    imageUrl: string,
    price: number,
}

export interface Category {
    id: number;
    name: string;
    displayName: string,
    createdAt: string;
    updatedAt: string;
}

export interface FoodItem {
    id: number;
    name: string;
    imageUrl: string;
    restaurantId: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    restaurant: Restaurant;
    categories: Category[];
}
