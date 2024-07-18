import {LoginSchemaType , SignUpSchemaType} from "../../../types/authentication/auth.types.ts";
import {HttpClient} from "../../../lib/http-client.ts";


class AuthService {
    public loginWithPasswordAndEmail(loginData: LoginSchemaType ) {
        return HttpClient.post<LoginSchemaType>('/auth/login',loginData);
    }
    public signupWithCredentials(signupData: SignUpSchemaType) {
        return HttpClient.post<SignUpSchemaType>('/auth/signup', signupData);
    }
    public  refreshAccessToken() {
        return HttpClient.post<any>('/auth/refresh-token', {});
    }
    public  logout() {
        return HttpClient.post<any>('/auth/logout', {});
    }
}

export const authService = new AuthService();
