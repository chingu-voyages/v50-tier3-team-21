import { ReactNode, useState } from "react";
import {useAuth} from "../../hooks/auth.hook.ts";
import {Link, useNavigate} from "react-router-dom";
export interface HeaderNavProps {
    isLoggedIn?: boolean;
    onLogout?: boolean;
    children: ReactNode;
}
export default function HeaderNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const {isAuthenticated, data, logout} = useAuth();
    const navigate = useNavigate();
    const mobileLinks = [
        { name: 'Home', href: '/', icon: 'icon-[lets-icons--home-duotone]' },
        { name: 'Recent Orders', href: '/orders', icon: 'icon-[solar--history-line-duotone]' },
        { name: 'Location', href: '#', icon: 'icon-[solar--map-point-wave-bold-duotone]' },
        { name: 'Profile', href: '/profile', icon: 'icon-[ph--user-duotone]' },
    ]

    return (
        <header className="bg-white fixed w-full">
            <nav aria-label="Global" className="relative mx-auto flex md:gap-3 max-w-7xl items-center justify-between  p-8">
                <div className="hidden md:flex">
                    <a href="/" className="-m-1.5 p-1.5 flex items-end gap-2">
                        <span className="sr-only">Hungry Hippo</span>
                        <div className="bg-logo bg-contain bg-no-repeat bg-center h-12 w-12"></div>
                        <div className="text-2xl font-bold">Hungry Hippo</div>
                    </a>
                </div>
                <div className="flex md:hidden z-50">
                    {
                        mobileMenuOpen ? (
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="rounded-full bg-primary -m-2.5 inline-flex items-center justify-center  p-2.5 text-white"
                            >
                                <span className="sr-only">Close main menu</span>
                                <span className="icon-[solar--list-cross-minimalistic-bold-duotone] h-[30px] w-[30px]" style={{ color: "white" }}></span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                className="rounded-full bg-primary -m-2.5 inline-flex items-center justify-center  p-2.5 text-white"
                            >
                                <span className="sr-only">Open main menu</span>
                                <span className="icon-[ci--menu-alt-03] h-[30px] w-[30px]" style={{ color: "white" }}></span>
                            </button>
                        )
                    }
                </div>
                <div className="hidden md:flex flex-1 justify-end">
                    <div className="text-lg text-dark/60">{isAuthenticated ? 'Order & Log Out' : 'Sign In & Order'}</div>
                </div>
                {isAuthenticated ? (
                    <>
                        <button
                            onClick={() => navigate("/profile")}
                            type="button"
                            className="hidden md:inline-flex items-center justify-center  p-2.5 text-dark"
                        >
                            <span className="sr-only">My Profile</span>
                            <span className="icon-[ph--user-duotone] h-8 w-8" style={{ color: "#49CC76" }}></span>
                            <span>{isAuthenticated ? data && data?.firstName : ''}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => logout()}
                            className="hidden md:inline-flex items-center justify-center  p-2.5 text-dark"
                        >
                            <span className="sr-only">Log Out</span>
                            <span className="icon-[solar--logout-3-bold-duotone] h-8 w-8" style={{ color: "#49CC76" }}></span>
                        </button>
                        <button
                            type="button"
                            className="relative rounded-full bg-primary  inline-flex items-center justify-center  p-2.5 text-white "
                        >
                            <span className="sr-only">Go to Cart</span>
                            <span className="icon-[solar--bag-smile-bold-duotone] h-[30px] w-[30px] md:h-6 md:w-6" style={{ color: "white" }}></span>
                            <span className="sr-only">Notifications</span>
                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-dark  rounded-full -top-2 -end-2">0</div>
                        </button>

                    </>
                ) : (
                    <Link
                        to="/auth/signin"
                        className="hidden md:inline-flex items-center justify-center  p-2.5 text-dark"
                    >
                        <span className="sr-only">Log In</span>
                        <span className="icon-[solar--login-3-bold-duotone] h-8 w-8" style={{ color: "#49CC76" }}></span>
                    </Link>
                )}
                <div className={`absolute top-0 left-0 h-screen w-screen bg-white md:hidden  z-40${mobileMenuOpen ? '' : 'absolute hidden'}`}>
                    <div className="h-screen w-screen flex bg-primary/30 ">
                        <ul className="font-medium flex flex-col gap-y-5 p-6  text-dark/60 pt-24">
                            {mobileLinks.map((item) => (
                                <li key={item.name}
                                    className="flex items-center gap-2">
                                    <span className={` h-6 w-6  ${item.icon}`} style={{ color: "#291E43" }}></span>
                                    <span className="sr-only">{item.name}</span>
                                    <a href="#" className="block py-2 px-3 text-sm whitespace-nowrap">{item.name}</a>
                                </li>
                            ))}
                            {
                                isAuthenticated ? (
                                    <li
                                        className="flex items-center gap-2">
                                        <span className=" h-6 w-6 icon-[solar--logout-3-line-duotone]" style={{ color: "#291E43" }}></span>
                                        <span className="sr-only">Logout</span>
                                        <a onClick={() => logout()} className="block py-2 px-3 text-sm whitespace-nowrap">Logout</a>
                                    </li>
                                ) : (
                                    <li
                                        className="flex items-center gap-2">
                                        <span className=" h-6 w-6 icon-[solar--login-3-line-duotone]" style={{ color: "#291E43" }}></span>
                                        <span className="sr-only">LogIn</span>
                                        <Link to='/auth/signin' className="block py-2 px-3 tex-sm whitespace-nowrap">Sign In</Link>
                                    </li>
                                )
                            }

                        </ul>
                        <div className="bg-menuExpand bg-contain bg-no-repeat  h-3/4 flex-1 translate-y-1/4 bg-right"></div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
