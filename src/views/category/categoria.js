import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Card from '../components/card'
import Navbar from '../components/navbar';
import ListarCategoria from './categoryTable';
import CategoriaModal from './categoriaModal';
import axios from 'axios';
import toastr from 'toastr';


const Categoria = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const userId = localStorage.getItem('userId');
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState(0);

    useEffect(() => {
        ListCategoryFromApi()
    }, [])

   const ListCategoryFromApi = () => {
       const url = `http://localhost:8080/v1/category?userId=${userId}`;
       axios.get(url)
       .then((response) => {
            setCategory(response.data)
       }).catch((error) => {
           console.log(error.response)
       })
   }

const excluirCategoria = (id) => {
    const url = `http://localhost:8080/v1/category/${id}?userId=${userId}`;
    axios.delete(url)
    .then((response) => {
        if (category.length === 1) {
            setCategory([])
        }
        ListCategoryFromApi()
        toastr.success('Categoria excluída com sucesso!')
    }).catch((error) => {
        console.log(error.response)
    })  
}

const openModal = () => {
    setModalOpen(true);
}

const closeModal = () => {
    setCategoryId(0)
    setModalOpen(false);
    ListCategoryFromApi();
}


const editarCategoria = ( id ) => {
    setCategoryId(id);
    setModalOpen(true);
}


    return (
        <>
            <Navbar />

            <div style={{ display: "flex" }}>
                  
                <div>Quantidade de categorias: {category.length}</div>

                <div style={{ marginLeft: "auto", marginBottom: "10px" }} className="col-auto">
                    <button type='button' className='btn btn-primary' onClick={openModal}>Nova Categoria</button>
                </div>
            </div>

            <CategoriaModal modalOpen={modalOpen} closeModal={closeModal} categoryId={categoryId} />

            <Card title="Categorias">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='bs-component'>

                            <ListarCategoria categorias={category} editarCategoria={editarCategoria} excluirCategoria={excluirCategoria} />

                        </div>
                    </div>
                </div>
            </Card>
        </>
    )   
}

export default Categoria