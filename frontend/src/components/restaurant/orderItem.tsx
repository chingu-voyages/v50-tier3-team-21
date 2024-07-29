import { MenuItemType } from "./types/types";

// types
interface OrderItemProps {
  order: MenuItemType;
}

export const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <div className="w-full shadow-lg flex p-3 rounded-lg gap-3 justify-center">
      <div className="w-20 object-contain content-center">
        <img src={order.imageUrl} className="w-full rounded-lg" />
      </div>
      <div className="flex flex-col gap-3 flex-1">
        <div className="text-primary font-bold">{order.restaurant.name}</div>
        <div>{order.name}</div>
        <div className="font-bold">${order.price}</div>
      </div>
      <div className="flex flex-col justify-between h-full items-end">
        <span className="icon-[solar--trash-bin-minimalistic-bold-duotone] text-2xl text-danger"></span>

        <div className="flex items-center">
          <span className="flex items-center justify-center bg-danger/50 h-3 w-3 rounded-full pb-[1px] text-danger">
            -
          </span>
          <span className="px-3">5</span>
          <span className="icon-[lets-icons--add-round-duotone] bg-secondary"></span>
        </div>
      </div>
    </div>
  );
};
