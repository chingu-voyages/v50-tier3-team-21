import { useEffect, useState } from "react";
import PrimaryButton from "../ui/button";

interface TopupModalPropsTypes {
  balance: string;
}
export const TopupModal = ({ balance }: TopupModalPropsTypes) => {
  const [topupAmount, setTopupAmount] = useState<string>("");
  const [newTotal, setNewTotal] = useState<string>("0");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopupAmount(e.target.value);
  };

  useEffect(() => {
    // everytime the topUp amount changes, recalculate the new total
    const total = (+balance + +topupAmount).toFixed(2);
    setNewTotal(total);
  }, [topupAmount]);

  return (
    <div className="absolute inset-0 bg-[#291E43]/10 flex items-center justify-center">
      <div className="bg-white p-3 rounded-2xl flex flex-col gap-5 min-w-[350px]">
        <div>
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
          <PrimaryButton className="px-10">TOP UP</PrimaryButton>
        </div>
      </div>
    </div>
  );
};
