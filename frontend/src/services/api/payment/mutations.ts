import {useMutation} from "@tanstack/react-query";
import {paymentService} from "./payment.service.ts";
import {MakePaymentDto} from "./interface.ts";


export const useMakePayment = () => {
    return useMutation({
         mutationKey: ['payment'],
         mutationFn: (data: MakePaymentDto) => paymentService.makePayment(data)
    })
}

