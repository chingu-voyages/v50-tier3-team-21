import {useQuery} from "@tanstack/react-query";
import {orderService} from "./order.service.ts";
import {OrderData} from "./interface.ts";
import {AxiosError} from "axios";


export interface OrderResponse {
    data: {
        data: OrderData;
    }
}

export const useGetOrder = (orderId: number) => {
    return useQuery<OrderResponse, AxiosError>({
        queryKey: ['get-order', orderId],
        queryFn: () => orderService.getOrder(orderId),
        enabled: !!orderId,
    });
};
