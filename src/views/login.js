import React, { useState } from 'react';

import Card from './components/card'
import FormGroup from './components/form-group'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const Entrar = () => {
  
    }

        return (
            <div clasName="container"> 

                <div className="row">
                    <div className='col-md-6' style={{position : "relative", left: "300px"}}>
                        <div className='bs-docs-section'>
                            <Card title="Login">
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <div className='bs-component'>
                                            <fieldset>

                                                <FormGroup label="Email: *" htmlFor="exampleEmail">
                                                    <input 
                                                        type="email" 
                                                        className="form-control" 
                                                        id="exampleEmail" 
                                                        placeholder="Digite seu email:" 
                                                        value={email} 
                                                        onChange={e => setEmail(e.target.value)}
                                                    />
                                                </FormGroup>

                                                <FormGroup label="Senha: *" htmlFor="examplePassword">
                                                    <input 
                                                        type="password" 
                                                        className="form-control" 
                                                        id="examplePassword" 
                                                        placeholder="Digite sua senha:" 
                                                        value={password} 
                                                        onChange={e => setPassword(e.target.value)}
                                                    />
                                                </FormGroup>   

                                                <button onClick={() => Entrar()} className="btn btn-success">Entrar</button>
                                                <button className='btn btn-danger'>Cadastrar</button>

                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
export default Login