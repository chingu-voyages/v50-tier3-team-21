import {FullscreenControl , Layer , Map , Marker , NavigationControl , Source} from "react-map-gl";
import {useGeoLocation} from "../../hooks";
import {useAddressSearch} from "./address-search-provider.tsx";
import {useAppMapContext} from "../../provider/map.provider.tsx";
import {AppPopup} from "./popup.tsx";




const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
        'circle-radius': 90,
        'circle-color': '#007cbf',
        'fillOpacity': 0.8
    }
};

const geojson = {
    type: 'FeatureCollection',
    features: [
        {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.392, 37.791]}},
        {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.398, 37.796]}},
        {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.410, 37.787]}},
        {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.385, 37.799]}},
        {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.400, 37.805]}},
        {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.420, 37.790]}},
        {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.370, 37.780]}},
        {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.395, 37.800]}},
        {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.405, 37.795]}},
        {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.380, 37.785]}}
    ]
};


export const AppMap = () => {
   const { location} = useGeoLocation();
   const {selectedLocation} = useAddressSearch();
   const {restaurants, selectedRestaurantId, handleSelectRestaurant} = useAppMapContext();

   return(
       <Map
           id="mapA"
           mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
           initialViewState={{
               longitude: selectedLocation?.coordinates?.longitude ?? location.long,
               latitude: selectedLocation?.coordinates?.latitude ?? location.lat,
               zoom: 4.0

           }}
           style={{ width: '100%', height: '100%', position:"relative", zIndex: 12}}
           mapStyle="mapbox://styles/mapbox/streets-v11"
       >
           <FullscreenControl position="top-right" />
           <NavigationControl />
           {
               <Marker
                   longitude={selectedLocation?.coordinates?.longitude ?? location.long}
                   latitude={selectedLocation?.coordinates?.latitude ?? location.lat}
                   >
                   <span className="icon-[solar--map-point-wave-bold-duotone] w-16 text-danger" />
                </Marker>
           }
           {
               restaurants && restaurants.length > 0 &&
               restaurants.map(restaurant => (
                   <>
                       {selectedRestaurantId == -1 &&
                           <Marker
                               key={restaurant.id}
                               longitude={restaurant.longitude}
                               latitude={restaurant.latitude}
                               onClick={() => handleSelectRestaurant(restaurant.id)}
                               style={{zIndex: 20}}
                                scale={2.0}
                   >
                               <span className="icon-[solar--map-point-wave-bold-duotone]" style={{width: '12rem'}} />
                           </Marker>}
                       {selectedRestaurantId == restaurant.id  && <AppPopup restaurant={restaurant} />}
                   </>
               ))
           }

           <Source id="my-data" type="geojson" data={geojson}>
               <Layer {...layerStyle} />
           </Source>

       </Map>


   )
}
