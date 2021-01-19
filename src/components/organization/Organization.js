import React, { useState, useEffect} from 'react'
import IconArrowBack from "../icons/IconArrowBack";
import {API_URL} from "../../utils/api";
import IconDelete from "../icons/IconDelete";
import IconUpdate from "../icons/IconUpdate";
import IconLinked from "../icons/IconLinked";
import SendRequest from "../../hooks/useSendRequest";
import {DefaultContact} from '../../utils/defaultContact';

import ContactPerson from "./ContactPerson";
import OrganizationInfo from "./OrganizationInfo";
import AttachPhoto from "./AttachPhoto";

function Organization({org, showListOrg, token, addOrgFromAPI}) {

    const [loader, setLoader] = useState(true);
    const [orgApi, setOrgApi] = useState(org);
    const [contact, setContact] = useState(DefaultContact);
    const [editInput, setEditInput] = useState(0);
    const [addPhotoInput, setAddPhotoInput] = useState(false);

    let data = SendRequest("GET", `${API_URL}/companies/${org.id}`, token);
    useEffect(() => {
        if(data !==null && data !== undefined && loader === true){
            setOrgApi(data);
            addOrgFromAPI(data);
        }
        if(data === undefined){
            alert("Информация не найдена");
            showListOrg(0);
        }
    },[data]);

    let contactApi = SendRequest("GET", `${API_URL}/contacts/${orgApi.contactId}`, token);
    useEffect(() => {
        if(contactApi !== null && contactApi !== undefined && loader === true){
            setContact(contactApi);
            setLoader(false);
        }
    });

    async function myRequest(method, url, token, obj) {
        return await fetch(url,{
            method: method,
            headers: {
                'Authorization': token,
            },
            body: JSON.stringify(obj)
        })
    }

    const addPhoto = () => {
        setAddPhotoInput(true);
        if(addPhotoInput){
            let attach = document.getElementById("photoinput").files[0];
            const formData = new FormData();
            formData.append('file', attach);

            fetch(`${API_URL}/companies/${orgApi.id}/image`, {
                method: "POST",
                headers: {
                    'Authorization': `${token}`
                },
                body: formData

            }).then(res => {
                if(res.status === 200){
                    return res.json();
                }
            }).then(data => {
                let newOrg = {...orgApi};
                newOrg.photos = [...newOrg.photos, data];
                setOrgApi(newOrg);
            });

            setAddPhotoInput(false);
        }
    };

    const delPhoto = (namePhoto) => {
        if(token !== ""){
            myRequest("DELETE", `${API_URL}/companies/${orgApi.id}/image/${namePhoto}`, token)
                .then(response => {
                    if(response.status === 200){
                        let delPhoto = orgApi.photos.filter(el => {
                            return el.name !== namePhoto;
                        });
                        let newOrg = {...orgApi};
                        newOrg.photos = delPhoto;
                        setOrgApi(newOrg);
                        console.log(`Фото ${namePhoto} было удалено ...`)
                    }
                    else {
                        console.log("Что-то пошло не так...")
                    }
                })
        }
    };

    const delCompany = (id) => {
        if(token !== ""){
            myRequest("DELETE", `${API_URL}/companies/${id}`, token)
                .then(response => {
                    if(response.status === 200){
                        return console.log(`Организация ${orgApi.name} была удалена ...`);
                    }
                    else {
                        console.log("Что-то пошло не так...")
                    }
                })
        }
    };

    const clickEdit = (id) => {
        setEditInput(id);
    };

    const sendEditData = (num) => {
        let obj = {};
        let update_obj = {};
        let url_postfix = `companies/${orgApi.id}`;

        if(num === 1) {
            obj.shortName = document.getElementById("org_shortName").value;
        }
        if(num === 2) {
            obj.name = document.getElementById("org_name").value;
            let contract = document.getElementById("org_contract").value;
            let contract_arr = contract.split(" ");
            obj.contract = {};
            obj.contract.no = contract_arr[0];
            obj.contract.issue_date = contract_arr[1];
            obj.businessEntity = document.getElementById("org_businessEntity").value;
            let org_type = document.getElementById("org_type").value;
            obj.type = org_type.split(" ");
        }
        if(num === 3) {
            let fio = document.getElementById("contact_fio").value;
            let fio_arr = fio.split(" ");
            obj.lastname = fio_arr[0];
            obj.firstname = fio_arr[1];
            obj.patronymic = fio_arr[2];
            obj.phone = document.getElementById("contact_tel").value;
            obj.email = document.getElementById("contact_mail").value;
        }

        let count = 0;    //  флаг, дабы не отправлять запрос если объект пустой {}
        let sel = {...orgApi};
        if(num === 3) {
            sel = {...contact};
            url_postfix = `contacts/${orgApi.contactId}`;
        }
        for (let param in obj){
            if(sel[param] !== obj[param]){
                update_obj[param] = obj[param];
                count++;
            }
        }

        if (count !== 0){
             myRequest("PATCH", `${API_URL}/${url_postfix}`, token, JSON.stringify(update_obj))
                .then(response => {
                    if(response.status === 200){
                        let obj_update_state = {...sel};
                        for (let param in update_obj){
                            obj_update_state[param] = update_obj[param];
                        }
                        if(num === 3){
                            obj_update_state={...obj_update_state};
                            setContact(obj_update_state);

                        } else {
                            setOrgApi(obj_update_state);
                        }
                    }
                    else {
                        console.log("Что-то пошло не так...")
                    }
                });
        }

        setEditInput(0);
    };

    return(
        <>
            { loader === true &&
                <div className="main">
                    <div className="main_header">
                        <p>Загрузка ...</p>
                    </div>
                </div>}

            { loader === false &&
            <div className="main">
                <div className="main_header">
                    <div className="main_header_inline" onClick={showListOrg} >
                        <IconArrowBack/>
                        <p>К списку организаций</p>
                    </div>
                    <div className="main_header_inline">
                        <IconLinked/>
                        <IconUpdate/>
                        <IconDelete delCompany = { () => delCompany(orgApi.id) }/>
                    </div>
                </div>
                <div className="main_body">
                    <div className="org">

                        <OrganizationInfo
                            editInput={editInput}
                            orgApi={orgApi}
                            clickEdit={clickEdit}
                            sendEditData={sendEditData}
                        />

                        <hr/>

                        <ContactPerson
                            contact={contact}
                            clickEdit={clickEdit}
                            sendEditData={sendEditData}
                            editInput={editInput}
                        />

                        <hr/>

                        <AttachPhoto
                            orgApi={orgApi}
                            delPhoto={delPhoto}
                            addPhotoInput={addPhotoInput}
                            addPhoto={addPhoto}
                        />

                        <hr/>

                    </div>
                </div>
            </div>}
        </>
    )
}



export default Organization;
