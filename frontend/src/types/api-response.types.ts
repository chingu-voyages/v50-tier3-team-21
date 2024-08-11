
interface ApiResponse {
    status: string,
    message: string,
}

export interface ResponseWithData<T> extends ApiResponse{
    data: T
}


export interface IResponseWithData<T> {
    data: ResponseWithData<T>
}

export interface IResponse {
    data: {
        data: ApiResponse
    }
}



