import {useGeoLocation} from "../../hooks";
import {useReverseGeoCoding} from "../../services/api/searchbox/queries.ts";
import PrimaryButton from "./button.tsx";
import {useEffect} from "react";


export const GeolocationBtn = ({ onClick, toggleModal }: { onClick: (value: string) => void, toggleModal: () => void }) => {
  const { getUserLocation , location, setLocationEmpty } = useGeoLocation();
  const { data, isSuccess,isLoading  } = useReverseGeoCoding(location.long, location.lat);

    useEffect(() => {
        if (isSuccess && data && data.features?.length > 0) {
            const full_address = data.features[0].properties.place_formatted;
            onClick(full_address);
            setLocationEmpty();
        }
    }, [isSuccess, data, onClick]);
  return(
      <PrimaryButton variant={"ghost"} onClick={getUserLocation} className="p-0" isLoading={isLoading}>
          {
              !isLoading &&<span
                  onMouseEnter={toggleModal}
                  onMouseLeave={toggleModal}
               onClick={getUserLocation}
               className="icon-[solar--gps-bold-duotone] text-secondary text-2xl bg-secondary"
               />
          }
      </PrimaryButton>

  )
}
