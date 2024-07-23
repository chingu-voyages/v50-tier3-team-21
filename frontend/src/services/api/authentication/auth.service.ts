import {LoginSchemaType , SignUpSchemaType} from "../../../types/authentication/auth.types.ts";
import {httpClient } from "../../../lib/http-client.ts";


class AuthService {
    public loginWithPasswordAndEmail(loginData: LoginSchemaType ) {
        return httpClient.post<LoginSchemaType>('/auth/login',loginData);
    }
    public signupWithCredentials(signupData: SignUpSchemaType) {
        return httpClient.post<SignUpSchemaType>('/auth/signup', signupData);
    }
    public  refreshAccessToken() {
        return httpClient.post<any>('/auth/refresh-token', {});
    }
    public  logout() {
        return httpClient.post<any>('/auth/logout', {});
    }
}

export const authService = new AuthService();