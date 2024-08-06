import { MenuItemType } from "./types/types";
import { useNavigate } from "react-router-dom";
// types
interface RestaurantHeaderTypes {
  restaurantData: MenuItemType[];
}

export const RestaurantHeader = ({ restaurantData }: RestaurantHeaderTypes) => {
  const navigate = useNavigate()
  return (
    <div
      id="food-header"
      className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-3 p-3"
    >
      <div className="flex items-center">
        <span className="icon-[solar--arrow-left-line-duotone] mr-3 bg-secondary"></span>
        <span className="text-secondary text-xs" onClick={() => navigate(-1)}>Go Back</span>
      </div>
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
