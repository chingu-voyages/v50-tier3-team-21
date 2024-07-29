import { useEffect, useState } from "react";
import { httpClient } from "../lib/http-client";
import { useParams } from "react-router-dom";
import { FoodCard } from "../components/restaurant/foodCard";
import { RestaurantHeader } from "../components/restaurant/RestaurantHeader";
import { CategoryFilter } from "../components/restaurant/categoryFilter";
const BASE_URL = import.meta.env.VITE_LOCAL_API_BASE_URL;

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

type CategoryListType = {
  [key: string]: boolean;
}

export const RestaurantPage = () => {
  const [restaurantData, setRestaurantData] = useState<MenuItemType[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItemType[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryListType>({});
  const { restaurantId } = useParams<{ restaurantId: string }>();

  // get list of foodITems from API
  useEffect(() => {
    async function getMenu() {
      try {
        const url = `${BASE_URL}/foodItems/items?restaurantId=${restaurantId}`;
        const response = await httpClient.get(url);
        const { data } = response.data;
        console.log(data);
        setRestaurantData(data);
        setFilteredMenuItems(data);
        getCategories(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        console.log(error);
      }
    }
    getMenu();
  }, [restaurantId]);

  // get a list of categories that are present at this restaurant
  const getCategories = (data: MenuItemType[]) => {
    const categoryList = data.flatMap((item) =>
      item.Categories.map((cat) => cat.name)
    );
    const uniqueCategories = Array.from(new Set(categoryList));
    const categoryObj = uniqueCategories.reduce((acc, item) => {
      acc[item] = true;
      return acc;
    }, {} as CategoryListType);
    setCategories(categoryObj);
  };

  const handleViewFilter = () => {
    setFilterVisible((prev) => !prev);
  };

  

  return (
    <>
      {restaurantData.length ? (
        <div className="p-3 md:px-10 max-w-[1290px] pt-28 md:pt-32 m-auto">
          <RestaurantHeader restaurantData={restaurantData} />
          <div className="h-[200px] rounded-2xl md:h-[400px] bg-cover md:bg-fill bg-no-repeat bg-[url(https://images.pexels.com/photos/735869/pexels-photo-735869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] md:bg-center"></div>

          <div className="flex items-center gap-3 my-5 relative cursor-pointer">
            <span>Restaurant Menus </span>
            <span
              className="icon-[mage--filter] text-secondary text-2xl"
              onClick={handleViewFilter}
            ></span>
            {filterVisible && (
              <div className=" md:w-48 md:h-56 p-3 border-secondary/60 border rounded-md shadow-lg absolute bg-white left-36 top-8">
                <CategoryFilter categories={categories} restaurantData={restaurantData} setFilteredMenuItems={setFilteredMenuItems} setCategories={setCategories}/>
              </div>
            )}
          </div>

          <hr />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5 p-3 justify-items-center">
            {filteredMenuItems.map((item: MenuItemType) => (
              <FoodCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="mt-36">{error}</div>
      ) : (
        <div className="mt-36">Loading...</div>
      )}
      <p>Your Order</p>
      <hr />
    </>
  );
};
