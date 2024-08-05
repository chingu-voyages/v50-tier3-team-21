import { useEffect, useState } from "react";
import { Orders } from "../components/restaurant";
import { DeliveryAddress } from "../components/cart/deliveryAddress";
import { OrderType } from "../components/restaurant/types/restaurant-types";

export const CartPage = () => {
  const [cart, setCart] = useState<OrderType[]>([]);

  // load locally stored shopping cart on load and save to state
  useEffect(() => {
    try {
      const data = localStorage.getItem("shoppingCart");
      if (data) {
        const parsedData = JSON.parse(data);
        setCart(parsedData);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {}, [cart]);

  return (
    <>
      {cart ? (
        <div>
          <h1 className="mt-24 p-3 font-bold md:text-2xl">
            Please Confirm your Order Summary
          </h1>
          <Orders cart={cart} setCart={setCart}>
            <DeliveryAddress />
          </Orders>
        </div>
      ) : (
        <div>You have no added anything to you cart yet...</div>
      )}
    </>
  );
};
