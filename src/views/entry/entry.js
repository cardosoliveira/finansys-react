import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Card from "../components/card";
import ListCategory from "./entryTable";

const Entry = () => {
    const [entry, setEntry] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        GetAllEntry();
    }, []);

    const openModal = () => {
        setModalOpen(true);
    }

    const GetAllEntry = () => {
        const url = `http://localhost:8080/v1/entry?userId=${userId}`;
        axios.get(url)
        .then((response) => {
            console.log(response)
            setEntry(response.data)
        }).catch((error) => {
            console.log(error.response)
        })
    }



    return (
        <>
             <Navbar />

             <div style={{display: 'flex'}}>

                <div>Quantidade de entradas: {entry.length}</div>

                <div style={{ marginLeft: "auto", marginBottom: "10px" }} className="col-auto">
                    <button type='button' className='btn btn-primary' onClick={openModal}>Novo Lançamento</button>
                </div>

             </div>

             <Card title="Entradas">
                <div className="row">
                    <div className="col-md-12">

                        <div className="bs-component">

                            <ListCategory entry={entry} />

                        </div>

                    </div>
                </div>

             </Card>
        </>
    )

}

export default Entry;