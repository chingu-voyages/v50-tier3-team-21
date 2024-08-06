import { Outlet } from "react-router-dom";
import HeaderNav from "../components/ui/header";
import FooterComponent from "../components/ui/footer"
export const MainLayout = () => {
    return (
        <div className="flex flex-col">
            <HeaderNav></HeaderNav>
            <main className="w-full mt-28">
                <Outlet />
            </main>
            <FooterComponent></FooterComponent>
        </div>
    )
}
