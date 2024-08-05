import { CheckboxElement } from "./";
import { MenuItemType } from "./types/restaurant-types";

// types
interface CategoryFilterProps {
  restaurantData: MenuItemType[];
  setFilteredMenuItems: (items: MenuItemType[]) => void;
  categories: CategoryListType;
  setCategories: (categories: CategoryListType) => void;
}

type CategoryListType = {
  [key: string]: boolean;
};

export const CategoryFilter = ({
  restaurantData,
  setFilteredMenuItems,
  categories,
  setCategories,
}: CategoryFilterProps) => {
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
      item.Categories.some((category) =>
        catsToInclude.includes(category.displayName)
      )
    );
    // if filtered list is empty, just show all items
    // if (!filtered.length) {
    //   setFilteredMenuItems(restaurantData);
    //   return;
    // }

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
