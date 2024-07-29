import { CheckboxElement } from "./checkboxElement";

interface CategoryFilterProps {
  restaurantData: MenuItemType[];
  setFilteredMenuItems: (items: MenuItemType[]) => void;
  categories: CategoryListType;
  setCategories: (categories: CategoryListType) => void;
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

type CategoryListType = {
  [key: string]: boolean;
};

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

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  restaurantData,
  setFilteredMenuItems,
  categories,
  setCategories,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    const updatedCategories: CategoryListType = {
      ...categories,
      [value]: checked,
    };
    setCategories(updatedCategories);

    const catsToInclude = Object.keys(categories).filter(
      (cat) => updatedCategories[cat]
    );

    const filtered = restaurantData.filter((item) =>
      item.Categories.some((category) => catsToInclude.includes(category.name))
    );
    // if filtered list is empty, just show all items
    if (!filtered.length) {
      setFilteredMenuItems(restaurantData);
      return;
    }

    setFilteredMenuItems(filtered);
  };
  return (
    <ul className="flex flex-col justify-around h-full">
      {Object.keys(categories).map((category) => (
        <CheckboxElement
          name={category}
          label={category}
          handleChange={handleChange}
          key={category}
          isChecked={categories[category]}
        />
      ))}
    </ul>
  );
};
