import {Select , SingleSelect , SingleSelectLabel , SingleSelectOption} from "../ui/single-select/select.tsx";
import {FilterOptions} from "../../services/api/interctive-map/interface.ts";
import React , {useMemo} from "react";
import {DistancePriceFilters , useAppMapContext} from "../../provider/map.provider.tsx";
import {Slider} from "../ui/slider.tsx";
import {getMaxPrice} from "../../utils";
import PrimaryButton from "../ui/button.tsx";

const defaultOption = {
    foodItemId: undefined,
    categoryId: undefined,
    restaurantId: undefined,
    country: undefined,
}
const defaultDistancePriceFilters = {
    distance: undefined,
    price: undefined,
}
export const FilterForm = () => {
    const { filterOptions, distancePriceFilters, updateFilterOptions, updateDistancePriceFilters, countries, categories, restaurants, handleOnCloseModal } = useAppMapContext();
    const maxPrice = useMemo(() => getMaxPrice(restaurants), []);

    const handleFilterChange = <K extends keyof FilterOptions>(key: K) => (value: FilterOptions[K]) => {
        updateFilterOptions({ [key]: value });
    };
    const handleDistancePriceChange = <K extends keyof DistancePriceFilters>(key: K) => (value: DistancePriceFilters[K]) => {
        updateDistancePriceFilters({ [key]: value });
    };

    const handleReset = (filterKey: keyof FilterOptions) => () => {
        updateFilterOptions({ [filterKey]: undefined });
    };
    const handleResetAll = () => {
        updateFilterOptions({...defaultOption})
        updateDistancePriceFilters({ ...defaultDistancePriceFilters})
    }

    return (
        <form className="w-full flex flex-col gap-6">
            <div>
                <h3 className="text-xl font-bold">Filter</h3>
                <p className="text-md text-gray-600">Select search filters to narrow down what you want</p>
            </div>
            <div className="w-full flex justify-between items-center gap-2">
                <div className="w-full flex flex-col justify-center">
                    <SingleSelectLabel htmlFor="category-select" label="Food Category:" />
                    <SingleSelect<FilterOptions['categoryId']>
                        value={filterOptions.categoryId}
                        onChange={handleFilterChange('categoryId')}
                    >
                        <Select name="category-select">
                            {categories.map(category => (
                                <SingleSelectOption key={category.id} value={category.id} name={category.displayName}>

                                </SingleSelectOption>
                            ))}
                        </Select>
                    </SingleSelect>
                </div>
                <button type="button" className="mt-4 text-danger" onClick={handleReset('categoryId')}>reset</button>
            </div>

            <div className="w-full flex justify-center items-center gap-2">
                <div className="w-full flex flex-col justify-center">
                    <SingleSelectLabel htmlFor="country-select" label="Country:" />
                    <SingleSelect<FilterOptions['country']>
                        value={filterOptions.country}
                        onChange={handleFilterChange('country')}
                    >
                        <Select name="country-select">
                            {countries.map(country => (
                                <SingleSelectOption key={country} value={country} name={country} />

                            ))}

                        </Select>
                    </SingleSelect>
                </div>
                <button type="button" className="mt-4 text-danger" onClick={handleReset('country')}>reset</button>
            </div>
            <Slider
                max={maxPrice ?? 200}
                value={distancePriceFilters.price ?? 0}
                onChange={handleDistancePriceChange('price')}
                label={
                   <div className="flex items-center justify-between py-2" >
                       <span className="block text-gray-700 font-medium"> Price </span>
                       <p>$0-{distancePriceFilters?.price ?? 0}</p>
                   </div>

                }
                min={0}
            />
            <div>
                <Slider
                    max={10}
                    value={distancePriceFilters.distance ?? 0}
                    onChange={handleDistancePriceChange('distance')}
                    label=
                    {
                        <div className="flex items-center justify-between py-2" >
                            <span className="block text-gray-700 font-medium"> Distance: </span>
                            <p>{distancePriceFilters?.distance ?? 0}km away</p>
                        </div>
                    }
                    min={0}
                />
                <p className="text-md text-gray-600"> Choose a restaurant close to you.</p>
            </div>
            <div className="flex justify-start items-center gap-2">
                <PrimaryButton type={"button"} onClick={handleResetAll}  variant={"outline"}>
                    CLEAR ALL FILTERS
                </PrimaryButton>
                <PrimaryButton  onClick={handleOnCloseModal} >
                    { `SHOW RESTAURANTS  (${ restaurants.length ?? 0})`}
                </PrimaryButton>
            </div>
        </form>
    );
};


