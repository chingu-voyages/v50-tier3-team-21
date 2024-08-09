import {useQuery} from "@tanstack/react-query";
import {paymentService} from "./payment.service.ts";
import {AxiosError , AxiosResponse} from "axios";
import {Account} from "./interface.ts";


export const useGetAccount = () => {
   return useQuery<AxiosResponse<Account, AxiosError>>({
       queryKey: ['account'],
       queryFn: () => paymentService.getAccount(),

   })
}
