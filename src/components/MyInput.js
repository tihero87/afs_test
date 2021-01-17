import React, { useRef } from 'react';

const MyInput = ({id, className, label, error, ...attrs}) => {

    const labelInput = useRef(null);

    const handleChange = (e) => {
        const myLabel = labelInput.current;

        if(e.target.value !== ""){
            myLabel.classList.remove('empty');
            myLabel.classList.add('notEmpty');
        }
    };

    return (
        <div className="inputWrapper">
            { label &&
                <label ref={labelInput} className="inputLabel empty" htmlFor={id}> {label} </label>
            }
            { attrs.required &&
                <span className="inputRequired">{attrs.required}</span>
            }

            <input
                id={id}
                name={id}
                className={className}
                defaultValue={label}
                {...attrs}
                onChange={handleChange}
                onClick={handleChange}
            />
            { error &&
                <span className="inputError"> {error} </span>
            }
        </div>
    )
};

export default MyInput;