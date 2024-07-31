import { MenuItemType } from "./types/types";
import { useNavigate } from "react-router-dom";
// types
interface RestaurantHeaderTypes {
  restaurantData: MenuItemType[];
}

export const RestaurantHeader = ({ restaurantData }: RestaurantHeaderTypes) => {
  const navigate = useNavigate();
  return (
    <div
      id="food-header"
      className="flex flex-col md:flex-row gap-1 md:gap-3 p-3 md:justify-between"
    >
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <span className="icon-[solar--arrow-left-line-duotone] mr-3 bg-secondary text-xl"></span>
        <span className="text-secondary text-xs">Go Back</span>
      </div>

      <div className="flex justify-between items-end md:items-center mt-3 md:mt-0 md:w-2/3">
        <h1 className="text-primary text-lg md:text-3xl text-bold ">
          {restaurantData[0].restaurant.name}
        </h1>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex items-center">
            <span className="icon-[solar--map-point-wave-bold-duotone]"></span>
            <div className="pl-3 text-xs">{restaurantData[0].restaurant.country}</div>
          </div>
          <div className="flex items-center">
            <span className="icon-[lets-icons--flag-duotone] text-lg"></span>
            <span className="text-primary pl-3 text-xs">0,7km</span>
            <span className="pl-1 text-xs">from [Your Location]</span>
          </div>
        </div>
      </div>
    </div>
  );
};