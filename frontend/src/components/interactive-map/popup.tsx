import PrimaryButton from "../ui/button.tsx";
import {RestaurantWithImage} from "../../services/api/interctive-map/interface.ts";
import {useAppMapContext} from "../../provider/map.provider.tsx";
import { useMemo} from "react";
import {haversineDistance} from "../../utils/geospatial.ts";
import {useAddressSearch} from "./address-search-provider.tsx";


interface PopupPropsType {
    restaurant: RestaurantWithImage
}

export const AppPopup = ({restaurant}: PopupPropsType) => {
    const { handleSelectRestaurant , geoLocation} = useAppMapContext();
    const {selectedLocation} = useAddressSearch()


    const distance = useMemo(() => {
        return haversineDistance([selectedLocation.coordinates.latitude, selectedLocation.coordinates.longitude], [restaurant.latitude, restaurant.longitude])
    },[geoLocation, restaurant])

   return(
       <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[80%] sm:max-w-md md:max-w-md md:w-[336px] z-50 ">
           <div className="w-full bg-white flex flex-col justify-center items-start  rounded-md gap-4 z-50">
               <div className="w-full h-[150px] overflow-hidden bg-white rounded-md z-50">
                   <img
                       src={restaurant.imageUrl}
                       alt={`${restaurant.name} image`}
                       className="w-full h-full object-cover rounded-tl-md rounded-tr-md"
                   />
               </div>
               <div className="flex flex-col w-full px-3  gap-2 z-50">
                   <h3 className="font-light text-lg text-dark">{ restaurant.name }</h3>
                   <div className="flex items-center gap-2">
                       <span className="icon-[solar--map-point-wave-bold-duotone]"/>
                       <p className="font-light">{ restaurant.country }</p>
                   </div>
                   <div className="flex items-center justify-start gap-2">
                       <span className="icon-[lets--icons:flag-duotone]"/>
                       <span className="text-md font-light"> <strong className="text-primary font-light">{Math.round(distance)}km</strong> from your location</span>
                   </div>
                   <div className="flex justify-start items-center gap-2 py-4">
                       <PrimaryButton variant={"outline"} onClick={() => handleSelectRestaurant(-1)}>
                           CLOSE
                       </PrimaryButton>
                       <PrimaryButton >
                           VIEW MENU ITEMS
                       </PrimaryButton>
                   </div>
               </div>
           </div>
       </div>

   )
}
