
import DeliveryImage from "../../assets/Driver Deliver Food.png"
import PrimaryButton from "../ui/button.tsx";
import {useNavigate} from "react-router-dom";

export const SuccessMessage = () => {
    const navigate = useNavigate()
  return(
      <div className="w-full  p-2 flex flex-col gap-3 justify-center items-center">
          <img src={DeliveryImage} alt="Image of driver delivery food"/>
          <h3 className="text-xl font-bold">Order Made Successfully </h3>
          <p className="text-dark text-lg text-center">Now you can sit back and wait to enjoy your favorite cuisines 🤘</p>
          <PrimaryButton onClick={() => navigate('/')} className="w-full">
              BACK HOME
          </PrimaryButton>
      </div>
  )
}
