import React, {useRef, useState} from 'react';

const MyInput = ({value, valid, changeInput, id, className, label, error, ...attrs}) => {

    const labelInput = useRef(null);
    const [dirty, setDirty] = useState(false);

    const handleChange = (e) => {
        const myLabel = labelInput.current;
        console.log('e', e);
        console.log('changeInput(e) ', changeInput);
        changeInput(e);
         if(e.target.value !== ""){
             myLabel.classList.remove('empty');
             myLabel.classList.add('notEmpty');
         }
    };
    const onBlur = (e) => {
        setDirty(true)
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
                className={(valid.isEmpty || valid.minLengthError || valid.emailError || valid.phoneError) && dirty ? "inputError input" : className}
                value={value}
                {...attrs}
                onChange={handleChange}
                onClick={handleChange}
                onBlur={onBlur}
            />
            { error &&
                <span className="inputError"> {error} </span>
            }
        </div>
    )
};

export default MyInput;