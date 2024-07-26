import { useEffect, useState } from "react";
import { httpClient } from "../lib/http-client";
import { useParams } from "react-router-dom";
import { FoodCard } from "../components/menu/foodCard";

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

export const RestaurantPage = () => {
  const [restaurantData, setRestaurantData] = useState<MenuItemType[]>([]);
  const [filterVisible, setFilterVisible] = useState(true);
  const { restaurantId } = useParams();

  // get list of foodITems from API
  useEffect(() => {
    async function getMenu() {
      try {
        let baseUrl = `http://localhost:3000/api/foodItems/items`;
        if (restaurantId) baseUrl = baseUrl + `?restaurantId=${restaurantId}`;
        const response = await httpClient.get(baseUrl);
        const { data } = response.data;
        console.log(data);
        setRestaurantData(data);
      } catch (error) {
        console.log(error);
      }
    }
    getMenu();
  }, [restaurantId]);

  const handleViewFilter = () => {
    setFilterVisible((prev) => !prev);
  };

  return (
    <>
      {restaurantData.length && (
        <div className="p-3 md:px-10 max-w-[1290px] pt-28 md:pt-32 m-auto">
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
                <span className="pl-3">
                  {restaurantData[0].restaurant.country}
                </span>
              </div>
              <div className="flex items-center">
                <span className="icon-[lets-icons--flag-duotone] text-lg"></span>
                <span className="text-primary pl-3">0,7km</span>
                <span className="pl-3">from [Your Location]</span>
              </div>
            </div>
          </div>
          <div className="h-[200px] rounded-2xl md:h-[400px] bg-cover md:bg-fill bg-no-repeat bg-[url(https://images.pexels.com/photos/735869/pexels-photo-735869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] md:bg-center"></div>

          <div className="flex items-center gap-3 my-5 relative cursor-pointer">
            <span>Restaurnat Menus </span>
            <span
              className="icon-[mage--filter] text-secondary text-2xl"
              onClick={handleViewFilter}
            ></span>
            {filterVisible && (
              <div className=" w-48 h-56 p-3 border-secondary/60 border rounded-md shadow-lg absolute bg-white left-36 top-8">
                <ul className="flex flex-col justify-around h-full">
                  <li>
                    <input type="checkbox" className="appearance-none w-4 h-4 border-2 border-white rounded cursor-pointer checked:bg-secondary" style={{boxShadow: "0 0 0 1px lightGrey"}} checked/>
                    <label htmlFor="appetizers" className="ml-3 text-lg">
                      Appetizers
                    </label>
                  </li>
                  <li>
                    <input type="checkbox"  className="appearance-none w-4 h-4 border-2 border-white rounded cursor-pointer checked:bg-secondary" style={{boxShadow: "0 0 0 1px lightGrey"}} checked/>
                    <label htmlFor="desserts" className="ml-3 text-lg">
                      Desserts
                    </label>
                  </li>
                  <li>
                    <input type="checkbox"  className="appearance-none w-4 h-4 border-2 border-white rounded cursor-pointer checked:bg-secondary" style={{boxShadow: "0 0 0 1px lightGrey"}} checked/>
                    <label htmlFor="beverages" className="ml-3 text-lg">
                      Beverages
                    </label>
                  </li>
                  <li>
                    <input type="checkbox"  className="appearance-none w-4 h-4 border-2 border-white rounded cursor-pointer checked:bg-secondary" style={{boxShadow: "0 0 0 1px lightGrey"}} checked/>
                    <label htmlFor="salads" className="ml-3 text-lg">
                      Salads
                    </label>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <hr />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5 p-3 justify-items-center">
            {restaurantData.map((item: MenuItemType) => (
              <FoodCard item={item} />
            ))}
          </div>
        </div>
      )}
      <p>Your Order</p>
      <hr />
    </>
  );
};
