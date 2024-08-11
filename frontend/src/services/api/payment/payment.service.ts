import {httpClient} from "../../../lib/http-client.ts";
import {Account , MakePaymentDto} from "./interface.ts";
import {IResponseWithData} from "../../../types/api-response.types.ts";



 class PaymentService {
    public  makePayment(data: MakePaymentDto) {
       return httpClient.post<MakePaymentDto>('/wallets/makePayment', data)
    }

    public getAccount(): Promise<IResponseWithData<Account>> {
        return httpClient.get('/wallets')
    }
}



export  const paymentService = new PaymentService();
