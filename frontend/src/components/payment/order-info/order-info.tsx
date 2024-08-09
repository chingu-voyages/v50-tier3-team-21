import {OrderInfoItem} from "./order-info-item.tsx";
import {usePaymentContext} from "../../../hooks/payment.hook.ts";


export const OrderInfo = ({ deliveryAddress, price , deliveryFee}) => {
    const { total} = usePaymentContext()
    return(
        <div className="text-dark">
            <h3 className="text-gray-600 text-sm mb-1">Delivery Location</h3>
            <p className="font-bold mb-4">{deliveryAddress}</p>
            <OrderInfoItem title="Subtotal" value={price}/>
            <OrderInfoItem title="Delivery fee" value={deliveryFee} />
            <OrderInfoItem title="Total" value={total} isStrong={true}/>
        </div>
    )
}
