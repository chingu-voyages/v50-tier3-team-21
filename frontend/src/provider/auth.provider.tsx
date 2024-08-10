import {createContext , PropsWithChildren , useState, useEffect} from "react";


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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData ] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const auth: boolean = JSON.parse(localStorage.getItem('authStatus'));

    if (auth !== undefined || auth !== null) {
      setIsAuthenticated(auth);
      // setUserData(userData);
    }
  }, []);

   const handleLoggedIn = () => {
       setIsAuthenticated(true);
       localStorage.setItem('authStatus', JSON.stringify(true));
   }
   const storeUserData = (userData: IUser) => {
       setUserData(userData);
   }
   const handleLogout = () => {
       setUserData(undefined)
       setIsAuthenticated(false)
       localStorage.setItem('authStatus', JSON.stringify(false));
   }
   return (
        <AuthContext.Provider  value={{ isAuthenticated: isAuthenticated, data: userData, loggedIn: handleLoggedIn, logout: handleLogout, storeUserData}}>
            { children }
        </AuthContext.Provider>
   )
}
