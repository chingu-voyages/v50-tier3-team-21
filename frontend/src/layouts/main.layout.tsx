import { Outlet } from "react-router-dom";
import HeaderNav from "../components/ui/header";
import FooterComponent from "../components/ui/footer"
export const MainLayout = () => {
    return (
        <div className="grid grid-rows-[auto_1fr_auto] min-h-[100dvh]">
            <header>
                <HeaderNav ></HeaderNav>
            </header>
            <main className="mb-36">
                <Outlet />
            </main>
            <footer>
                <FooterComponent></FooterComponent>
            </footer>
        </div>
    )
}
