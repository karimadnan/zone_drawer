import React from 'react';
import Loading from '../../assets/svg/rolling.svg'

const Button = (props) => {
    const { disabled, loading, func, text } = props;
    return (
        <div className={!disabled && !loading ? "Button" : "Disabled_Button"} onClick={!disabled && !loading ? func : null}>
            {loading ?
                <img src={Loading} alt="Loading" />
                : text}
        </div>
    )
}

export default Button;