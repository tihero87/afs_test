import React, { useState } from 'react';
import IconHome from "./icons/IconHome";
import IconMarket from "./icons/IconMarket";
import IconSearch from "./icons/IconSearch";
import IconSettings from "./icons/IconSettings";
import IconChat from "./icons/IconChat";
import IconExit from "./icons/IconExit";


function Menu() {
    let icons = [
        {id: 0, name: "Home", iconClasses: "selected"},
        {id: 1, name: "Market", iconClasses: ""},
        {id: 2, name: "Search", iconClasses: ""},
    ];

    const [pressedIcon, setPressedIcon] = useState(icons);

    function togglePressedIcon(id){

        setPressedIcon(
            pressedIcon.map(icon => {
                if(icon.id === id) {
                    icon.iconClasses = "selected";
                }else{
                    icon.iconClasses = "";
                }
                return icon;
            })
        )
    }

    return(
        <menu className="menu">
            <div>
                <IconHome  onChange={togglePressedIcon} pressed={pressedIcon[0]} />
                <IconMarket onChange={togglePressedIcon} pressed={pressedIcon[1]}  />
                <IconSearch  onChange={togglePressedIcon} pressed={pressedIcon[2]} />
            </div>
            <div>
                <IconSettings/>
                <IconChat/>
                <IconExit/>
            </div>
        </menu>
    )
}
export default Menu;