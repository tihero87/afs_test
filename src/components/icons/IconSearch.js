import React, {useContext} from 'react';
import Context from "../../hooks/context";
function IconSearch({pressed, onChange}) {
    const {selectedIconMenu} = useContext(Context);
    let classesIcon = `icon_box ${pressed.iconClasses}`;
    return(
        <div className={classesIcon} onClick={() => {
            selectedIconMenu(pressed.id);
            onChange(pressed.id)}}
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8.60803" cy="8.60809" r="6.5" stroke="#F7F7F7" strokeWidth="2"/>
                <path d="M4.6084 8.60809C4.6084 6.39895 6.39926 4.60809 8.6084 4.60809" stroke="#F7F7F7" strokeLinecap="round"/>
                <path d="M12.2474 14.4603L14.3688 12.339L17.9231 15.878C18.511 16.4634 18.5121 17.4149 17.9254 18.0016C17.3405 18.5865 16.3925 18.5875 15.8063 18.0039L12.2474 14.4603Z" fill="#F7F7F7"/>
            </svg>

        </div>
    )
}
export default IconSearch;