import React from "react";

import NavbarItem from "./navbarItem";

function Navbar (){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">

                <a href = "#" className="navbar-brand">FINANSYS</a>
                <button className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarResponsive" 
                    aria-controls="navbarResponsive" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">  
                    <span className="navbar-toggler-icon"></span>                  
                </button>

                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                       
                        <NavbarItem href="/home" label="Home" />
                        {/* <NavbarItem href="/cadastro" label="Usuários" /> */}
                        {/* <NavbarItem href="#/lançamento" label="Lançamentos" /> */}
                        {/* <NavbarItem href="/login" label="Login" /> */}
                        <NavbarItem href="/categoria" label="Categorias" />

                        <NavbarItem href="/" label="Sair" />
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;