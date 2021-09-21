import React, { useState } from 'react';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import reactCSS from 'reactcss';
import { _hexRgb } from '../../shared/functions';
import { ChromePicker } from 'react-color';
import { createZone } from '../../api/zones';

const ZoneInfo = (props) => {
    const { color, openModal, handleCloseTemp, setColor, redrawPoly, tempCords, token, setModal, setZones } = props;
    const [picking, setPicking] = useState(false);
    const [name, setName] = useState('');

    const styles = reactCSS({
        'default': {
            Picked: {
                backgroundColor: `${_hexRgb(color)}, 0.55)`,
                height: '15px',
                margin: '5px',
                border: `2px solid ${_hexRgb(color)}, 0.55)`,
                cursor: 'pointer',
                borderRadius: '0.2rem'
            },
            popover: {
                position: 'absolute',
                zIndex: '3',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        }
    })

    const _handlePicking = (bol) => {
        setPicking(bol);
    }

    const _handleColorChange = (color) => {
        setColor(color.hex);
        redrawPoly();
    }

    const _handleNameChange = (name) => {
        setName(name);
    }

    const _handleAddZone = () => {
        const obj = { label: name, color: color, points: tempCords }
        setModal(false);
        handleCloseTemp();
        createZone(token, obj, setZones);
    }

    return (
        <Modal open={openModal} onClose={handleCloseTemp} >
            <div className="Zone_Info">
                <div className="Modal_Title">
                    Fill zone info
                </div>
                <div className="Divider"></div>
                <div className="Modal_Input">
                    <div className="Input_Row">
                        <div className="col-4">Name:</div>
                        <input
                            className="col-8 Add_Name"
                            type="text"
                            onChange={(e) => _handleNameChange(e.target.value)}
                        />
                    </div>
                    <div className="Input_Row">
                        <div className="col-4">Color:</div>
                        <div className="col-8" style={styles.Picked} onClick={() => _handlePicking(true)} />
                    </div>
                </div>
                {picking &&
                    <div style={styles.popover}>
                        <div style={styles.cover} onClick={() => _handlePicking(false)} />
                        <ChromePicker color={color} onChange={_handleColorChange} />
                    </div>}
                <Button
                    text={"Add Zone"}
                    disabled={name.length < 1}
                    func={_handleAddZone} />
            </div>
        </Modal>
    )
}

export default ZoneInfo;