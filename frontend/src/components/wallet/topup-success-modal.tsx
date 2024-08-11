import { useNavigate, useLocation } from "react-router-dom";
import topupSuccess from "../../assets/topup-hippo-success.png";
import PrimaryButton from "../ui/button";

interface TopupSuccessPropsTypes {
  setShowSuccess: (status: boolean) => void;
}

export const TopupSuccessModal = ({setShowSuccess}: TopupSuccessPropsTypes) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseModal = () => {
    setShowSuccess(false);
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("success");
    const newUrl = `${location.pathname}`;

    navigate(newUrl, { replace: true });
  };
  return (
    <div className="absolute inset-0 bg-[#291E43]/10 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-2xl min-w-[350px]">
        <div
          id="container"
          className="flex flex-col gap-5 items-center justify-center p-5"
        >
          <img src={topupSuccess} />
          <div className="font-bold text-xl">Topup Made Successfully</div>
          <div className="text-[#7A869A] w-4/5 text-center">
            Now you can spend on your favorite cuisines 🤘🏽
          </div>
          <PrimaryButton onClick={handleCloseModal} className="w-full">
            CLOSE
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
