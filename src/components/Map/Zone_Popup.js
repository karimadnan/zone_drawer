import React from 'react';
import Button from '../Shared/Button';
import { deleteZone } from '../../api/zones';

const ZonePopup = (props) => {
    const { zone, token, setZones } = props;

    const _handleDelete = () => {
        deleteZone(token, zone._id, setZones);
    }

    return (
        <div className="Zone_Popup">
            {zone.label}
            <Button text={"Remove"} func={_handleDelete} />
        </div>
    )
}

export default ZonePopup;