import React, { useState , useEffect} from 'react';
import OrganizationList from "./OrganizationList";
import {API_URL} from "../utils/api";
import Home from "./Home";
import Search from "./Search";

function Main({show}) {

    const [token, setToken] = useState("");
    const [user, setUser] = useState("USERNAME");

    function getToken(){
        fetch(`${API_URL}/auth?user=${user}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if(response.status < 400){
                setToken(response.headers.get("Authorization"));
            } else
                throw response;
        })
    }

    useEffect(() => {

        getToken();
    },[]);

    const handleChange = event => {
        setUser(event.target.value);
    };

    return(
        <>
            { show === 0 && <Home user={user}
                                  handleChange={handleChange}
                                  getToken={getToken} /> }
            { show === 1 && <OrganizationList token={token} />}

            { show === 2 && <Search/> }

        </>
    )
}
export default Main;

