import { Outlet } from "react-router-dom";
import HeaderNav from "../components/ui/header";
import FooterComponent from "../components/ui/footer"
export const MainLayout = () => {
    return (
        <div className="grid grid-rows-[auto_1fr_auto] min-h-[100dvh]">
            <header><HeaderNav/></header>
            <main className="w-full mt-28">
                <Outlet />
            </main>
            <footer>
                <FooterComponent></FooterComponent>
            </footer>
        </div>
    )
}
