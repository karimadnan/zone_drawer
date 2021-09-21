import Axios from 'axios';
import { vars } from '../assets/data/vars';

export function login(data, setLogging, setToken, setAuth, setError) {
    Axios.post(`${vars.endPoint}login`, data)
        .then(function (response) {
            setLogging(false);
            setToken(response.data.token);
            setAuth(true)
        })
        .catch(function (error) {
            setLogging(false);
            setError("Username or password are incorrect!");
        })
}