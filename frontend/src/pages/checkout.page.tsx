import {CheckoutHeader} from "../components/cart/cartHeader.tsx";
import {Outlet} from "react-router-dom";


export const CheckoutPage = () => {
  return(
      <section className="spacing-x">
          <CheckoutHeader />
          <Outlet />
      </section>
  )
}
