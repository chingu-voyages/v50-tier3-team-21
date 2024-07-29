import { Outlet } from "react-router-dom";
import HeaderNav from "../components/ui/header";
import FooterComponent from "../components/ui/footer"
export const MainLayout = () => {
    return (
        <div>
            <HeaderNav ></HeaderNav>
            <main>
                <Outlet />
            </main>
            <FooterComponent></FooterComponent>
        </div>
    )
}
