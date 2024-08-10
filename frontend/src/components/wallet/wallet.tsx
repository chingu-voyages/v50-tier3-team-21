import { useEffect, useState } from "react";
import { httpClient } from "../../lib/http-client";
import PrimaryButton from "../ui/button";
import { TopupModal } from "./topup-modal";
import { TopupSuccessModal } from "./topup-success-modal";
import { useSearchParams } from "react-router-dom";

// types
interface WalletResponse {
  balance: number;
}

export const Wallet = () => {
  const [balance, setBalance] = useState<string>("");
  const [showTopupModal, setShowTopupModal] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  // load page by fetching current wallet balance 
  useEffect(() => {
    async function getBalance() {
      try {
        const response = await httpClient.get<WalletResponse>("/wallets");
        const balanceCents = response.data.balance;
        const formattedBalance = formatBalance(balanceCents);
        setBalance(formattedBalance);
      } catch (error) {
        console.log(error);
        setBalance("error loading balance")
      }
    }

    getBalance();
  }, [balance]);

  useEffect(() => {
    // if success is true, set showSuccess module
    const successParam = searchParams.get("success");
    const wasSuccess = successParam === "true"
    setShowSuccess(wasSuccess)
  }, [searchParams]);
  // format blanace from cents to dollar/cents with necessary 0s
  const formatBalance = (balanceCents: number) => {
    return (balanceCents / 100).toFixed(2);
  };

  // initiate modal to topof wallet
  const handleTopup = async () => {
    setShowTopupModal(prev => !prev)
  };
  return (
    <div className="w-full">
      <p className="text-primary text-lg mb-5">Balance & Top up Wallet</p>
      <div className="bg-secondary/10 rounded-xl p-5 flex flex-col gap-3 items-start">
        <div className="text-dark/60">
          Balance from your wallet{" "}
          <span className="text-primary">(Top up wallet balance)</span>
        </div>
        <div className="font-bold text-2xl font tracking-wider">${balance}</div>
        <PrimaryButton className="px-20" onClick={handleTopup}>
          <span className="icon-[solar--wallet-money-bold-duotone] mr-2"></span>
          TOP UP
        </PrimaryButton>
      </div>
      {showTopupModal && <TopupModal balance={balance} setShowTopupModal={setShowTopupModal}/>}
      {showSuccess && <TopupSuccessModal setShowSuccess={setShowSuccess} />}
    </div>
  );
};
