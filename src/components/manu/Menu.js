import React, {useState} from "react";
import * as Ai from "react-icons/ai";
import { Link } from "react-router-dom";
import {DatosMenu} from "./DatosMenu";
import {IconContext} from 'react-icons';
import "./menu.css"
function Menu() {
    const[sidebar,setsidebar]=useState(false);

    const mostrarmenu= () => setsidebar(!sidebar);
  
  return (
    <>
    
    <IconContext.Provider value={{color:'#fff'}}>
    
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <Ai.AiOutlineBars onClick={mostrarmenu}/>
        </Link>
       
      </div>
     
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        | <ul className="nav-menu-items" onClick={mostrarmenu}>
            <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <Ai.AiOutlineClose/>
                </Link>
                <div></div>
            </li>
            {DatosMenu.map((item , index) => {
                return(
                    <li key={index} className={item.CName}> 
                        <Link to = {item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
      </nav>
      </IconContext.Provider>
    </>
  );
}

export default Menu;
