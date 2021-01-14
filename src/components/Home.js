import React from 'react';

function Home({user, handleChange, getToken}) {

    return(
        <div className="main">
            <div className="main_header">
                <p>Домашняя страница</p>
            </div>
            <br/>
            <div className="main_body">
                <label>Имя</label>
                <input id="name" type="text" value={user} className="" onChange={handleChange}>

                </input>
                <button className="btn" onClick={getToken} >
                    Login
                </button>
            </div>
        </div>

    )
}
export default Home;