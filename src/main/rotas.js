import React from "react";

import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import Categoria from "../views/category/categoria";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Entry from "../views/entry/entry";
import Home from "../views/home";


function Rotas() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />              
                <Route path="/cadastro" component={CadastroUsuario} />
                <Route path="/categoria" component={Categoria} />
                <Route path="/entry" component={Entry} />
            </Switch>
        </Router>
    );
}

export default Rotas;