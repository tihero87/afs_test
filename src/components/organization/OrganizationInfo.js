import React from 'react';
import MyInput from "../MyInput";
import IconEdit from "../icons/IconEdit";
import Button from "../Button";

function OrganizationInfo({editInput, orgApi, clickEdit, sendEditData}) {
    return(
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
    )
}
export default OrganizationInfo;