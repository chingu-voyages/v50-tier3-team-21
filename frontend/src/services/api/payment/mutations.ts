import {useMutation} from "@tanstack/react-query";
import {MakePaymentDto , paymentService} from "./payment.service.ts";


export const useMakePayment = () => {
    return useMutation({
         mutationKey: ['payment'],
         mutationFn: (data: MakePaymentDto) => paymentService.makePayment(data)
    })
}

