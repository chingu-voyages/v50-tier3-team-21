import { useEffect, useState } from "react";
import PrimaryButton from "../ui/button";
import { httpClient } from "../../lib/http-client";
import { useLocation } from "react-router-dom";

interface TopupModalPropsTypes {
  balance: string;
  setShowTopupModal: (status: boolean) => void;
}
export const TopupModal = ({
  balance,
  setShowTopupModal,
}: TopupModalPropsTypes) => {
  const [topupAmount, setTopupAmount] = useState<string>("");
  const [newTotal, setNewTotal] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    // everytime the topUp amount changes, recalculate the new total
    const total = (+balance + +topupAmount).toFixed(2);
    setNewTotal(total);
  }, [topupAmount]);

  // when numbers are entered into input, topupAmount state is saved and errors are reset
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopupAmount(e.target.value);
    setError(null);
  };

  // send API reqeust to add money to wallet 
  const handleTopup = async () => {
    // if there is no input, dispay error
    if (newTotal === balance || newTotal === "0.00") {
      setError("Please enter an amount...");
      return;
    }
    // send API request to add amount (will also send origin/return path ie /profile or /cart)
    try {
      setIsLoading(true);
      const response = await httpClient.post(`/wallets/requestAccountTopup`, {
        amount: +topupAmount,
        successUrl: location.pathname,
        cancelUrl: location.pathname
      });
      const {url} = response.data
      // redirect user to response URL to complete payment on stripe website
      window.location.href = url;
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
    }
  };
  return (
    <div className="absolute inset-0 bg-[#291E43]/10 flex items-center justify-center">
      <div className="bg-white p-5 rounded-2xl min-w-[350px]">
          <div id="container" className="flex flex-col gap-5 relative">
            <div>
              <div
                className="text-xl cursor-pointer absolute right-0"
                onClick={() => setShowTopupModal(false)}
              >
                <span className="icon-[material-symbols-light--close]"></span>
              </div>
              <div className="mb-3">Enter amount to Top Up</div>
              <input
                type="number"
                min="1"
                className="outline rounded-lg p-3 w-full"
                name="topupAmount"
                id="topupAmount"
                value={topupAmount}
                onChange={handleChange}
              />
              {error && <p className="text-danger text-xs absolute">{error}</p>}
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <div className="mb-1 text-xs">Available Balance:</div>
                <div className="bg-secondary/10 text-secondary p-3 rounded-lg">
                  $ {balance}
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-1 text-xs">Your new balance will be:</div>
                <div className="bg-secondary/10 text-secondary p-3 rounded-lg">
                  $ {newTotal}
                </div>
              </div>
            </div>
            <div className="self-end mb-5">
              <PrimaryButton className="px-10" isLoading={isLoading} onClick={handleTopup}>
                TOP UP
              </PrimaryButton>
            </div>
          </div>
      </div>
    </div>
  );
};
