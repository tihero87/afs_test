import React from 'react';
import IconEdit from "./icons/IconEdit";

function PublicInfoEdit() {
    return(
        <>
            <form>
                <div className="org_row">
                    <div className="twin_col">
                        <h2>ОБЩАЯ ИНФОРМАЦИЯ</h2>
                        <IconEdit/>
                    </div>
                </div>
                <div className="org_row">
                    <p className="org_label">Полное название: </p>
                    <input/>
                </div>
                <div className="org_row">
                    <p className="org_label">Договор: </p>

                </div>
                <div className="org_row">
                    <p className="org_label">Форма: </p>

                </div>
                <div className="org_row">
                    <p>Тип: </p>

                </div>
            </form>
        </>
    )
}

export default PublicInfoEdit;