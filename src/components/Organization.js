import React, { useState, useEffect } from 'react'
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

    let data = SendRequest("GET", `${API_URL}/companies/${org.id}`, token);

    useEffect(() => {
        if(data !==null && data !== undefined && loader === true){
            setOrgApi(data);
            setLoader(false);
            addOrgFromAPI(data);
        }
        if(data === undefined){
            alert("Информация не найдена");
            showListOrg(0);
        }
    },[data]);

    let contactApi = SendRequest("GET", `${API_URL}/contacts/${orgApi.contactId}`, token);

    useEffect(() => {
        if(contactApi !== null && contactApi !== undefined){
            setContact(contactApi);
        }
    });

    async function myRequest(method, url, token) {
        return await fetch(url,{
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        })
    }

    const addPhoto = () => {
        console.log("хочу добавить фото");
    };
    const delPhoto = (namePhoto) => {

        if(token !== ""){
            myRequest("DELETE", `${API_URL}/companies/${orgApi.id}/image/${namePhoto}`, token)
                .then(response => {
                    if(response.status === 200){
                        let delPhoto = orgApi.photos.filter(el => {
                            return el.name !== namePhoto;
                        });
                        let newOrg = orgApi;
                        newOrg.photos = delPhoto;
                        console.log("Новый объект без фото ", newOrg);
                        setOrgApi(newOrg);

                       return console.log(`Фото ${namePhoto} было удалено ...`)
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
    const sendEditData = () => {
      setEditInput(0);
    };

    return(
        <>
            { loader === true && <p>Загрузка ...</p> }
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
                                        <MyInput id={orgApi.shortName} className="input" label={orgApi.shortName} /> :
                                        <h1>{orgApi.shortName}</h1> }

                                    <IconEdit clickEdit = {() => clickEdit(1)} />
                                </div>
                            </div>
                            <div className="org_row">
                                { editInput === 1 && <Button className="btn" name="Сохранить и отправить" btnClick={sendEditData} />}
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
                                        <MyInput id={orgApi.name} className="input" label={orgApi.name}  /> :
                                        <p>{orgApi.name}</p>
                                    }
                                </div>
                                <div className="org_row">
                                    <p className="org_label">Договор: </p>
                                    { editInput === 2 ?
                                        <MyInput id={orgApi.id + orgApi.contract.no} className="input" label={orgApi.contract.no + " " + orgApi.contract.issue_date } /> :
                                        <p>{orgApi.contract.no} от {orgApi.contract.issue_date}</p>
                                    }
                                </div>
                                <div className="org_row">
                                    <p className="org_label">Форма: </p>
                                    { editInput === 2 ?
                                        <MyInput id={orgApi.businessEntity} className="input" label={orgApi.businessEntity } /> :
                                        <p>{orgApi.businessEntity}</p>
                                    }
                                </div>
                                <div className="org_row">
                                    <p className="org_label">Тип: </p>
                                    { editInput === 2 ?
                                        <MyInput id={99} className="input" label={ orgApi.type.map(el => el + " ")} /> :
                                        <p>{orgApi.type.map(el => el + " ")}</p>
                                    }
                                </div>
                                <div className="org_row">
                                    <p></p>

                                    { editInput === 2 && <Button className="btn" name="Сохранить и отправить" btnClick={sendEditData} />}
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
                                    <MyInput id={contact.lastname} className="input" label={ contact.lastname +" "+ contact.firstname +" "+ contact.patronymic} /> :
                                    <p>{contact.lastname} {contact.firstname} {contact.patronymic}</p>
                                }
                            </div>
                            <div className="org_row">
                                <p className="org_label">Телефон:</p>
                                { editInput === 3 ?
                                    <MyInput id={contact.phone} className="input" label={contact.phone} /> :
                                    <p>{contact.phone}</p>
                                }
                            </div>
                            <div className="org_row">
                                <p className="org_label">Эл. почта:</p>
                                { editInput === 3 ?
                                    <MyInput id={contact.email} className="input" label={contact.email} /> :
                                    <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                                }
                            </div>
                            <div className="org_row">
                                <p></p>

                                { editInput === 3 && <Button className="btn" name="Сохранить и отправить" btnClick={sendEditData} />}
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
                                                    <div className="img_container">
                                                        <img src = {photo.thumbpath} alt={`${photo.name}`} />
                                                        <p className="img_name">{photo.name}</p>
                                                        <p className="img_date">{}</p>
                                                        <IconClose handleClick={() => delPhoto(photo.name)}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
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

/*    useEffect(() => {
        async function sendRequest(method, url, token) {
            return await fetch(url,{
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                }
            })
        }
        if(token !== ""){
            sendRequest("GET", `${API_URL}/companies/${org.id}`, token)
                .then(response => {
                    if(response.status < 400){
                        return response.json();
                    }
                    if(response.status === 404){
                        console.log(`Организация с id: ${org.id} не найдена`);
                    }
                    else {
                        console.log("Что-то пошло не так...")
                    }
                })
                .then(data => {
                    console.log('Ответ с API: ',data);
                    if(data){
                        addOrgFromAPI(data);
                        setLoader(false);
                    }
                })
        }
    },[]);*/