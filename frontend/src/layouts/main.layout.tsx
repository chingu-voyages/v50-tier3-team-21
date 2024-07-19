import { Outlet } from "react-router-dom";
import HeaderNav from "../components/ui/header";

export const MainLayout = () => {
    return (
        <div>
            <HeaderNav ></HeaderNav>
            <main>
                <Outlet />
            </main>
            <footer>Footer</footer>
        </div>
    )
}
