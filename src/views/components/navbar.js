import React, { useState, useEffect } from "react";

import NavbarItem from "./navbarItem";

function Navbar (){

    const userId = localStorage.getItem('userId');
    const [haveUser, setHaveUser] = useState(false);

    useEffect(() => {
        if (userId !== null) {
            setHaveUser(true);
        }
        else {
            setHaveUser(false);
        }
    }, [userId])

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
                       
                        <NavbarItem render={haveUser} href="/home" label="Home" />
                        <NavbarItem render={haveUser} href="/relatorios" label="Relatorios" />
                        {/* <NavbarItem href="/cadastro" label="Usuários" /> */}          
                        {/* <NavbarItem href="/login" label="Login" /> */}
                        <NavbarItem render={haveUser} href="/lancamento" label="Lançamentos" />
                        <NavbarItem render={haveUser} href="/categoria" label="Categorias" />

                        <NavbarItem render={haveUser} href="/" label="Sair" />
                        
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;