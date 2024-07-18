import React , {createContext , PropsWithChildren , useEffect , useState} from "react";


export interface IAuthContext {
    data: IUser | null,
    isAuthenticated: boolean,
    loggedIn: ()  => void,
    logout: () => void

}


interface IUser {

}
interface AuthProviderProps extends  PropsWithChildren {}

export  const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
   const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false);
   const [userData, setUserData ] = useState<IUser>(null);

   const handleLoggedIn = () => {
       setIsAuthenticated(true);
   }
   const handleLogout = () => {
       setUserData(null)
       setIsAuthenticated(false)
   }
   return (
        <AuthContext.Provider  value={{ isAuthenticated: isAuthenticated, data: userData, loggedIn: handleLoggedIn, logout: handleLogout}}>
            { children }
        </AuthContext.Provider>
   )
}
