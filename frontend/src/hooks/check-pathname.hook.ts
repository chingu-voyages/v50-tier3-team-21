import {useLocation} from "react-router-dom";

export const useCheckPathname = (path: string) => {
    const { pathname } = useLocation();
    if(!(pathname === path)){
        return null
    }
}
