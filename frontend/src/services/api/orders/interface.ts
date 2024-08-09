interface OrderItem {
    id: number;
    orderId: number;
    itemId: number;
    quantity: number;
    item: {
        id: number;
        name: string;
        imageUrl: string;
        restaurantId: number;
        price: number;
    };
}

interface OrderData {
    id: number;
    userId: number;
    deliveryAddress: string;
    deliveryDate: string;
    deliveryTime: string;
    tip: number;
    deliveryCost: number;
    finalized: boolean;
    cancelled: boolean;
    createdAt: string;
    updatedAt: string;
    orderFoodItems: OrderItem[];
}
