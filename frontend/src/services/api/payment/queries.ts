import {useQuery} from "@tanstack/react-query";
import {paymentService} from "./payment.service.ts";
import {IResponseWithData} from "../../../types/api-response.types.ts";
import {Account} from "./interface.ts";
import {AxiosError} from "axios";



export const useGetAccount = () => {
   return useQuery<IResponseWithData<Account>, AxiosError>({
       queryKey: ['account'],
       queryFn: () => paymentService.getAccount(),
   })
}
