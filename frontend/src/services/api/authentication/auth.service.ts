import {
    ChangePasswordType ,
    LoginSchemaType ,
    ResetPasswordType ,
    SignUpSchemaType
} from "../../../types/authentication/auth.types.ts";
import {httpClient } from "../../../lib/http-client.ts";


class AuthService {
    public loginWithPasswordAndEmail(loginData: LoginSchemaType ) {
        return httpClient.post<LoginSchemaType>('/auth/login',loginData);
    }
    public signupWithCredentials(signupData: SignUpSchemaType) {
        return httpClient.post<SignUpSchemaType>('/auth/signup', signupData);
    }
    public  refreshAccessToken() {
        return httpClient.get('/auth/refresh-token');
    }
    public  logout() {
        return httpClient.post<any>('/auth/logout', {});
    }
    public sendPasswordResetEmail(resetPasswordData: ResetPasswordType) {
        return httpClient.post<ResetPasswordType>('/resetpassword/send-password-reset-email', resetPasswordData)
    }
    public changePassword(changePasswordData: ChangePasswordType) {
        return httpClient.post<ChangePasswordType>('/resetpassword/reset-password', changePasswordData)
    }

}

export const authService = new AuthService();
