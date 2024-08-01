import { Orders } from "../components/restaurant";
import { DeliveryAddress } from "../components/cart/deliveryAddress";
import { useEffect } from "react";

export const CartPage = () => {

  return (
    <>
      <h1 className="mt-24 p-3 font-bold md:text-2xl">
        Please Confirm your Order Summary
      </h1>
      <Orders>
        <DeliveryAddress />
      </Orders>
    </>
  );
};
