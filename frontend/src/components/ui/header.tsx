import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth.hook.ts";
import { Link, useNavigate } from "react-router-dom";
import { httpClient } from "../../lib/http-client.ts";
import { UserType, ProfileResponse } from "../profile/types/profile-types.ts";
import { MenuItemType, OrderType } from "../restaurant/types/restaurant-types.ts";

export interface HeaderNavProps {
    isLoggedIn?: boolean;
    onLogout?: boolean;
    children: ReactNode;
}
export default function HeaderNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const [user, setUser] = useState<UserType>();
    const [cartCount, setCartCount] = useState<number>(0)
  
    const navigate = useNavigate();
    const mobileLinks = [
        { name: 'Home', href: '/', icon: 'icon-[lets-icons--home-duotone]' },
        { name: 'Profile', href: '/profile', icon: 'icon-[ph--user-duotone]' },
        { name: 'Wallet', href: '/profile?success', icon: 'icon-[solar--wallet-money-bold-duotone]' },
        { name: 'Cart', href: '/checkout/order/confirm', icon: 'icon-[solar--cart-large-4-bold-duotone]' },
        { name: 'Recent Orders (Soon!) ', href: '#', icon: 'icon-[solar--history-line-duotone]' },
    ]

    useEffect(() => {
        async function getUser() {
            const response = await httpClient.get<ProfileResponse>("/profile");
            const { data } = response.data;
            setUser(data);
        }
        getUser();
    }, []);

    useEffect(() => {
        const cart = localStorage.getItem("shoppingCart");
        if(cart) {
            const formattedCart = JSON.parse(cart);
            const total = formattedCart.reduce((sum: number, item: OrderType) => sum = sum + (item.quantity ?? 0), 0);
            setCartCount(total);
        }
    }, [localStorage.getItem("shoppingCart")])

    return (
        <header className="bg-white fixed w-full z-50">
            <nav aria-label="Global" className="relative mx-auto flex md:gap-3 w-full spacing-x items-center justify-between  py-8">
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
                    {/* <div className="text-lg text-dark/60">{isAuthenticated ? 'Order & Log Out' : 'Sign In & Order'}</div> */}
                </div>
                {isAuthenticated ? (
                    <>
                        <button
                            onClick={() => navigate("/profile")}
                            type="button"
                            className="hidden md:inline-flex items-center justify-center  p-2.5 text-dark"
                        >
                            <span className="sr-only">My Profile</span>
                            <span className="icon-[ph--user-duotone] h-8 w-8 mr-3" style={{ color: "#49CC76" }}></span>
                            <span>{isAuthenticated ? user && user?.firstName : ''}</span>
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
                            onClick={() => navigate("/checkout/order/confirm")}
                            className="relative rounded-full bg-primary  inline-flex items-center justify-center  p-2.5 text-white "
                        >
                            <span className="sr-only">Go to Cart</span>
                            <span className="icon-[solar--bag-smile-bold-duotone] h-[30px] w-[30px] md:h-6 md:w-6" style={{ color: "white" }}></span>
                            <span className="sr-only">Notifications</span>
                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-dark  rounded-full -top-2 -end-2">{cartCount}</div>
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
                                    className="flex items-center gap-2 hover:scale-105 transition cursor-pointer group">
                                    <span className={` h-6 w-6  ${item.icon} group-hover:bg-primary`} style={{ color: "#291E43" }}></span>
                                    <span className="sr-only">{item.name}</span>
                                    <a href={item.href} className="block py-2 px-3 text-sm whitespace-nowrap">{item.name}</a>
                                </li>
                            ))}
                            {
                                isAuthenticated ? (
                                    <li
                                        className="flex items-center gap-2 hover:scale-105 transition cursor-pointer group">
                                        <span className=" h-6 w-6 icon-[solar--logout-3-line-duotone] group-hover:bg-secondary" style={{ color: "#291E43" }}></span>
                                        <span className="sr-only">Logout</span>
                                        <a onClick={() => logout()} className="block py-2 px-3 text-sm whitespace-nowra">Logout</a>
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
