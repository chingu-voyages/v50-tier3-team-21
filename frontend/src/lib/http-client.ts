import axios , {AxiosInstance , AxiosRequestConfig , AxiosResponse} from "axios";
import {authService } from "../services/api/authentication/auth.service.ts";

export class HttpClient {
    //private static readonly  baseUrl  = process.env.REACT_API_REMOTE_BASE_URL || process.env.REACT_API_LOCAL_BASE_URL;
    private client(): AxiosInstance {
        const axiosConfig = {
            baseURL: "http://localhost:3000/api", //todo: use env variable instead of this
            withCredentials: true
        }
        let axiosInstance = axios.create(axiosConfig);

        //add a request interceptor
        axiosInstance.interceptors.request.use((config) => {
                const accessToken: string | null = localStorage.getItem('token');
                const refreshToken: string | null = localStorage.getItem('refreshToken');

                if(config.url.includes('/refresh-token') && refreshToken ) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }else if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }

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
                 if(error.response  && error.response.status === '401'){
                     try{
                         await authService.refreshAccessToken();
                         const accessToken: string | null = localStorage.getItem('token');
                         error.config.headers.Authorization = ` Bearer ${accessToken}`;
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
    public  get(url: string): Promise<AxiosResponse>{
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
