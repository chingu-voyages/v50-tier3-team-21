import { useNavigate } from "react-router-dom";

export const CheckoutHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full justify-between mb-5 md:mt-1">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span className="icon-[solar--arrow-left-line-duotone] mr-3 bg-secondary text-xl"></span>
        <span className="text-secondary text-xs">Home</span>
      </div>
      <div className="flex gap-3 text-xs mr-10 md:mx-auto md:gap-8">
        <div className="text-secondary">Confirm checkout</div>
        <div>1/2</div>
        <div className="opacity-30">Payment Details</div>
      </div>
    </div>
  );
};
