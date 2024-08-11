import {httpClient} from "../../../lib/http-client.ts";
import {IResponseWithData} from "../../../types/api-response.types.ts";
import {OrderData} from "./interface.ts";

class OrderService {
    public  getOrder(orderId: number): Promise<IResponseWithData<OrderData>> {
        return  httpClient.get(`/order/get-order/${orderId}`)
    }
    public cancelOrder(orderId: number) {
        return httpClient.put<number>(`/order/cancel/${orderId}`, orderId)
    }
}


export const orderService = new OrderService();
