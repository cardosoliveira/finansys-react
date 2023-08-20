import React, { useState } from "react";
import Card from "./components/card";
import FormGroup from "./components/form-group";

const CadastroUsuario = () => {

    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const Cadastrar = () => {
        
    }
    
    return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">

                            <FormGroup label="Nome: *" htmlFor="inputName">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inputName" 
                                    placeholder="Digite seu nome:" 
                                    name="nome"
                                    value={fullname}
                                    onChange={e => setFullname(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="inputEmail" 
                                    placeholder="Digite seu email:" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label="Login: *" htmlFor="inputUsername">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="inputUsername" 
                                    placeholder="Digite seu login:" 
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label="Senha: *" htmlFor="inputPassword">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="inputPassword" 
                                    placeholder="Digite sua senha:" 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup label="Confirme sua senha: *" htmlFor="inputConfirmPassword">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="inputConfirmPassword" 
                                    placeholder="Confirme sua senha:" 
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </FormGroup>

                            <button onClick={() => Cadastrar()} style={{margin: "10px"}} className="btn btn-success">Salvar</button>
                            <button className='btn btn-danger'>Cancelar</button>

                        </div>
                    </div>
                </div>
            </Card>      
    )

}

export default CadastroUsuario
