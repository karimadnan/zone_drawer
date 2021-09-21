import React, { useState, useEffect } from 'react';
import Button from '../components/Shared/Button';
import { login } from '../api/login';

const Login = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [logging, setLogging] = useState(false);
    const [error, setError] = useState('')

    const _handleChange = (action, value) => {
        action(value);
    }

    const _handleLogin = () => {
        if (userName !== '' || password !== '') {
            setLogging(true);
            login({ username: userName, password: password }, setLogging, props.setToken, props.setAuth, setError);
        }
    }

    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                _handleLogin();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    });

    return (
        <div className="Login_Screen">
            <div className="Drawer_Image" />
            <div className="Login_Window">
                <div className="Login_Title">
                    <div className="Title_One">Zone</div>
                    <div className="Title_Two">Drawer</div>
                </div>
                <div className="Login_Box">
                    <input
                        className="Add_Name"
                        type="text"
                        placeholder={"Username"}
                        onChange={(e) => _handleChange(setUserName, e.target.value)}
                    />
                    <input
                        className="Add_Name"
                        type="password"
                        placeholder={"Password"}
                        onChange={(e) => _handleChange(setPassword, e.target.value)}
                    />
                    <Button loading={logging} text={"Login"} func={() => _handleLogin()} disabled={!userName || !password} />
                </div>
                {error && <p className="Error"> {error} </p>}
            </div>
        </div>
    )
}

export default Login