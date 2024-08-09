import { httpClient } from "../../lib/http-client";
import PrimaryButton from "../ui/button";

const handleTopup = async () => {
  const response = httpClient.get("https://hungryhippo.onrender.com/wallet");
  console.log(response);
};
export const Wallet = () => {
  return (
    <div className="w-full">
      <p className="text-primary text-lg mb-5">Balance & Top up Wallet</p>
      <div className="bg-secondary/10 rounded-xl p-5 flex flex-col gap-3 items-start">
        <div className="text-dark/60">
          Balance from your wallet{" "}
          <span className="text-primary">(Top up wallet balance)</span>
        </div>
        <div className="font-bold text-2xl font">$10.00</div>
        <PrimaryButton className="px-20" onClick={handleTopup}>
          <span className="icon-[solar--wallet-money-bold-duotone] mr-2"></span>
          TOP UP
        </PrimaryButton>
      </div>
    </div>
  );
};
