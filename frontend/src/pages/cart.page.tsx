import { useEffect, useState } from "react";
import { CheckoutFooter, Orders } from "../components/restaurant";
import { DeliveryAddress } from "../components/cart/deliveryAddress";
import { OrderType } from "../components/restaurant/types/restaurant-types";
import { httpClient } from "../lib/http-client";
import { useNavigate } from "react-router-dom";
import {useCheckPathname} from "../hooks/check-pathname.hook.ts";

export const CartPage = () => {
  const [cart, setCart] = useState<OrderType[]>([]);
  const [address, setAddress] = useState<string>("");
  const navigate = useNavigate();
  const activePath = useCheckPathname('/checkout/order/confirm');
  if(activePath === null){
     return  null;
  }
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

  const handleCheckout = async () => {
    // reformat to make an order for the database
    // create an array of just necessary data for each food item
    const cartData = cart.map((item) => ({
      id: item.restaurant.id,
      itemId: item.id,
      quantity: item.quantity,
    }));

    // get current time
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;

    // create an array of order info with foodItems attached
    const order = {
      deliveryAddress: address,
      deliveryTime: time,
      foodItems: cartData,
    };

    //make API call to POST order in database
    try {
      const response = await httpClient.post("/order/create-order", order);
      const orderId: number = response.data.orderId;
      // clear localStorage now that order in database
      localStorage.removeItem("shoppingCart");
      navigate(`/checkout/order/payment/${orderId}`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {cart ? (
        <div>
          <h1 className="p-3 font-bold md:text-xl">
            Please Confirm your Order Summary
          </h1>
          <Orders cart={cart} setCart={setCart} />
          <DeliveryAddress address={address} setAddress={setAddress} />
          <CheckoutFooter cart={cart} handleCheckout={handleCheckout} address={address}/>
        </div>
      ) : (
        <div>You have no added anything to you cart yet...</div>
      )}
    </>
  );
};
