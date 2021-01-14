import React from 'react'
import GIF from '../img/loader.gif';
function Loader() {
    return(
        <div>
            <img src={GIF} alt="Loading..."/>
        </div>
    )
}
export default Loader;