import React, { useState, useEffect} from 'react'
import IconEdit from "./icons/IconEdit";
import IconClose from "./icons/IconClose";
import Button from "./Button";
import IconArrowBack from "./icons/IconArrowBack";
import {API_URL} from "../utils/api";
import IconDelete from "./icons/IconDelete";
import IconUpdate from "./icons/IconUpdate";
import IconLinked from "./icons/IconLinked";
import SendRequest from "../hooks/useSendRequest";
import {DefaultContact} from '../utils/defaultContact';
import MyInput from "./MyInput";

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
                        <div className="org_info">
                            <div className="org_row">
                                <div className="twin_col ogr_name">
                                    { editInput === 1 ?
                                        <MyInput id="org_shortName" className="input" label={orgApi.shortName} /> :
                                        <h1>{orgApi.shortName}</h1> }

                                    <IconEdit clickEdit = {() => clickEdit(1)} />
                                </div>
                            </div>
                            <div className="org_row">
                                { editInput === 1 && <Button className="btn" name="Сохранить и отправить" btnClick={() => sendEditData(1)} />}
                            </div>

                            <div>
                                <div className="org_row">
                                    <div className="twin_col org_info_mt">
                                        <h2>ОБЩАЯ ИНФОРМАЦИЯ</h2>
                                        <IconEdit  clickEdit = {() => clickEdit(2)} />
                                    </div>
                                </div>
                                <div className="org_row">
                                    <p className="org_label">Полное название: </p>
                                    { editInput === 2 ?
                                        <MyInput id="org_name" className="input" label={orgApi.name}  /> :
                                        <p>{orgApi.name}</p>
                                    }
                                </div>
                                <div className="org_row">
                                    <p className="org_label">Договор: </p>
                                    { editInput === 2 ?
                                        <MyInput id="org_contract" className="input" label={orgApi.contract.no + " " + orgApi.contract.issue_date.split("T")[0] } /> :
                                        <p>{orgApi.contract.no} от {orgApi.contract.issue_date.split("T")[0]}</p>
                                    }
                                </div>
                                <div className="org_row">
                                    <p className="org_label">Форма: </p>
                                    { editInput === 2 ?
                                        <MyInput id="org_businessEntity" className="input" label={orgApi.businessEntity } /> :
                                        <p>{orgApi.businessEntity}</p>
                                    }
                                </div>
                                <div className="org_row">
                                    <p className="org_label">Тип: </p>
                                    { editInput === 2 ?
                                        <MyInput id="org_type" className="input" label={ orgApi.type.map(el => el + " ")} /> :
                                        <p>{orgApi.type.map(el => el + " ")}</p>
                                    }
                                </div>
                                <div className="org_row">
                                    <p></p>

                                    { editInput === 2 && <Button className="btn" name="Сохранить и отправить" btnClick={() => sendEditData(2)} />}
                                </div>
                            </div>
                        </div>

                        <hr/>

                        <div className="org_contacts">
                            <div className="org_row">
                                <div className="twin_col">
                                    <h2>контактные данные</h2>
                                    <IconEdit clickEdit = { () => clickEdit(3)}/>
                                </div>
                            </div>
                            <div className="org_row">
                                <p className="org_label">ФИО:</p>
                                {   editInput === 3 ?
                                    <MyInput id="contact_fio" className="input" label={contact.lastname + " " + contact.firstname + " " + contact.patronymic} /> :
                                    <p>{contact.lastname} {contact.firstname} {contact.patronymic}</p>
                                }
                            </div>
                            <div className="org_row">
                                <p className="org_label">Телефон:</p>
                                { editInput === 3 ?
                                    <MyInput id="contact_tel" className="input" label={contact.phone} /> :
                                    <p>{contact.phone}</p>
                                }
                            </div>
                            <div className="org_row">
                                <p className="org_label">Эл. почта:</p>
                                { editInput === 3 ?
                                    <MyInput id="contact_mail" className="input" label={contact.email} /> :
                                    <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                                }
                            </div>
                            <div className="org_row">
                                <p></p>

                                { editInput === 3 && <Button className="btn" name="Сохранить и отправить" btnClick={() => sendEditData(3)} />}
                            </div>
                        </div>

                        <hr/>

                        <div className="org_contacts">
                            <h2>приложенные фото</h2>

                            <div className="org_row">
                                <div className="twin_col">
                                    <div className="img_gallery">
                                        {
                                            orgApi.photos.map((photo) => {
                                                return (
                                                    <div key={photo.name} className="img_container">
                                                        <img src = {photo.thumbpath} alt={`${photo.name}`} />
                                                        <p className="img_name">{photo.name}</p>
                                                        <p className="img_date">{}</p>
                                                        <IconClose handleClick={() => delPhoto(photo.name)}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    { addPhotoInput && <input id="photoinput" className="inp" type='file'/> }
                                </div>


                                <Button className="btn" name="Добавить изображение" btnClick={addPhoto} icon />

                            </div>

                        </div>

                        <hr/>

                    </div>
                </div>
            </div>}
        </>
    )
}



export default Organization;
