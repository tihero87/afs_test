import React from 'react';
import IconPlus from "./icons/IconPlus";


const Button = ({className, name, icon, btnClick, ...attrs}) => {

    return(
        <button className={className} {...attrs} onClick={ btnClick }>
            {icon && <IconPlus/> }
            {name}
        </button>
    )
};

export default Button;
