import {useState} from "react";
import {PickItem} from "./pick-item.tsx";
import {usePaymentContext} from "../../../hooks/payment.hook.ts";

const picksItems = [
    {
        amount: 10,
    },
    {
        amount: 15,
    },
    {
        amount: 20,
    },
    {
        amount: 25,
    },
]

export const Picks = () => {
    const [selectedPick, setSelectedPick] = useState(-1);
    const { updateOrderInfo, orderInfo } = usePaymentContext()
    const  handleChoosePick = (amount: number) => {
        setSelectedPick(amount);
        updateOrderInfo('tip', amount);
    }
    return(
        <ul className="flex h-fit justify-between items-center gap-2 ">
            {
                picksItems.map(item => (
                    <PickItem amount={item.amount} key={item.amount} onClick={handleChoosePick} currentPick={selectedPick} total={orderInfo?.price ?? 0} />
                ))
            }
        </ul>
    )
}
