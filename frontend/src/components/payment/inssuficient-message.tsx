import {usePaymentContext} from "../../hooks/payment.hook.ts";
import {useMemo} from "react";

export const InsufficientMessage = () => {
    const {account, total} = usePaymentContext();
    const isBalanceSufficient = useMemo(() => {
        if(total && account) {
            return account.balance > total
        }
        return  true
    }, [total, account])
    if(isBalanceSufficient){
        return  null
    }
   return(
       <div className="text-danger text-sm flex items-center gap-2">
            <span className="icon-[solar--danger-triangle-line-duotone] text-lg" />
            <p>Insufficient balance to pay for your order </p>
       </div>

   )
}
