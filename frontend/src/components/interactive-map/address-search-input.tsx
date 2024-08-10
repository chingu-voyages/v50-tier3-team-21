import {ISearchResult , useAddressSearch} from "./address-search-provider.tsx";
import {useGetLocation} from "../../services/api/searchbox/queries.ts";
import {useDebounce} from "../../hooks/debounce.hook.ts";
import {FormLabel} from "../authentication/form-label.tsx";
import PrimaryButton from "../ui/button.tsx";
import {GeolocationBtn} from "../ui/geolocation-btn.tsx";
import React from "react";

export const AddressSearchInput = () => {
    const { query, handleSearchQuery, isOpen, flyTo, } = useAddressSearch();
    const debouncedLocation = useDebounce(query);
    const {isLoading,data, isSuccess} = useGetLocation(debouncedLocation);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       handleSearchQuery(e.target.value)
    };


    return (
        <form className="w-full flex flex-col gap-5  p-6 bg-white border rounded-lg">
            <FormLabel htmlFor="location" label="Enter your delivery address" />
            <div className="relative">
                <div className="w-full relative border-2 z-10 rounded-md">
                    <input
                        type="text"
                        id="location"
                        value={query}
                        onChange={handleSearchChange}
                        placeholder="Search for an address"
                        className="w-full px-3 py-2 z-10  rounded-lg placeholder:font-light placeholder:text-[0.8em] focus:outline-0"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <GeolocationBtn onClick={handleSearchQuery} />
                    </div>

                </div>
                {isSuccess && isOpen && <LocationResults isLoading={isLoading} data={data} />}
            </div>
            <PrimaryButton type={"button"} onClick={flyTo}>
                Find Restaurants
            </PrimaryButton>
        </form>

    );
};
export const LocationResults = ({isLoading, data}: { isLoading: boolean, data: ISearchResult}) => {
    return(
        <ul className="w-full absolute flex flex-col justify-center items-center bg-white p-5 min-h-12 z-50">
            {
                isLoading && <p>Loading...</p>
            }
            {
                data && data.features.map((feature ,index)=> (
                    <LocationItem
                        key={index}
                        name={feature.properties.name}
                        full_formatted={feature.properties.place_formatted}
                        coordinates={
                          {
                              longitude: parseInt(feature.properties.coordinates.longitude),
                              latitude: parseInt(feature.properties.coordinates.latitude)
                          }
                        }
                    />
                ))
            }
        </ul>
    )
}

type LocationItemType = {
    name: string,
    full_formatted: string,
    coordinates: {
        longitude: number,
        latitude: number
    }
}
export const LocationItem = ({name, full_formatted, coordinates}: LocationItemType ) => {
  const { handleSelectLocation } = useAddressSearch();

  const handleClick = () => {
      handleSelectLocation({
          name: full_formatted,
          coordinates
      })
  }
   return(
       <li className='w-full flex flex-col justify-center items-start  border-b py-1 cursor-pointer' onClick={handleClick}>
           <h3 className="font-bold">
               { name }
           </h3>
           <p> { full_formatted }</p>
       </li>
   )
}


