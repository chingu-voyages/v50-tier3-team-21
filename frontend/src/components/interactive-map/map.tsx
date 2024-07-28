import {FullscreenControl , Map , Marker} from "react-map-gl";
import {useGeoLocation} from "../../hooks";
import {useAddressSearch} from "./address-search-provider.tsx";


export const AppMap = () => {
   const { location} = useGeoLocation();
   const {selectedLocation} = useAddressSearch();
   return(
       <Map
           mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
           initialViewState={{
               longitude: selectedLocation?.coordinates?.longitude ?? location.long,
               latitude: selectedLocation?.coordinates?.latitude ?? location.lat,
           }}
           style={{ width: '100%', height: 400}}
           mapStyle="mapbox://styles/mapbox/streets-v11"
       >
           <FullscreenControl position="top-right" />
           <Marker
               longitude={selectedLocation?.coordinates?.longitude ?? location.long}
               latitude={selectedLocation?.coordinates?.latitude ?? location.lat}
               anchor="bottom"
           />
       </Map>


   )
}
