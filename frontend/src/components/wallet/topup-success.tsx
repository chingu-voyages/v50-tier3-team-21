import topupSuccess from "../../assets/topup-hippo-success.png";
import PrimaryButton from "../ui/button";

interface TopupSuccessPropsTypes {
    setShowTopupModal: (status: boolean) => void
}
export const TopupSuccess = ({setShowTopupModal}: TopupSuccessPropsTypes) => {
  return (
    <div
      id="container"
      className="flex flex-col gap-5 items-center justify-center p-5"
    >
      <img src={topupSuccess} />
      <div className="font-bold text-xl">Topup Made Successfully</div>
      <div className="text-[#7A869A] w-4/5 text-center">
        Now you can spend on your favorite cuisines 🤘🏽
      </div>
      <PrimaryButton
        onClick={() => setShowTopupModal(false)}
        className="w-full"
      >
        CLOSE
      </PrimaryButton>
    </div>
  );
};
