import { ReactNode } from "react";

export interface MenuItemType {
    id: number;
    name: string;
    imageUrl: string;
    restaurantId: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    restaurant: RestaurantType;
    Categories: CategoryType[];
  }
  
  export type RestaurantType = {
    id: number;
    name: string;
    country: string;
    longitude: number;
    latitude: number;
    createdAt: string;
    updatedAt: string;
  };
  
  export type CategoryType = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    displayName: string;
  };

  export type OrderType = MenuItemType & {
    count?: number;
  };
  

  export interface OrdersProps {
    cart: OrderType[];
    setCart: (cart: OrderType[]) => void;
    children: ReactNode;
  }