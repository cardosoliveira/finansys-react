import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Card from "../components/card";
import ListEntry from "./entryTable";
import LancamentoModal from "./lancamentoModal";
import toastr from "toastr";

const Entry = () => {
    const [entry, setEntry] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [entryId, setEntryId] = useState(0);
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

    const closeModal = () => {
        setEntryId(0)
        setModalOpen(false);
        GetAllEntry();
    }

    const editarLancamento = (id) => {
        setEntryId(id);
        setModalOpen(true);
    }

    const excluirLancamento = (id) => {
        const url = `http://localhost:8080/v1/entry/${id}?userId=${userId}`;
        axios.delete(url)
        .then((response) => {
            if (entry.length === 1) {
                setEntry([])
            }
            GetAllEntry()
            toastr.success('Lançamento excluído com sucesso!')
        }).catch((error) => {
            console.log(error.response)
        })  
    }

    return (
        <>
             <Navbar />

             <selectMenu />

             <LancamentoModal modalOpen={modalOpen} closeModal={closeModal} entryId={entryId} />

             <div style={{display: 'flex'}}>

                <div>Quantidade de lançamentos: {entry.length}</div>

                <div style={{ marginLeft: "auto", marginBottom: "10px" }} className="col-auto">
                    <button type='button' className='btn btn-primary' onClick={openModal}>Novo Lançamento</button>
                </div>

             </div>

             <Card title="Lançamentos">
                <div className="row">
                    <div className="col-md-12">

                        <div className="bs-component">

                            <ListEntry entry={entry} editarLancamento={editarLancamento} excluirLancamento={excluirLancamento} />

                        </div>

                    </div>
                </div>

             </Card>
        </>
    )

}

export default Entry;