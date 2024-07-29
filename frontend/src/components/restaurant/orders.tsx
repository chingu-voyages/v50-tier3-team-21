import PrimaryButton from "../ui/button";
import { OrderItem } from "./orderItem";
import { MenuItemType } from "./types/types";

// types
interface OrdersProps {
  orders: MenuItemType[];
}

export const Orders= ({ orders }: OrdersProps) => {
  return (
    <div>
      <h2 className="p-5">Your Orders</h2>
      <hr />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
        {orders &&
          orders.map((order) => (
           <OrderItem order={order}/>
          ))}
      </div>
      <hr />
      <div className="flex items-center justify-between p-5">
        <div className="font-bold">
          Total Cost: <span>$120</span>
        </div>
        <PrimaryButton onClick={() => alert("go to checkout")}>
          <span className="icon-[solar--bag-smile-bold-duotone] mr-1"></span>
          CHECKOUT
        </PrimaryButton>
      </div>
    </div>
  );
};
