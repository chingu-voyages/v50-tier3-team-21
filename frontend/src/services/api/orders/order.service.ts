import {httpClient} from "../../../lib/http-client.ts";

class OrderService {
    public getOrder(orderId: number) {
        return httpClient.get(`/order/get-order/${orderId}`)
    }
    public cancelOrder(orderId: number) {
        return httpClient.put<number>(`/order/cancel/${orderId}`, orderId)
    }
}


export const orderService = new OrderService();
