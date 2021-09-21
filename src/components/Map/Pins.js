import React from 'react';
import Pin from '../../assets/svg/pin.svg'

const Pins = (props) => {
    return (
        <img
            className="Temp_Pin"
            alt="Pin"
            src={Pin}
            onClick={props.do}
        />
    )
}

export default Pins;