import {httpClient} from "../../../lib/http-client.ts";
import {MakePaymentDto} from "./interface.ts";






 class PaymentService {
    public  makePayment(data: MakePaymentDto) {
       return httpClient.post<MakePaymentDto>('/wallets/makePayment', data)
    }

    public getAccount(){
        return httpClient.get('/wallets')
    }
}



export  const paymentService = new PaymentService();
