import React, { useState, useEffect } from "react";
import Card from "./components/card";
import FormGroup from "./components/form-group";
import { useHistory } from "react-router-dom";
import axios from "axios";
import toastr from "toastr";
import Navbar from "./components/navbar";

const UserEdit = () => {
    const userId = localStorage.getItem('userId');
    const history = useHistory();
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleCancelar = () => {
        history.push('/')
    }

     useEffect(() => {
        const fetchUserData = async () => {
            try {             
                if (userId) {
                    const response = await axios.get(`http://localhost:8080/v1/user/${userId}`);
                    const userData = response.data;

                    setFullname(userData.fullName);
                    setUsername(userData.userName);
                    setEmail(userData.email);
                    setConfirmPassword(userData.password);
                    setPassword(userData.password);

                } else {
                    toastr.error("Código do usuário não encontrado no LocalStorage");
                }
            } catch (error) {
                toastr.error("Erro ao buscar informações do usuário");
            }
        };

        fetchUserData();
    }, []);

    const handleSalvarUsuario = async () => {
        try {

            if (username === '') {
                toastr.warning('Preencha o login!')

                return;
            }

            if (fullname === '') {
                toastr.warning('Preencha o nome!')

                return;
            }

            if (email === '') {
                toastr.warning('Preencha o e-mail!')

                return;
            }

            if (password === '') {
                toastr.warning('Preencha a senha!')

                return;
            }

            if (confirmPassword === '') {
                toastr.warning('Preencha a confirmação da senha!')

                return;
            }

            if (confirmPassword !== password) {
                toastr.warning('As senhas não são iguais!')

                return;
            }

            if (userId) {
                const userData = {
                    fullname,
                    username,
                    email,
                    password,
                };

                const response = await axios.put(`http://localhost:8080/v1/user/${userId}`, userData);

                toastr.success("Dados do usuário atualizados com sucesso");

                history.push('/');
            } else {
                toastr.error("Código do usuário não encontrado no LocalStorage");
            }
        } catch (error) {
            toastr.error("Erro ao atualizar os dados do usuário");
        }
    };

    return (
        <>
        <Navbar />
            <Card title="Informações do Usuário">
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

                            <button onClick={handleSalvarUsuario} style={{margin: "10px"}} className="btn btn-success">Salvar Usuário</button>
                            <button onClick={handleCancelar} className='btn btn-danger'>Cancelar</button>

                        </div>
                    </div>
                </div>
            </Card>   
        </>   
    )

}

export default UserEdit
