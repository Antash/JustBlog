import axios from 'axios';
import qs from 'qs';
import * as LoginActions from '../Actions/loginActions';

class AuthService {
    login(username: string, password: string) {
        axios.post("/login", qs.stringify({ User: username, Password: password }))
            .then(response => {
                let jwt = response.data.id_token;
                LoginActions.login(jwt);
            });
    }
}

export default new AuthService()