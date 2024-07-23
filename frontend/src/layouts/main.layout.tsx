import { Outlet } from "react-router-dom";
import HeaderNav from "../components/ui/header";
import Footer from "../components/ui/footer";

export const MainLayout = () => {
    return (
        <div className="grid grid-rows-[auto_1fr_auto] min-h-[100dvh]">
            <header>
                <HeaderNav ></HeaderNav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer><Footer /></footer>
        </div>
    )
}
