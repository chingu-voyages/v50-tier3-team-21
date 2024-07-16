import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
interface HeaderNavProps {
    isLoggedIn?: boolean;
    onLogout?: boolean;
    children: ReactNode;
}
export default function HeaderNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="bg-white">
            {/* <nav>
                {true ? (
                    <>
                        <div>Order & Sign In</div>
                        <Link to="/profile">Profile</Link>
                        <Link to="/order">Order</Link>
                    </>
                ) : (
                    <>
                        <div>Order & Logout</div>
                        <Link to="/auth">Sign in</Link>
                        <Link to="/order">Order</Link>
                    </>
                )}
            </nav> */}
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img alt="" src="logo image here" className="h-8 w-auto" />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <img src="assets/icons/menu-close.svg" aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
            </nav>
        </header>
    );
}