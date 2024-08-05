import { useEffect, useState } from "react";
import { CheckoutFooter, Orders } from "../components/restaurant";
import { DeliveryAddress } from "../components/cart/deliveryAddress";
import { OrderType } from "../components/restaurant/types/restaurant-types";
import { httpClient } from "../lib/http-client";
const BASE_URL = import.meta.env.VITE_LOCAL_API_BASE_URL;

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

  const handleCheckout = async () => {
    // reformat to make an order for the database
    // create an array of just necessary data for each food item
    const cartData = cart.map((item) => ({
      id: item.restaurant.id,
      itemId: item.id,
      quantity: item.quantity,
    }));

    // create an array of order info with foodItems attached
    const order = {
      deliveryAddress: "123 Elm St.",
      deliveryTime: "3:34",
      foodItems: cartData,
    };

    //make API call to POST order in database
    try {
      const response = await httpClient.post(
        `${BASE_URL}/order/create-order`,
        order
      );
      const { data } = response;
      console.log(data.message);
      alert("ITEM SAVED IN DATABASE");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {cart ? (
        <div>
          <h1 className="mt-24 p-3 font-bold md:text-2xl">
            Please Confirm your Order Summary
          </h1>
          <Orders cart={cart} setCart={setCart} />
          <DeliveryAddress />
          <CheckoutFooter cart={cart} handleCheckout={handleCheckout} />
        </div>
      ) : (
        <div>You have no added anything to you cart yet...</div>
      )}
    </>
  );
};

// needed for making a new order
// /api/order/create-order
// {
//   "deliveryAddress": "123 main street",
//   "deliveryTime": "3:34",
//   "foodItems": [{
//       "id": "69", this is the restaurant ID
//       "itemId": "5", this is the food item ID
//       "quantity": "3" this is what i have called "count"
//   }]
// }
