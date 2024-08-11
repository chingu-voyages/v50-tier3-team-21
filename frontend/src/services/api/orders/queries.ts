import {useQuery} from "@tanstack/react-query";
import {orderService} from "./order.service.ts";
import {OrderData} from "./interface.ts";
import {AxiosError} from "axios";
import {IResponseWithData} from "../../../types/api-response.types.ts";


export const useGetOrder = (orderId: number) => {
    return useQuery<IResponseWithData<OrderData>, AxiosError>({
        queryKey: ['get-order', orderId],
        queryFn: () => orderService.getOrder(orderId),
        enabled: !!orderId,
    });
};
