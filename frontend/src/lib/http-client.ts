import axios , {AxiosInstance ,AxiosResponse} from "axios";
import {authService} from "../services/api/authentication/auth.service.ts";

export class HttpClient {
    //private static readonly  baseUrl  = process.env.REACT_API_REMOTE_BASE_URL || process.env.REACT_API_LOCAL_BASE_URL;
    private client(): AxiosInstance {
        const axiosConfig = {
            baseURL: import.meta.env.VITE_NODE_ENV === 'development' ? import.meta.env.VITE_LOCAL_API_BASE_URL : import.meta.env.VITE_REMOTE_API_BASE_URL,
            withCredentials: true
        }
        let axiosInstance = axios.create(axiosConfig);
        axiosInstance.defaults.withCredentials = true;
        //add a request interceptor
        axiosInstance.interceptors.request.use((config) => {
                return config
            }, (error) => {
                return Promise.reject(error)
            }
        )
        //add a response interceptor
         axiosInstance.interceptors.response.use(
             (response) => {
                      return response;
                      },
             async (error) => {
                 if(error.response  && error.response.status === 401){
                     try{
                         await authService.refreshAccessToken();
                         return axiosInstance(error.config);
                     }catch(refreshTokenError){
                         return Promise.reject(refreshTokenError);
                     }
                 } else {
                     return  Promise.reject(error);
                 }
             }
         )
        return axiosInstance
    }
    public  get<T>(url: string): Promise<AxiosResponse<T>>{
        return this.client().get(url);
    }
    public  post<T>(url: string, payload: T) : Promise<AxiosResponse>{
        return this.client().post(url, payload);
    }
    public put<T>(url: string, payload: T) : Promise<AxiosResponse>{
        return this.client().put(url, payload);
    }
    public patch<T>(url: string, payload: T): Promise<AxiosResponse> {
        return this.client().patch(url, payload);
    }
    public delete(url: string): Promise<AxiosResponse> {
        return this.client().delete(url);
    }

}

export  const httpClient = new HttpClient();
