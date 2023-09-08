import React from 'react'

const ListCategory = (props) => {
    return (
        <table className='table table-hover'>
            <thead>
                <tr className='header table-primary'>
                    <th>
                        Lançamento
                    </th>

                    <th>
                        Categoria
                    </th>

                    <th>
                        Valor R$
                    </th>

                    <th>
                        Ações
                    </th>
                </tr>
            </thead>

            <tbody>
                {props.entry[0] == undefined && (
                    <tr>
                        <td colSpan={2}>Nenhuma entrada cadastrada</td>
                    </tr>
                )}

                {props.entry[0] != undefined && (
                    <>
                    {props.entry.map(entrys => (
                        <tr key={entrys.id}>
                        <td style={{ width: "35%" }}>

                            <strong style={{ fontSize: "20px" }}>{entrys.name}</strong>
                            
                            <p style={{ fontSize: "16px", color: "green", marginTop: "10px" }}>
                                {entrys.date}
                            </p>

                            <p>{entrys.description}</p>

                        </td>

                        <td style={{ width: "40%", verticalAlign: "middle" }}>
                            {entrys.category.name}
                        </td>

                        <td style={{ width: "10%", verticalAlign: "middle" }}>

                            <div>
                                {entrys.type == "expense" && (
                                    <p style={{ color: "red", fontWeight: "bold" }}>{entrys.amount}</p>
                                )}
                                {entrys.type != "expense" && (
                                    <p style={{ color: "green", fontWeight: "bold" }}>{entrys.amount}</p>
                                )}
                            </div>

                            <div>
                                {entrys.paid == true && (
                                    <p style={{ fontWeight: "bold", color: "green"}}>Pago</p>
                                )}
                                {entrys.paid != true && (
                                    <p style={{ fontWeight: "bold", color: "yellow"}}>Pendente</p>
                                )}
                            </div>

                        </td>

                        <td style={{ width: "15%", verticalAlign: "middle" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button
                                type='button'
                                className='btn btn-primary'
                                onClick={() => props.editarLancamento(entrys.id)}>
                                Editar
                            </button>
                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={() => props.excluirLancamento(entrys.id)}>
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

export default ListCategory;