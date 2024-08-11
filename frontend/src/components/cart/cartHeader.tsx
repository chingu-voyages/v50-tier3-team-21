import { useNavigate } from "react-router-dom";
import {useCheckPathname} from "../../hooks/check-pathname.hook.ts";

export const CheckoutHeader = () => {
  const navigate = useNavigate();
  const path = useCheckPathname('/checkout/order/confirm');
  const isActivePath = path !== null;

  return (
    <div className="flex w-full justify-between items-center mb-5 md:mt-1">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span className="icon-[solar--arrow-left-line-duotone] mr-3 bg-secondary text-xl"></span>
        <span className="text-secondary text-xm">Home</span>
      </div>
      <div className="flex gap-2 text-xs md:text-sm mr-10 md:mx-auto md:gap-8">
        <div className={`${ isActivePath ? "text-secondary": null}`}>Confirm checkout</div>
        <div>{ isActivePath ? '1/2': '2/2'}</div>
        <div className={`${ !isActivePath ? "text-secondary": null}`}>Payment Details</div>
      </div>
    </div>
  );
};
