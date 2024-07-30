//small , useful function that used in the app

import {AxiosError} from "axios";

interface CustomErrorResponse {
    message: string;
}

export const isAxiosError = (error: any): error is AxiosError<CustomErrorResponse> => {
    return error.isAxiosError && error.response?.data;
};


