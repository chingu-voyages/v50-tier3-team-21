import {Wallet} from "../profile/wallet.tsx";


export const PaymentInformation = () => {
  return(
      <div className="w-full flex flex-col gap-3">
          <h2 className="text-xl font-bold text-dark">Payment Information</h2>
          <Wallet />
      </div>
  )
}
