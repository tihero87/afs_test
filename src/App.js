import React, { useState } from 'react'
import './App.scss';
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Context from "./hooks/context";

function App() {

    const [showId, setShowId] = useState(0);
    function selectedIconMenu(id) {
        setShowId(id);
    }

    return (
      <Context.Provider value = {{selectedIconMenu}}>
        <div className="wrap">
           <div className='base'>

             <SideBar/>
             <Main show = {showId}/>

           </div>
        </div>
      </Context.Provider>
    );
}

export default App;
