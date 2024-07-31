import PrimaryButton from "../ui/button";
import { MenuItemType } from "./types/types";
import { FoodImage } from "./FoodImage";

// TYPES
interface FoodCardProps {
  item: MenuItemType;
}

// render a card for each menu item
export const FoodCard = ({ item }: FoodCardProps) => {
  // mock adding an item to the shopping card
  const handleAddToCart = (item: MenuItemType) => {
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="rounded-md shadow-lg max-w-[295px] md:max-w-[360px]">
      <div className="w-full  h-56 overflow-hidden">
        <FoodImage
          src={item.imageUrl}
          alt={item.name}
        />
      </div>
      <div className="flex flex-col gap-3 p-3">
        <div className="flex flex-col gap-3">
          <p className="">{item.name}</p>
          <p className="text-xs font-bold">${item.price}</p>
        </div>
        <div>
          <PrimaryButton onClick={() => handleAddToCart(item)}>
            <span className="icon-[solar--bag-smile-bold-duotone] mr-1"></span>
            PLACE ORDER
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
