import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import './LancamentoModal.css';

const LancamentoModal = ({ modalOpen, closeModal, entryId }) => {
    const userId = localStorage.getItem('userId');
    const [type, setType] = useState('expense');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [paid, setPaid] = useState(false);
    const [categoryId, setCategoryId] = useState(0);

    const [category, setCategory] = useState([]);


    useEffect(() => {
        if (entryId != 0) {
            getEntry()
        }
    }, [entryId])
   

    const getEntry = () => {
        const url = `http://localhost:8080/v1/entry/${entryId}?userId=${userId}`;
        axios.get(url)
        .then((response) => {
            setType(response.data.type)
            setName(response.data.name)
            setDescription(response.data.description)
            setAmount(response.data.amount)
            setDate(response.data.date)
            setPaid(response.data.paid)
            setCategoryId(response.data.category.id)
        }).catch((error) => {
            console.log(error.response)
        })
    }

    const getAllCategorys = () => {
        const url = `http://localhost:8080/v1/category`;
        axios.get(url)
        .then((response) => {
            setCategory(response.data)
        }).catch((error) => {
            console.log(error.response)
        })
    }
    
    const handleCloaseModal = () => {
        setName('')
        setDescription('')
        setAmount('')
        setDate('')
        setPaid(false)
        setCategoryId(0)
        closeModal()
    }

    return (
        <div className={`modal ${modalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: modalOpen ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                     <h5 className="modal-title" style={{ color: '#333', fontWeight: 'bold' }}>Lançamento</h5>
                     <button type="button" className="close" onClick={handleCloaseModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                </div>

                <div className="modal-body">
                    <form>
                        <div style={{ display: 'flex' }}>

                            <div className='form-group'>
                                <label htmlFor='recipient-type'>Tipo</label>
                                <select>
                                    <option value="expense">Despesa</option>
                                    <option value="revenue">Receita</option>
                                </select>
                            </div>

                            <div className='form-group'>
                                <label htmlFor='recipient-name'>Lançamento</label>
                                <input 
                                    type='text'
                                    className='form-control'
                                    id='recipient-name'
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                        </div>
         
                    </form>
                </div>
            </div>
        </div>
    )

}