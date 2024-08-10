import {usePaymentContext} from "../../hooks/payment.hook.ts";
import {useMakePayment} from "../../services/api/payment/mutations.ts";
import {useModal} from "../../hooks/modal.hook.ts";
import {useEffect , useMemo} from "react";
import PrimaryButton from "../ui/button.tsx";
import Modal from "./modal.tsx";
import {SuccessMessage} from "./success-message.tsx";
import {notify} from "../ui/toast.tsx";
import {isAxiosError} from "../../utils";
import {useCancelOrder} from "../../services/api/orders/mutations.ts";


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
    const { total, account, orderInfo} = usePaymentContext();
    const {mutate: makePayment, isPending, isSuccess , isError, error} = useMakePayment();
    const {modal, handleOnCloseModal, handleOnOpenModal} = useModal();
    const isDisable = useMemo(() => {
        if(total && account) {
            return account.balance < total
        }
        return  true
    }, [total, account])
    const handleProcessPayment = () => {
        if(total && orderInfo.orderId){
            makePayment(
                {
                    amount: total,
                    orderId: orderInfo.orderId
                }
            )
        }

    }
    useEffect(() => {
        if(isSuccess) {
            handleOnOpenModal()
        }
    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            notify({
                message:
                    isAxiosError(error)
                        ? error.response?.data?.message ?? "An error occurred. Please try again later"
                        : "An unexpected error occurred."
            }, 'error')
        }
        if (isSuccess) {
            notify({ message: 'You are logged in successfully' }, 'success')
        }
    }, [isError, isSuccess])
    return(
        <div className="flex items-center gap-3 ">
            <CancelOrderBtn />
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


export const CancelOrderBtn = () => {
    const { orderInfo} = usePaymentContext();
    const {mutate: cancelOrder, isError, error, isPending, isSuccess} = useCancelOrder()
    const handleCancelOrder = () => {
        if(orderInfo.orderId){
             cancelOrder(orderInfo.orderId)
        }
    }
    useEffect(() => {
        if (isError) {
            notify({
                message:
                    isAxiosError(error)
                        ? error.response?.data?.message ?? "An error occurred. Please try again later"
                        : "An unexpected error occurred."
            }, 'error')
        }
        if (isSuccess) {
            notify({ message: 'You are logged in successfully' }, 'success')
        }
    }, [isError])
  return(
      <PrimaryButton isLoading={isPending} variant="outline" onClick={handleCancelOrder}>
          CANCEL ORDER
      </PrimaryButton>
  )
}
