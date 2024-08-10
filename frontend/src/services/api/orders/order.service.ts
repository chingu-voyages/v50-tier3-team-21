import {httpClient} from "../../../lib/http-client.ts";
import {OrderResponse} from "./queries.ts";

class OrderService {
    public  getOrder(orderId: number): Promise<OrderResponse> {
        return  httpClient.get(`/api/orders/${orderId}`)
    }
    public cancelOrder(orderId: number) {
        return httpClient.put<number>(`/order/cancel/${orderId}`, orderId)
    }
}


export const orderService = new OrderService();
