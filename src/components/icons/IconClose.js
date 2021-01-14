import React from 'react';

function IconClose({handleClick}) {

    return(
        <div className="icon_close" onClick={ handleClick }>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="#D95151"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M5.19995 6.07226L9.1277 10L5.19995 13.9278L6.0722 14.8L9.99995 10.8723L13.9277 14.8L14.8 13.9278L10.8722 10L14.8 6.07226L13.9277 5.20001L9.99995 9.12776L6.0722 5.20001L5.19995 6.07226Z" fill="#F7F7F7"/>
            </svg>
        </div>
    )
}
export default IconClose;