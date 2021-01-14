import React, { useContext } from 'react';
import Context from "../../hooks/context";

function IconHome({pressed, onChange}) {
    const {selectedIconMenu} = useContext(Context);
    let classesIcon = `icon_box ${pressed.iconClasses}`;
    return(
       <div className={classesIcon} onClick={() => {
           selectedIconMenu(pressed.id);
           onChange(pressed.id)}
       }>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.1771 7.53932L18.6977 8.99703C18.9817 9.2693 19.0755 9.68874 18.9368 10.0656C18.798 10.4425 18.4601 10.686 18.076 10.686H16.7859V18.4431C16.7859 18.7507 16.5489 19 16.2566 19H11.8301H8.69918L8.16983 19H3.7432C3.45084 19 3.21385 18.7506 3.21385 18.443V10.686H1.92401C1.53985 10.686 1.202 10.4425 1.06324 10.0656C0.924514 9.68874 1.01835 9.2693 1.30227 8.99707L9.37829 1.25486C9.73263 0.915058 10.2672 0.915021 10.6217 1.2549L13.5 4.5L13.4581 2.70566C13.4581 2.39808 13.6951 2.14874 13.9874 2.14874H16.6477C16.9401 2.14874 17.1771 2.39811 17.1771 2.70566V7.53932Z" stroke="#F7F7F7" strokeWidth="1.5" strokeLinejoin="round"/>
                <mask id="path-2-inside-1" fill="white">
                    <rect x="7.5" y="9.6925" width="5" height="6.34088" rx="1"/>
                </mask>
                <rect x="7.5" y="9.6925" width="5" height="6.34088" rx="1" stroke="#F7F7F7" strokeWidth="2.6" mask="url(#path-2-inside-1)"/>
            </svg>

        </div>
    )
}
export default IconHome;