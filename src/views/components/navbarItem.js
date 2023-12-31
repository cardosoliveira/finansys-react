import React from "react";

function NavbarItem ( { render, ...props } ) {

    if (render){
        return (
            <li className="nav-item">
                <a href={props.href} className="nav-link">{props.label}</a>
            </li>
        )
    }else{
        return false;
    }  
}

export default NavbarItem