import React, {useState} from 'react';
import MyInput from "../MyInput";
import IconEdit from "../icons/IconEdit";
import Button from "../Button";
import {useValidInput} from "../../hooks/useValidInput";

function OrganizationInfo({editInput, orgApi, clickEdit, sendEditData}) {

    const [shortName, setShortName] = useState('');
    let validShortName = useValidInput(shortName, {isEmpty: true, minLength: 2});
    const changeInputShortName = (e) => {
        setShortName(e.target.value);
    };

    const [org_name, setOrg_name] = useState('');
    let validOrgName = useValidInput(org_name, {isEmpty: true, minLength: 2});
    const changeInputOrg_name = (e) => {
        setOrg_name(e.target.value);
    };

    const [org_contract, setOrg_contract] = useState('');
    let validOrg_contract = useValidInput(org_contract, {isEmpty: true, minLength: 2});
    const changeInputOrg_contract = (e) => {
        setOrg_contract(e.target.value);
    };

    const [entity, setEntity] = useState('');
    let validEntity = useValidInput(entity, {isEmpty: true, minLength: 2});
    const changeInputEntity = (e) => {
        setEntity(e.target.value);
    };

    const [orgtype, setOrgtype] = useState('');
    let validOrgtype = useValidInput(orgtype, {isEmpty: true, minLength: 1});
    const changeInputOrgtype = (e) => {
        setOrgtype(e.target.value);
    };


    return(
        <div className="org_info">
            <div className="org_row">
                <div className="twin_col ogr_name">
                    { editInput === 1 ?
                        <MyInput
                            value={shortName}
                            valid={validShortName}
                            changeInput={changeInputShortName}
                            id="org_shortName"
                            className="input"
                            label={orgApi.shortName}
                        /> :
                        <h1>{orgApi.shortName}</h1> }

                    <IconEdit clickEdit = {() => clickEdit(1)} />
                </div>
            </div>
            <div className="org_row">
                { editInput === 1 && <Button disabled={!validShortName.validForm}
                                             className="btn"
                                             name="Сохранить и отправить"
                                             btnClick={() => sendEditData(1)}
                                    />}
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
                        <MyInput
                            value={org_name}
                            valid={validOrgName}
                            changeInput={changeInputOrg_name}
                            id="org_name"
                            className="input"
                            label={orgApi.name}
                        /> :
                        <p>{orgApi.name}</p>
                    }
                </div>
                <div className="org_row">
                    <p className="org_label">Договор: </p>
                    { editInput === 2 ?
                        <MyInput
                            value={org_contract}
                            valid={validOrg_contract}
                            changeInput={changeInputOrg_contract}
                            id="org_contract"
                            className="input"
                            label={orgApi.contract.no + " " + orgApi.contract.issue_date.split("T")[0] }
                        /> :
                        <p>{orgApi.contract.no} от {orgApi.contract.issue_date.split("T")[0]}</p>
                    }
                </div>
                <div className="org_row">
                    <p className="org_label">Форма: </p>
                    { editInput === 2 ?
                        <MyInput
                            value={entity}
                            valid={validEntity}
                            changeInput={changeInputEntity}
                            id="org_businessEntity"
                            className="input"
                            label={orgApi.businessEntity }
                        /> :
                        <p>{orgApi.businessEntity}</p>
                    }
                </div>
                <div className="org_row">
                    <p className="org_label">Тип: </p>
                    { editInput === 2 ?
                        <MyInput
                            value={orgtype}
                            valid={validOrgtype}
                            changeInput={changeInputOrgtype}
                            id="org_type"
                            className="input"
                            label={ orgApi.type.map(el => el + " ")}
                        /> :
                        <p>{orgApi.type.map(el => el + " ")}</p>
                    }
                </div>
                <div className="org_row">
                    <p></p>

                    { editInput === 2 && <Button className="btn"
                                                 disabled={!validOrgName.validForm || !validOrg_contract.validForm || !validOrgtype.validForm || !validEntity.validForm}
                                                 name="Сохранить и отправить"
                                                 btnClick={() => sendEditData(2)}
                                        />
                    }
                </div>
            </div>
        </div>
    )
}
export default OrganizationInfo;