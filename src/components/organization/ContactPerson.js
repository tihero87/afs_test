import React, {useState} from 'react';
import Button from "../Button";
import IconEdit from "../icons/IconEdit";
import MyInput from "../MyInput";
import {useValidInput} from "../../hooks/useValidInput";

function ContactPerson({contact, clickEdit, sendEditData, editInput}) {

    const [fio, setFio] = useState('');
    const validFio = useValidInput(fio, {isEmpty: true, minLength: 3});
    const changeFio = (e) => {
        setFio(e.target.value);
    };

    const [phone, setPhone] = useState('');
    const validPhone = useValidInput(phone, {isEmpty: true, phonenumber: false});
    const changePhone = (e) => {
      setPhone(e.target.value);
    };

    const [email, setEmail] = useState('');
    const validEmail = useValidInput(email, {isEmpty: true, email: false});
    const changeEmail = (e) => {
      setEmail(e.target.value);
    };

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
                    <MyInput id="contact_fio"
                             value={fio}
                             valid={validFio}
                             changeInput={changeFio}
                             className="input"
                             label={contact.lastname + " " + contact.firstname + " " + contact.patronymic}
                    /> :
                    <p>{contact.lastname} {contact.firstname} {contact.patronymic}</p>
                }
            </div>
            <div className="org_row">
                <p className="org_label">Телефон:</p>
                { editInput === 3 ?
                    <MyInput id="contact_tel"
                             value={phone}
                             valid={validPhone}
                             changeInput={changePhone}
                             className="input"
                             label={contact.phone}
                    /> :
                    <p>{contact.phone}</p>
                }
            </div>
            <div className="org_row">
                <p className="org_label">Эл. почта:</p>
                { editInput === 3 ?
                    <MyInput id="contact_mail"
                             value={email}
                             valid={validEmail}
                             changeInput={changeEmail}
                             className="input"
                             label={contact.email}
                    /> :
                    <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                }
            </div>
            <div className="org_row">
                <p></p>

                { editInput === 3 && <Button className="btn"
                                             disabled={!validFio.validForm || !validEmail.validForm || !validPhone.validForm}
                                             name="Сохранить и отправить"
                                             btnClick={() => sendEditData(3)}
                                        />
                }
            </div>
        </div>
    )
}
export default ContactPerson;