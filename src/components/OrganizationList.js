import React, { useState } from 'react';
import {List} from '../utils/orgList'
import Organization from "./organization/Organization";

function OrganizationList({token}) {
    const [organizations, setOrganizations] = useState(List);
    const [org, setOrg] = useState(null);

    const selectOrg = id => {
        setOrg(organizations.filter(item => {
            return item.id === id
        })[0]);
    };
    const resetOrg = () => {
     setOrg(null)
    };

    function addOrgFromAPI(newOrg){
        setOrganizations(organizations.filter(item => {
            return item.id !== newOrg.id
        }).concat(newOrg));
        selectOrg(newOrg.id);
    }

    return(
        <>
            { org === null && (
                <div className="main">
                    <div className="main_header">
                        <p>Список организаций</p>
                    </div>
                    <div className="main_body">
                        <ul>
                            { organizations.map(el => <li key={el.id} onClick = {() => selectOrg(el.id)}>{el.name}</li>)}
                        </ul>
                    </div>
                </div>)
            }

            {
               org !== null  && <Organization org={org} showListOrg={resetOrg} token={token} addOrgFromAPI={addOrgFromAPI}/>
            }
        </>
    )
}
export  default OrganizationList;