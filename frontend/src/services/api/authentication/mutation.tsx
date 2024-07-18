// api request with mutation methods POST | PUT | PATCH | DELETE
import {useMutation} from "@tanstack/react-query";
import {LoginSchemaType , SignUpSchemaType} from "../../../types/authentication/auth.types.ts";
import {authService } from "./auth.service.ts";


//todo: handle error and display it using toast
export const  useLoginWithPasswordAndEmail = () => {
    return useMutation(
        {
            mutationFn: (data: LoginSchemaType) => authService.loginWithPasswordAndEmail(data)
        }
    )
}

export const useSignUpWithCredentials = () => {
     return useMutation(
         {
             mutationFn: (data: SignUpSchemaType) => authService.signupWithCredentials(data)
         }
     )
}
