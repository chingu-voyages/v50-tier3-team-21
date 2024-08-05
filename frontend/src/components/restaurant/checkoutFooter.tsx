import PrimaryButton from "../ui/button";
import { CheckoutFooterTypes } from "./types/restaurant-types";

export const CheckoutFooter = ({cart, handleCheckout}: CheckoutFooterTypes) => {
    // calculate total based on how many items in cart, including repeat items
    const calculateTotal = (): number => {
      const total = cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      );
      return +total.toFixed(2);
    };
  return (
    <div>
      <hr />
      <div className="flex items-center justify-between p-5">
        <div className="text-xl font-bold">
          Total Cost: $<span>{calculateTotal()}</span>
        </div>
        <PrimaryButton onClick={handleCheckout}>
          <span className="icon-[solar--bag-smile-bold-duotone] mr-1"></span>
          CHECKOUT
        </PrimaryButton>
      </div>
    </div>
  );
};
