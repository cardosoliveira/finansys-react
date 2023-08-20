import React, { useState } from 'react';

import Card from './components/card'
import FormGroup from './components/form-group'
import { useHistory} from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleCadastrar = () => {
        history.push('/cadastro')
    }

    const Logar = () => {
        axios.post('http://localhost:3000/login', {
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error.response)
        })
    }

        return (
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
                                                        style={{marginTop:"5px"}}
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
                                                        style={{marginTop:"5px"}}
                                                        type="password" 
                                                        className="form-control" 
                                                        id="examplePassword" 
                                                        placeholder="Digite sua senha:" 
                                                        value={password} 
                                                        onChange={e => setPassword(e.target.value)}
                                                    />
                                                </FormGroup>   

                                                <div style={{float: "right", marginTop: "20px"}}>
                                                    <button onClick={Logar} className="btn btn-success">Entrar</button>
                                                    <button onClick={handleCadastrar} style={{marginLeft: "10px"}} className='btn btn-danger'>Cadastrar</button>
                                                </div>
                                                

                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
        )
    }
export default Login