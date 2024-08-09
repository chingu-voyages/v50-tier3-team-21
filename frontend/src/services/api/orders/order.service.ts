import {httpClient} from "../../../lib/http-client.ts";

class OrderService {
    public getOrder(orderId: number) {
        return httpClient.get(`/order/get-order/${orderId}`)
    }
}


export const orderService = new OrderService();
