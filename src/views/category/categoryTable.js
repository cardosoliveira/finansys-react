import React from 'react'

const ListarCategoria = (props) => {
    
    return (

        <table className='table table-hover'>
            <thead>
                <tr className='header table-primary'>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody>

                {props.categorias[0] == undefined && (
                    <tr>
                        <td colSpan={2}>Nenhuma categoria cadastrada</td>
                    </tr>
                )}

                {props.categorias[0] != undefined && (
                    <>
                        {props.categorias.map(categoria => (
                            <tr key={categoria.id}>
                                <td style={{width:"20%"}}>{categoria.name}</td>
                                <td style={{width:"65%"}}>{categoria.description}</td>
                                <td>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <button 
                                            type='button' 
                                            className='btn btn-primary'
                                            onClick={() => props.editarCategoria(categoria.id)}>
                                            Editar
                                        </button>

                                        <button 
                                            type='button' 
                                            className='btn btn-danger'
                                            onClick={() => props.excluirCategoria(categoria.id)}>
                                            Excluir
                                        </button>
                                    </div>                                 
                                </td>
                            </tr>
                        ))}
                    </>
                )}
                
            </tbody>
        </table>
    )
    
}
    
export default ListarCategoria;