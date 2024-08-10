import {useContext} from "react";
import {PaymentContext , PaymentContextType} from "../provider/payment.provider.tsx";


export const usePaymentContext = () => useContext<PaymentContextType>(PaymentContext)
