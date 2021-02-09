import {useState, useEffect} from 'react';

export const useValidInput = (value, validations) => {

    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const [validForm, setValidForm] = useState(false);

    useEffect(() => {
        for(let validation in validations){
            switch (validation) {
                case 'isEmpty':
                    value ? setEmpty(false): setEmpty(true);
                    break;
                case 'minLength':
                    value.length > validations[validation] ? setMinLengthError(false) : setMinLengthError(true);
                    break;
                case 'email':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true);
                    break;
                case 'phonenumber':
                    const phone = /^[+\d-\s\(\)]+$/;
                    phone.test(value) ? setPhoneError(false) : setPhoneError(true);
                    break;
                default:
                    break;
            }
        }
    },[value, validations]);

    useEffect(() => {
        if( isEmpty || minLengthError || emailError || phoneError){
            setValidForm(false)
        } else {
            setValidForm(true)
        }
    },[isEmpty, minLengthError, emailError, phoneError]);

    return {
        isEmpty,
        minLengthError,
        emailError,
        phoneError,
        validForm
    }
};