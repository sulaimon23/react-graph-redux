import { apolloClient } from "../../graphql";
import { LOG_IN, SIGN_UP } from "./queries";
import { AuthResponse, AuthData } from '../types';


// 
// 
class AuthService {
    async login(params: AuthData): Promise<AuthResponse> {
        try {
            const response = await apolloClient.mutate({
                mutation: LOG_IN,
                variables: { ...params },
            });
            return response.data.login;
        } catch (err) {
            throw err;
        }
    }
    // 
    async signup(params: AuthData): Promise<AuthResponse> {
        try {
            const response = await apolloClient.mutate({
                mutation: SIGN_UP,
                variables: { ...params },
            });
            return response.data.signup;
        } catch (err) {
            throw err;
        }
    }
}

export default new AuthService();
