import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Card from '../components/card'
import ListarCategoria from './categoryTable';
import CategoriaModal from './categoriaModal';
import axios from 'axios';


const Categoria = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const userId = localStorage.getItem('userId');
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState(0);

    useEffect(() => {
        ListCategoryFromApi()
    }, [])

   const ListCategoryFromApi = () => {

       const url = `http://localhost:8080/v1/category?userId=${1}`;
       axios.get(url)
       .then((response) => {
            setCategory(response.data)
       }).catch((error) => {
           console.log(error.response)
       })
   }

const openModal = () => {
    setModalOpen(true);
}

const closeModal = () => {
    setCategory(0)
    setModalOpen(false);
}

const excluirCategoria = ( id ) => {
    console.log(id)
}

const editarCategoria = ( id ) => {
    setCategoryId(id);
    setModalOpen(true);
    ListCategoryFromApi();
}

const categorias = [
    {
        id: 1,
        nome: 'Alimentação',
        descricao: 'Alimentação'
    }
];

    return (
        <>
            <div className="row justify-content-end" style={{ marginBottom: "15px" }}>

                <CategoriaModal modalOpen={modalOpen} closeModal={closeModal} categoryId={categoryId} />

                <div className="col-auto">
                    <button type='button' className='btn btn-primary' onClick={openModal}>Nova Categoria</button>
                </div>
            </div>

            <Card title="Categorias">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='bs-component'>

                            <ListarCategoria categorias={categorias} editarCategoria={editarCategoria} excluirCategoria={excluirCategoria} />

                        </div>
                    </div>
                </div>
            </Card>
        </>
    )   
}

export default Categoria