import React from "react";

import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import Categoria from "../views/category/categoria";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";


function Rotas() {
    return (
        <Router>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro" component={CadastroUsuario} />
                <Route path="/categoria" component={Categoria} />
            </Switch>
        </Router>
    );
}

export default Rotas;