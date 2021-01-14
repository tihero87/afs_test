import React from 'react';
import Menu from "./Menu";
import SidePanel from "./SidePanel";

function SideBar() {
    return(
        <div className="sidebar">
            <Menu/>
            <SidePanel/>
        </div>
    )
}
export default SideBar;