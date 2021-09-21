import React, { useState, useEffect } from 'react';
import Map from '../components/Map/Map';
import { getZones } from '../api/zones';

const Drawer = (props) => {
    const [zones, setZones] = useState([]);

    useEffect(() => {
        getZones(props.token, setZones);
    }, [props.token]);

    return (
        <div className="Drawer_Screen">
            <Map
                data={zones}
                center={props.center}
                setZones={setZones}
                token={props.token}
            />
        </div>
    )
}

export default Drawer;