import React, { useState , useEffect} from 'react';
import OrganizationList from "./OrganizationList";
import {API_URL} from "../utils/api";
import Home from "./Home";
import Search from "./Search";

function Main({show}) {

    const [token, setToken] = useState("");
    const [user, setUser] = useState("USERNAME");

    useEffect(() => {
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
        getToken();
    },[user]);

    const changeName = () => {
        let input_username = document.getElementById("username");
        if (user !== input_username.value){
            setUser(input_username.value);
        }
    };

    return(
        <>
            { show === 0 && <Home user={user} getToken={changeName} /> }
            { show === 1 && <OrganizationList token={token} />}
            { show === 2 && <Search/> }
        </>
    )
}
export default Main;

