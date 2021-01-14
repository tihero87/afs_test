import React from 'react';
import IconPlus from "./icons/IconPlus";


const Button = ({className, name, icon, btnClick, ...attrs}) => {

    return(
        <button className="btn" {...attrs} onClick={ btnClick }>
            {icon && <IconPlus/> }
            {name}
        </button>
    )
};

export default Button;

//const MyInput = ({id, className, label, error, ...attrs}) => {
//
//
//     return (
//         <div className="inputWrapper">
//             { label &&
//                 <label className="inputLabel empty" htmlFor={id}> {label} </label>
//             }
//             { attrs.required &&
//                 <span className="inputRequired">{attrs.required}</span>
//             }
//             <input
//                 id={id}
//                 name={id}
//                 className={className}
//                 {...attrs}
//             />
//             { error &&
//                 <span className="inputError"> {error} </span>
//             }
//         </div>
//     )
// };