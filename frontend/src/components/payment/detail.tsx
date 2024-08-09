import {FormLabel} from "../authentication/form-label.tsx";
import {Picks} from "./picks/picks.tsx";
import {OrderInfo} from "./order-info/order-info.tsx";
import {usePaymentContext} from "../../hooks/payment.hook.ts";
import {useMemo} from "react";




export const Detail = () => {
    const { orderInfo, updateOrderInfo} = usePaymentContext();
    const subtotal = useMemo(() => {
        if(orderInfo.tip && orderInfo.price){
            return orderInfo.tip + orderInfo.price
        }
        return orderInfo.price
    }, [orderInfo])

  return(
      <aside className="w-full  flex flex-col gap-8">
          <div className="w-full flex flex-col gap-4">
              <h3 className=" text-xl">Leave a Tip</h3>
              <div className="flex flex-col gap-2">
                  <FormLabel htmlFor="tip" label='Enter Amount' className="text-sm text-gray-700 font-light" />
                  <input
                      value={orderInfo?.tip}
                      min={0}
                      onChange={(e) => updateOrderInfo("tip", parseInt(e.target.value))}
                      className="w-full px-3 py-2 z-10 border rounded-lg placeholder:font-light placeholder:text-[0.8em] focus:outline-0"
                      id="tip"
                      type="number"
                      placeholder="0"

                  />
              </div>
              <p className="text-sm text-gray-700">Or choose one pick below</p>
              <Picks />
              <div className="border-b-2" />
              {
                  orderInfo &&
                  <OrderInfo
                      deliveryAddress={orderInfo?.deliveryAddress}
                      price={subtotal}
                      deliveryFee={orderInfo?.deliveryFee}
                  />
              }
          </div>
      </aside>
  )
}










