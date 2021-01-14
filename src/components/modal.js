import React from 'react';

const Modal = ({open, close, modalHeader, modalText, delCompany}) => {

    const classModal = open ? "modal_overlay modal_open" : "modal_overlay modal_close";

    const handleCLick = () => {
        delCompany();
        close()
    };

    return(
        <div className={classModal}>
            <div className="modal">
                <div>
                    <div className='modal_header'>
                        <h1>{modalHeader}</h1>
                    </div>
                    <div className="modal_body">
                        <p>{modalText}</p>
                    </div>
                </div>
                <div className="modal_footer">
                    <button className="btn_cancel" onClick={close}>Отмена</button>
                    <button onClick={() => handleCLick()}>Удалить</button>
                </div>
            </div>
        </div>
    )
};

export default Modal;