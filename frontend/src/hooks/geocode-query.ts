import {useEffect , useState} from "react";



export const useGeocodeQuery = () => {


    useEffect(() => {
        let  abortController = new AbortController();

        return () => {
            abortController.abort();
        }
    } , []);
}

