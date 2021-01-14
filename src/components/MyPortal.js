import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import Modal from "./modal";
let node = null;

const MyPortal = (props) =>  {

    useEffect(() => {
        node && ReactDom.render(<Modal {...props} />, node)
    });

    useEffect(() => {
        node = document.createElement('div');
        document.body.appendChild(node);
        ReactDom.render(<Modal {...props} />, node)
    },[]);

    return(
            <script />
    )
};
export default MyPortal;