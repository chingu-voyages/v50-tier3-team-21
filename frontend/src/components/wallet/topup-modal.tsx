import { useEffect, useState } from "react";
import PrimaryButton from "../ui/button";
import { httpClient } from "../../lib/http-client";
import topupSuccess from "../../assets/topup-hippo-success.png";

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
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // everytime the topUp amount changes, recalculate the new total
    const total = (+balance + +topupAmount).toFixed(2);
    setNewTotal(total);
  }, [topupAmount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopupAmount(e.target.value);
    setError(null);
  };

  const handleTopup = async () => {
    // if there is no input, dispay error
    if (newTotal === balance || newTotal === "0.00") {
      setError("Please enter an amount...");
      return;
    }
    // alert("TOPED");
    // setShowTopupModal(false);

    // try {
    //   const response = await httpClient.post("/wallets/requestAccountTopup", {
    //     header: { Authorization: `Bearer YOUR_SECRET_KEY` },
    //     body: { amount: +topupAmount },
    //   });
    //   console.log(response);
    //   setShowSuccess(true)
    // } catch (error) {
    //   console.log(error);
    // setError(error.message)
    // }
  };
  return (
    <div className="absolute inset-0 bg-[#291E43]/10 flex items-center justify-center">
      <div className="bg-white p-5 rounded-2xl min-w-[350px]">
        {!showSuccess ? (
          <div id="container" className="flex flex-col gap-5 relative">
            <div>
            <div className="text-xl cursor-pointer absolute right-0" onClick={() => setShowTopupModal(false)}>
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
              <PrimaryButton className="px-10" onClick={handleTopup}>
                TOP UP
              </PrimaryButton>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};
