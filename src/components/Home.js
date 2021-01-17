import React from 'react';
import MyInput from "./MyInput";
import Button from "./Button";

function Home({user, getToken}) {

    return(
        <div className="main">
            <div className="main_header">
                <p>Домашняя страница</p>
            </div>
            <br/>
            <div className="main_body">
                <MyInput id="username" className="input" label="username" placeholder={user}  />
                <Button className="btn" name="Получить токен" btnClick={getToken} />
            </div>
        </div>
    )
}
export default Home;
