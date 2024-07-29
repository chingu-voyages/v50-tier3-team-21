interface RestaurantHeaderTypes {
  restaurantData: MenuItemType[];
}
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

export const RestaurantHeader: React.FC<RestaurantHeaderTypes> = ({
  restaurantData,
}) => {
  return (
    <div
      id="food-header"
      className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-3 p-3"
    >
      <h1 className="text-primary text-lg md:text-3xl text-bold">
        {restaurantData[0].restaurant.name}
      </h1>
      <div className="flex flex-col md:flex-row gap-1 md:gap-3">
        <div className="flex items-center">
          <span className="icon-[solar--map-point-wave-bold-duotone]"></span>
          <span className="pl-3">{restaurantData[0].restaurant.country}</span>
        </div>
        <div className="flex items-center">
          <span className="icon-[lets-icons--flag-duotone] text-lg"></span>
          <span className="text-primary pl-3">0,7km</span>
          <span className="pl-3">from [Your Location]</span>
        </div>
      </div>
    </div>
  );
};
