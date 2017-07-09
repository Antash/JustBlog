import axios from 'axios';
import qs from 'qs';
import { ILoginData } from '../Models/loginData';
import * as LoginActions from '../Actions/loginActions';

class AuthService {
    login(credentials: ILoginData) {
        //TODO uppercase qson convert
        axios.post("/login", qs.stringify({ UserName: credentials.userName, Password: credentials.password }))
            .then(response => {
                if (response.data == "success") {
                    LoginActions.login();
                }
            });
    }

    checkLogin() {
        axios.get("/login")
            .then(response => {
                if (response.data == "success") {
                    LoginActions.login();
                }
            });
    }
}

export default new AuthService()