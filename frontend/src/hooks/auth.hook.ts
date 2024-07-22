import {useContext} from "react";
import {AuthContext , IAuthContext} from "../provider/auth.provider.tsx";


export const useAuth = () => useContext<IAuthContext>(AuthContext);
