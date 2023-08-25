import React , { useState } from "react";

const Home = () => {
    const [saldo, setSaldo] = useState(0);
    return (
        <div className="jumbotron">
            <h1 className="display-3">Bem vindo!</h1>
            <p className="lead">Esse é seu sistema de finanças.</p>
            {/* <p className="lead">Seu saldo para o mês atual é de R$ {saldo}</p> */}
            <hr className="my-4"/>
            {/* <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar no sistema</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </p> */}
        </div>
    );
}

export default Home;