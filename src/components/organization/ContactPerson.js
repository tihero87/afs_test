import React from 'react';
import Button from "../Button";
import IconEdit from "../icons/IconEdit";
import MyInput from "../MyInput";

function ContactPerson({contact, clickEdit, sendEditData, editInput}) {
    return(
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
    )
}
export default ContactPerson;