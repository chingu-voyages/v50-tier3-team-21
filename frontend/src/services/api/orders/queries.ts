import {useQuery} from "@tanstack/react-query";
import {orderService} from "./order.service.ts";
import {AxiosResponse} from "axios";
import {OrderData} from "./interface.ts";


export const useGetOrder = (orderId: number) => {
    return useQuery<AxiosResponse<OrderData>>({
        queryKey: ['get-order', orderId],
        queryFn: () => orderService.getOrder(orderId),
        enabled: !!orderId
    })
}
