import React from 'react';
import IconOrganization from "./icons/IconOrganization";

function SidePanel() {
    return(
        <div className="side_panel">
            <div className="side_panel_top">
                <h1>Честный агент</h1>
                <p>Мененжер процесса</p>
            </div>
            <div className="side_panel_main">
                <IconOrganization/>
                <p>Организации</p>
            </div>
        </div>
    )
}
export default SidePanel;