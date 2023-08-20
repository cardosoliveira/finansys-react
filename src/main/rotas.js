import React from "react";

import { Route, HashRouter, Switch} from "react-router-dom";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro" component={CadastroUsuario}/>
            </Switch>
        </HashRouter>
    );
}

export default Rotas;