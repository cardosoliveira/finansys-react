import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import './LancamentoModal.css';

const LancamentoModal = ({ modalOpen, closeModal, entryId }) => {
    const userId = localStorage.getItem('userId');
    const [type, setType] = useState('expense');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [category, setCategory] = useState([]);
    const [isPaid, setIsPaid] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(0);

 
    useEffect(() => {
        if (entryId != 0) {
            getEntry()
        }
    }, [entryId])

    useEffect(() => {
        getAllCategorys()
    }, [])
   

    const getEntry = () => {
        const url = `http://localhost:8080/v1/entry/${entryId}?userId=${userId}`;
        axios.get(url)
        .then((response) => {
            setType(response.data.type)
            setName(response.data.name)
            setDescription(response.data.description)
            setAmount(response.data.amount)
            const dateParts = response.data.date.split('/');
            const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
            setDate(formattedDate);
            setIsPaid(response.data.paid)
            setCategoryId(response.data.category.id)
            setSelectedCategory(response.data.category.id)
        }).catch((error) => {
            console.log(error.response)
        })
    }

    const getAllCategorys = () => {
        const url = `http://localhost:8080/v1/category?userId=${userId}`;
        axios.get(url)
        .then((response) => {
            setCategory(response.data)
               
        }).catch((error) => {
            console.log(error.response)
        })
    }

  const saveEntry = () => {
    let formattedDate = "";
    let formattedAmount = "";
    const postUrl = `http://localhost:8080/v1/entry`;
    const putUrl = `http://localhost:8080/v1/entry/${entryId}`;

    if (name === '') {
        toastr.warning('Preencha o nome do lançamento.')
        return;
    }

    if(entryId === 0){

        if(selectedCategory === 0){
            toastr.warning('Selecione uma categoria.')
            return;
        }
    }
    else {
        if(categoryId === 0){
            toastr.warning('Selecione uma categoria.')
            return;
        }
    }

    if(description === ''){
        toastr.warning('Preencha a descrição do lançamento.')
        return;
    }
    
    if(amount === 0){
        toastr.warning('Preencha o valor do lançamento.')
        return;
    }
    else {
        formattedAmount = amount.replace('R$', '').replace(',', '.').trim();
    }

    if(date === ''){
        toastr.warning('Preencha a data do lançamento.')
        return;
    }
    else {
        const dateParts = date.split('-');
        formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
    }

    if (entryId === 0) {
        axios.post(postUrl, {
            userId,
            type,
            name,
            description,
            amount: formattedAmount,
            date: formattedDate,
            paid: isPaid,
            categoryId: selectedCategory
        })
        .then((response) => {
            handleCloseModal()
            toastr.success('Lançamento cadastrado com sucesso!')
        }).catch((error) => {
            console.log(error.response)
        })
    } else {
        axios.put(putUrl, {
            userId,
            type,
            name,
            description,
            amount: formattedAmount,
            date: formattedDate,
            paid: isPaid,
            categoryId
        })
        .then((response) => {
            handleCloseModal()
            toastr.success('Lançamento atualizado com sucesso!')
        })
        .catch((error) => {
            console.log(error.response)
        })
    }
  }
    const handleSwitchChange = () => {
        setIsPaid(!isPaid);
      };
    
    const handleCloseModal = () => {
        setName('')
        setDescription('')
        setAmount('')
        setDate('')
        setIsPaid(false)
        setCategoryId(0)
        setSelectedCategory(0)
        closeModal()
    }

    const handleAmountChange = (e) => {
        const inputValue = e.target.value;
        // Remove qualquer caractere não numérico do valor inserido
        const numericValue = inputValue.replace(/[^0-9,.]/g, '');
    
        // Formate o valor numérico como uma string em reais
        const formattedValue = formatCurrency(numericValue);
    
        setAmount(formattedValue);
      };
    
      const formatCurrency = (value) => {
        const numericValue = parseFloat(value.replace(',', '.')); // substitui ',' por '.' para permitir decimais
        if (isNaN(numericValue)) {
          return '';
        }
        
        // Use toFixed(2) para garantir que o valor tenha sempre duas casas decimais
        return numericValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      };

      const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
      };

    return (
        <div className={`modal ${modalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: modalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: '#333', fontWeight: 'bold' }}>Lançamento</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>

                    <div style={{ display: 'flex' }}>
                        <div style={{ width: "35%" }}>
                            <div className="form-group">
                                <label htmlFor="recipient-name" className="col-form-label">Tipo:</label>
                                <select className="form-control custom-select" id="recipient-name" onChange={(e) => setType(e.target.value)}>
                                    <option value="expense">Despesa</option>
                                    <option value="revenue">Receita</option>
                                </select>
                            </div>  
                        </div>
                       
                        <div style={{ marginLeft: "5%", width: "60%" }}>
                            <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label">Lançamento:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="recipient-name" 
                                    onChange={(e) => setName(e.target.value)} 
                                    value={name}
                                />
                            </div>
                        </div>
    
                    </div>

                    <div style={{ display: 'flex', marginTop: "10px" }}>

                        <div style={{ width: "35%"}}>
                            <div className='form-group'>
                                <label htmlFor="message-text" className="col-form-label">Valor:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="message-text"
                                    onChange={handleAmountChange}
                                    value={amount}
                                />
                            </div>
                        </div>

                        <div style={{ marginLeft: "5%", marginTop: "auto", marginBottom: "0.5px", width: "60%"}}>
                            <div className='form-group'>
                                <labe htmlFor="message-text" className="col-form-label">Data:</labe>
                                <input 
                                    type="date"
                                    className="form-control"
                                    id="message-text"
                                    onChange={(e) => setDate(e.target.value)}
                                    value={date}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', marginTop: '15px' }}>
                        <div className="form-check form-switch" style={{width: '35%', marginBottom: "auto", marginTop: "auto" }}>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="isPaidSwitch"
                                checked={isPaid}
                                onChange={handleSwitchChange}
                            />
                            <label className="form-check-label" htmlFor="isPaidSwitch">
                                {isPaid ? 'Pago' : 'Pendente'}
                            </label>
                        </div>

                        <div style={{ marginLeft: "5%", marginTop: "auto", marginBottom: "0.5px", width: "60%"}}>
                            <div className="form-group">
                                <label htmlFor="categorySelect" className="col-form-label">Categoria:</label>
                                <select
                                    id="categorySelect"
                                    className="form-control"
                                    onChange={handleCategoryChange}
                                    value={selectedCategory}
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {category.map((category) => (
                                        <option key={category.id} value={category.id}>
                                        {category.name}
                                        </option>
                                    ))}

                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <div className="form-group">
                           <label>Descrição:</label>
                           <textarea className="form-control" id="message-text" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                    </div>
       
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={saveEntry}>Salvar</button>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default LancamentoModal;