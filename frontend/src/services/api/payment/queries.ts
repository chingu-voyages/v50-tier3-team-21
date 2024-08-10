import {useQuery} from "@tanstack/react-query";
import {paymentService} from "./payment.service.ts";



export const useGetAccount = () => {
   return useQuery({
       queryKey: ['account'],
       queryFn: () => paymentService.getAccount(),
   })
}
