import {usePaymentContext} from "../../hooks/payment.hook.ts";
import {useMakePayment} from "../../services/api/payment/mutations.ts";
import {useModal} from "../../hooks/modal.hook.ts";
import {useEffect , useMemo} from "react";
import PrimaryButton from "../ui/button.tsx";
import Modal from "./modal.tsx";
import {SuccessMessage} from "./success-message.tsx";

export const PaymentFooter = () => {
    const { total} = usePaymentContext();
    return(
        <div className="w-full flex justify-between items-center py-5 ">
            <div className="font-bold text-lg">
                <span>Total cost: <strong className="ml-2">${total}</strong></span>
            </div>
            <PaymentAction />
        </div>

    )
}

export const PaymentAction = () => {
    const { total, account} = usePaymentContext();
    const {mutate: makePayment, isPending, isSuccess } = useMakePayment();
    const {modal, handleOnCloseModal, handleOnOpenModal} = useModal()
    const isDisable = useMemo(() => {
        if(total && account) {
            return account.balance < total
        }
        return  true
    }, [total, account])
    const handleProcessPayment = () => {
        makePayment(
            {
                amount: total,
                orderId: 29
            }
        )
    }
    useEffect(() => {
        if(isSuccess) {
            handleOnOpenModal()
        }
    }, [isSuccess])
    return(
        <div className="flex items-center gap-3">
            <PrimaryButton variant="outline">
                CANCEL ORDER
            </PrimaryButton>
            <PrimaryButton
                isLoading={isPending}
                onClick={handleProcessPayment}
                className={`${isDisable ? "bg-opacity-30 pointer-events-none": "" }`}>
                PAY NOW
            </PrimaryButton>
            <Modal handleOnCloseModal={handleOnCloseModal} isOpen={modal} >
                <SuccessMessage />
            </Modal>
        </div>
    )
}
