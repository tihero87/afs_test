import React from 'react';
import MyInput from "./MyInput";

function Search() {

    return(
        <div className="main">
            <div className="main_header">
                <p>Поиск</p>
            </div>
            <br/>
            <div className="main_body">
                <input className="btn" type="text" placeholder='Что искать?'></input>
                <button className="btn" >
                    Найти
                </button>
<br/> <br/>
                <MyInput id={1} className="input" label="Первый инпут" />

                <MyInput id={2} className="input" label="Второй инпут" />


            </div>
        </div>

    )
}
export default Search;