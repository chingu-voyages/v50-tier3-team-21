import { Outlet } from "react-router-dom";
import HeaderNav from "../components/ui/header";

export const MainLayout = () => {
    return (
        <div className="flex flex-col">
            <HeaderNav></HeaderNav>
            <main className="w-full mt-28">
                <Outlet />
            </main>
            <footer>Footer</footer>
        </div>
    )
}
