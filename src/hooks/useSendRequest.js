import {useEffect, useState} from 'react'

const SendRequest = (METHOD, URL, TOKEN) => {

    const [org,setOrg] = useState(null);

    useEffect(() => {
        fetch(URL, {
            method: METHOD,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN,
            }
        }).then(response => {
            if (response.status < 400) {
                return response.json();
            }
            if(response.status === 404){
                console.log(`Информация не найдена`);
            }
            else
                throw response;
        })
            .then(data => {
                setOrg(data);
            });
    },[]);

return org;

};

export default SendRequest;