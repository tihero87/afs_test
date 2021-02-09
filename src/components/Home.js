import React, {useState} from 'react';
import MyInput from "./MyInput";
import Button from "./Button";
import {useValidInput} from "../hooks/useValidInput";

function Home({user, getToken}) {

    const [value, setValue] = useState('');
    let valid = useValidInput (value, { isEmpty: true, minLength: 3});

    const changeInput = (e) => {
        setValue(e.target.value);
    };


    return(
        <div className="main">
            <div className="main_header">
                <p>Домашняя страница</p>
            </div>
            <br/>
            <div className="main_body">
                <MyInput
                    value={value}
                    valid={valid}
                    changeInput={changeInput}
                    id="username"
                    className="input"
                    label="username"
                    placeholder={user}
                />
                <Button
                    disabled={!valid.validForm}
                    className="btn"
                    name="Получить токен"
                    btnClick={getToken}
                />
            </div>
        </div>
    )
}
export default Home;
