import PrimaryButton from "../../components/ui/button";
import { useState } from "react";

export const DeliveryAddress = () => {
  const [modalVisable, setModalVisable] = useState(false);
  const [address, setAddress] = useState("");

  const toggleModal = () => {
    setModalVisable((prev) => !prev);
  };

  const getPosition = () => {
    if (navigator.geolocation) {
      setAddress("getting address...")
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    function success(position: GeolocationPosition) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setAddress(`Latitude: ${latitude}, Longitude: ${longitude}`)
    }

    function error() {
     setAddress("Unable to retrieve your location");
    }
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
      <div>1906 Market St. San Francisc, CA 94102, USA</div>
      <PrimaryButton>CHANGE</PrimaryButton>
    </div>
  );
};
