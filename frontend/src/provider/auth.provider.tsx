import {createContext , PropsWithChildren , useState} from "react";
import {isAuthenticatedFn} from "../utils";
import {setItem} from "../utils/localstorage.ts";


export interface IAuthContext {
    data: IUser | undefined,
    isAuthenticated: boolean,
    loggedIn: ()  => void,
    storeUserData: (data: IUser) => void,
    logout: () => void
}


interface IUser {
    id: number
    username: string
    email: string
    contact: string
    firstName: string
    lastName: string
    updatedAt: string
    createdAt: string
}
interface AuthProviderProps extends  PropsWithChildren {}

export  const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
   const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(isAuthenticatedFn());
   const [userData, setUserData ] = useState<IUser | undefined>(undefined);

   const handleLoggedIn = () => {
       setItem("isAuth", "1")
       setIsAuthenticated(true);
   }
   const storeUserData = (userData: IUser) => {
       setUserData(userData)
   }
   const handleLogout = () => {
       setUserData(undefined)
       setItem("isAuth", "0")
       setIsAuthenticated(false)
   }
   return (
        <AuthContext.Provider  value={{ isAuthenticated: isAuthenticated, data: userData, loggedIn: handleLoggedIn, logout: handleLogout, storeUserData}}>
            { children }
        </AuthContext.Provider>
   )
}
