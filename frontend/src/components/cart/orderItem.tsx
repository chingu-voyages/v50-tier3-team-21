import { FoodImage } from "../restaurant/foodImage";
import { OrderType } from "../restaurant/types/restaurant-types";
import { DeleteItemModal } from "./deleteItemModal";
import { useState } from "react";

// types
interface OrderItemProps {
  item: OrderType;
  addQuantity: (item: OrderType) => void;
  subtractQuantity: (item: OrderType) => void;
  handleDelete: (id: number) => void;
}

export const OrderItem = ({
  item,
  addQuantity,
  subtractQuantity,
  handleDelete
}: OrderItemProps) => {

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  return (
    <>
      {showDeleteModal && <DeleteItemModal setShowDeleteModal={setShowDeleteModal} handleDelete={() => handleDelete(item.id)} />}
      <div className="w-full shadow-lg flex p-3 rounded-lg gap-3 justify-center">
        <div className="w-20 object-contain content-center">
          <FoodImage
            src={item.imageUrl}
            alt={item.name}
            className="w-full rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <div className="text-primary font-bold">{item.restaurant.name}</div>
          <div>{item.name}</div>
          <div className="font-bold">${item.price}</div>
        </div>
        <div className="flex flex-col justify-between h-full items-end">
          <span
            onClick={() => setShowDeleteModal(true)}
            className="icon-[solar--trash-bin-minimalistic-bold-duotone] text-2xl text-danger cursor-pointer"
          ></span>
          <div className="flex items-center">
            <span
              className="flex items-center justify-center bg-danger/50 h-3 w-3 rounded-full pb-[1px] text-danger cursor-pointer"
              onClick={() => subtractQuantity(item)}
            >
              -
            </span>
            <span className="px-3">{item.quantity}</span>
            <span
              className="icon-[lets-icons--add-round-duotone] bg-secondary cursor-pointer"
              onClick={() => addQuantity(item)}
            ></span>
          </div>
        </div>
      </div>
    </>
  );
};
