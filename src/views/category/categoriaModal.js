import React, { useState, useEffect } from 'react';
import './CategoriaModal.css';
import axios from 'axios';
import toastr from 'toastr';

const CategoriaModal = ({ modalOpen, closeModal, categoryId }) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
      if (categoryId != 0){

          getCategory()
      }     
    }, [categoryId])

    const getCategory = () => {
        const url = `http://localhost:8080/v1/category/${categoryId}?userId=${userId}`;
        axios.get(url)
        .then((response) => {
            setCategoryName(response.data.name)
            setCategoryDescription(response.data.description)
        }).catch((error) => {
            console.log(error.response)
        })
    }

    const SaveCategory = () => {

        if(categoryName == ""){
            toastr.warning('Preencha o nome da categoria.')

            return;
        }
      
        if (categoryId == 0) {      
            axios.post('http://localhost:8080/v1/category', {
                name: categoryName,
                description: categoryDescription,
                userId
            })
            .then((response) => {
              handleCloaseModal()
              toastr.success('Categoria cadastrada com sucesso!')
            }).catch((error) => {
                console.log(error.response)
            })
        } else {
            const url = `http://localhost:8080/v1/category/${categoryId}`;
            axios.put(url , {
                name: categoryName,
                description: categoryDescription,
                userId
            })
            .then((response) => {
                handleCloaseModal()
                toastr.success('Categoria atualizada com sucesso!')
            }).catch((error) => {
                console.log(error.response)
            })
        }
    }

    const handleCloaseModal = () => {
        setCategoryDescription('')
        setCategoryName('')
        closeModal()
    }


  return (
    <div className={`modal ${modalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: modalOpen ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" style={{ color: '#333', fontWeight: 'bold' }}>Categoria</h5>
            <button type="button" className="close" onClick={handleCloaseModal}>
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
            <button type="button" className="btn btn-secondary" onClick={handleCloaseModal}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriaModal;