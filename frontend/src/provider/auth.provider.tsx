import React , {createContext , PropsWithChildren , useEffect , useState} from "react";


export interface IAuthContext {
    data: IUser | null,
    isAuthenticated: boolean,
    loggedIn: ()  => void,
    storeUserData: (data: IUser) => void
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
   const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false);
   const [userData, setUserData ] = useState<IUser>(null);

   const handleLoggedIn = () => {
       setIsAuthenticated(true);
   }
   const storeUserData = (userData: IUser) => {
       setUserData(userData)
   }
   const handleLogout = () => {
       setUserData(null)
       setIsAuthenticated(false)
   }
   return (
        <AuthContext.Provider  value={{ isAuthenticated: isAuthenticated, data: userData, loggedIn: handleLoggedIn, logout: handleLogout, storeUserData}}>
            { children }
        </AuthContext.Provider>
   )
}
