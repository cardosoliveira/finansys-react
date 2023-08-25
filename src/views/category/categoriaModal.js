import React, { useState, useEffect } from 'react';
import './CategoriaModal.css';

import axios from 'axios';

const CategoriaModal = ({ modalOpen, closeModal, categoryId }) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const userId = localStorage.getItem('userId');

    useEffect(() => {

        if (categoryId != null) {
            axios.get(`http://localhost:3000/categorias/${categoryId}/${userId}`)
            .then((response) => {
                setCategoryName(response.data.nome)
                setCategoryDescription(response.data.descricao)
            }).catch((error) => {
                console.log(error.response)
            })
        }
    })

    const SaveCategory = () => {
        if (categoryId == 0) {
            axios.post('http://localhost:8080/v1/category', {
                nome: categoryName,
                descricao: categoryDescription
            })
            .then((response) => {
                console.log(response)
                closeModal()
            }).catch((error) => {
                console.log(error.response)
            })
        } else {
            axios.put(`http://localhost:3000/categorias/${categoryId}/${userId}`, {
                nome: categoryName,
                descricao: categoryDescription
            })
            .then((response) => {
                console.log(response)
                closeModal()
            }).catch((error) => {
                console.log(error.response)
            })
        }
    }


  return (
    <div className={`modal ${modalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: modalOpen ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" style={{ color: '#333', fontWeight: 'bold' }}>Categoria</h5>
            <button type="button" className="close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>

              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">Nome:</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="recipient-name" 
                    onChange={(e) => setCategoryName(e.target.value)} 
                    value={categoryName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message-text" className="col-form-label">Descrição:</label>
                <textarea 
                    className="form-control" 
                    id="message-text" 
                    onChange={(e) => setCategoryDescription(e.target.value)}
                    value={categoryDescription}
                >
                </textarea>
              </div>

            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={SaveCategory}>Salvar</button>
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriaModal;