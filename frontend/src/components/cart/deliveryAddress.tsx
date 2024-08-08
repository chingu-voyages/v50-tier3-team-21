import PrimaryButton from "../../components/ui/button";
import { useState } from "react";
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface DeliveryAddressTypes {
  address: string;
  setAddress: (address: string) => void;
}
export const DeliveryAddress = ({
  address,
  setAddress,
}: DeliveryAddressTypes) => {
  const [modalVisable, setModalVisable] = useState(false);

  const toggleModal = () => {
    setModalVisable((prev) => !prev);
  };

  const getPosition = () => {
    if (navigator.geolocation) {
      // display loading message in address field and fetch GEO location
      const addressElement = document.getElementById("address") as HTMLInputElement;
      addressElement.value = "getting address..."
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    // if GEO location fetched correctly, convert to street address
    async function success(position: GeolocationPosition) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      // call mapbox API to convert lat/long into actually street address
      const response = await fetch(
        `https://api.mapbox.com/search/geocode/v6/batch?access_token=${MAPBOX_TOKEN}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            {
              types: ["address"],
              latitude: latitude,
              longitude: longitude,
            },
          ]),
        }
      );

      const data = await response.json();
      const { full_address } = data.batch[0].features[0].properties;

      // dispay street address in field and save in state
      const addressElement = document.getElementById("address") as HTMLInputElement;
      addressElement.value = full_address;
      setAddress(full_address);
    }

    // if error, display error
    function error() {
      setAddress("Unable to retrieve your location");
    }
  };

  // if address is edited manually, update state on click
  const handleChangeAddress = () => {
    const addressElement = document.getElementById("address") as HTMLInputElement;
    setAddress(addressElement.value);
  };

  return (
    <div className="flex flex-col p-5 gap-3 md:w-1/3">
      <div className="font-bold text-lg">
        Please Confirm your Delivery Address
      </div>
      <label htmlFor="address">Enter your delivery address</label>
      <div className="relative w-full">
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Enter location manually"
          className="outline rounded-lg p-3 w-full"
        />
        <span
          className="icon-[solar--gps-bold-duotone] absolute right-2 top-3 text-2xl bg-secondary cursor-pointer"
          onMouseEnter={toggleModal}
          onMouseLeave={toggleModal}
          onClick={getPosition}
        ></span>
        {modalVisable && (
          <div className="absolute shadow-[0_0_20px_0px_rgba(0,0,0,0.2)] rounded-lg w-fit p-3 -top-full right-0 md:-right-12 bg-white text-xs text-black/50 after:content-[''] after:h-3 after:w-3 after:bg-white after:rotate-45 after:absolute after:top-8 after:left-1/2 after:translate-x-12 md:after:translate-x-0 after:shadow-[0_0_20px_0px_rgba(0,0,0,0.2)]">
            Use my current location
          </div>
        )}
      </div>

      <div>Delivery location</div>
      {/* <div>1906 Market St. San Francisc, CA 94102, USA</div> */}
      <div>{address !== "getting address..." && address}</div>
      <PrimaryButton className={`${!address && "bg-opacity-30"}`} onClick={handleChangeAddress}>
        CHANGE
      </PrimaryButton>
    </div>
  );
};
