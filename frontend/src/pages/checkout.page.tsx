import {CheckoutHeader} from "../components/cart/cartHeader.tsx";
import {Outlet} from "react-router-dom";


export const CheckoutPage = () => {
  return(
      <section className="px-6 md:px-36">
          <CheckoutHeader />
          <Outlet />
      </section>
  )
}
