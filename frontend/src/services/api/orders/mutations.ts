import {useMutation} from "@tanstack/react-query";
import {orderService} from "./order.service.ts";


export const useCancelOrder = () => {
   return useMutation({
       mutationFn: (orderId: number) => orderService.cancelOrder(orderId)
   })
}
