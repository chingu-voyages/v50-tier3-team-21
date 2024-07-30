import React from "react";
import {useAppMapContext} from "../../provider/map.provider.tsx";
import {Marker} from "react-map-gl";
import {AppPopup} from "./popup.tsx";


export const Pins = () => {
    const {restaurants, selectedRestaurantId, handleSelectRestaurant} = useAppMapContext();
    return(
        <React.Fragment>
            {
                restaurants && restaurants.length > 0 &&
                restaurants.map(restaurant => (
                    <>
                        {<Marker
                            key={restaurant.id}
                            longitude={restaurant.longitude}
                            latitude={restaurant.latitude}
                            onClick={() => handleSelectRestaurant(restaurant.id)}
                            style={{zIndex: 20}}
                            scale={2.0}
                        >
                            <span className="icon-[majesticons--map-marker] text-primary"
                                  style={{width: "48px" , height: "48px", zIndex: 2, color: "#8C63EE"}}></span>
                            {selectedRestaurantId == restaurant.id  && <AppPopup key={restaurant.id + restaurant.name} restaurant={restaurant} />}
                        </Marker>}

                    </>
                ))
            }
        </React.Fragment>
    )
}
