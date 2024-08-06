// api request with mutation methods POST | PUT | PATCH | DELETE
import {useMutation} from "@tanstack/react-query";
import {
    ChangePasswordType ,
    LoginSchemaType ,
    ResetPasswordType ,
    SignUpSchemaType
} from "../../../types/authentication/auth.types.ts";
import {authService } from "./auth.service.ts";


//todo: handle error and display it using toast
export const  useLoginWithPasswordAndEmail = () => {
    return useMutation(
        {
            mutationKey: ['login'],
            mutationFn: (data: LoginSchemaType) => authService.loginWithPasswordAndEmail(data)
        }
    )
}

export const useSignUpWithCredentials = () => {
     return useMutation(
         {
             mutationKey: ['signup'],
             mutationFn: (data: SignUpSchemaType) => authService.signupWithCredentials(data)
         }
     )
}

export const useSendPasswordResetEmail = () => {
    return useMutation(
        {
            mutationKey: ['reset-password-email'],
            mutationFn: (data: ResetPasswordType) => authService.sendPasswordResetEmail(data)
        }
    )
}

export const useChangePassword = () => {
    return useMutation(
        {
            mutationKey: ['change-password'],
            mutationFn: (data: ChangePasswordType) => authService.changePassword(data)
        }
    )
}
