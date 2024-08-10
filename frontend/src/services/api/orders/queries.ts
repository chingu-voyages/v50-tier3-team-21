import {useQuery} from "@tanstack/react-query";
import {orderService} from "./order.service.ts";



export const useGetOrder = (orderId: number) => {
    return useQuery({
        queryKey: ['get-order', orderId],
        queryFn: () => orderService.getOrder(orderId),
        enabled: !!orderId
    })
}
