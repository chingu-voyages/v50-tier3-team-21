import PrimaryButton from "../ui/button";

// TYPES
interface MenuItemType {
    id: number;
    name: string;
    imageUrl: string;
    restaurantId: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    restaurant: RestaurantType;
    Categories: CategoryType[];
  }
  
  type RestaurantType = {
    id: number;
    name: string;
    country: string;
    longitude: number;
    latitude: number;
    createdAt: string;
    updatedAt: string;
  };
  
  type CategoryType = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };

  interface FoodCardProps {
    item: MenuItemType
  }
  
  // render a card for each menu item
export const FoodCard: React.FC<FoodCardProps> = ({item}) => {
    return (
      <div
        key={item.id}
        className="rounded-md shadow-lg max-w-[295px] md:max-w-[360px]"
      >
        <div className="w-full  h-56 overflow-hidden">
          <img
            src={item.imageUrl}
            className="w-full object-cover rounded-t-md"
          />
        </div>
        <div className="flex flex-col gap-3 p-3">
          <div className="flex flex-col gap-3">
            <p className="">{item.name}</p>
            <p className="text-xs font-bold">${item.price}</p>
          </div>
          <div>
            <PrimaryButton>
              <span className="icon-[solar--bag-smile-bold-duotone] mr-1"></span>
              PLACE ORDER
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  };
