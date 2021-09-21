import React, { useState } from 'react';
import Login from './screens/Login';
import Drawer from './screens/Drawer';
import { vars } from './assets/data/vars';

const App = () => {
    const [center, setCenter] = useState({
        lat: vars.stLat,
        lng: vars.stLng
    });
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState('');

    return (
        <>
            {auth ?
                <Drawer
                    center={center}
                    setCenter={setCenter}
                    token={token}
                />
                :
                <Login setAuth={setAuth} setToken={setToken} />}
        </>
    )
}

export default App;