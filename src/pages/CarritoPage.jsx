// src/pages/CarritoPage.jsx
import React, { useContext, useState } from 'react'
import { CarritoContext } from '../context/CarritoContext'
import { ModalCheckoutCarrito } from '../modal/ModalCheckoutCarrito' // Nuevo modal

export const CarritoPage = () => {
    const {
        listaCompras,
        aumentarCantidad,
        disminuirCantidad,
        eliminarCompra,
    } = useContext(CarritoContext)

    const [modalOpen, setModalOpen] = useState(false)

    // Calcular total del carrito
    const calcularTotal = () => {
        return listaCompras
            .reduce((total, item) => total + item.price * item.cantidad, 0)
            .toFixed(2)
    }

    // Abrir modal de compra
    const handleComprar = () => {
        if (listaCompras.length > 0) {
            setModalOpen(true)
        }
    }

    // Confirmar compra desde modal
    const handleConfirmarCompra = () => {
        setModalOpen(false)
        // Aquí puedes vaciar el carrito o mostrar mensaje
        alert('Compra confirmada!')
    }

    return (
        <>
            <h1>Carrito de Compras</h1>
            <hr />

            <div className='table-responsive'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaCompras.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>${item.price}</td>
                                <td>
                                    <button
                                        className='btn btn-outline-primary mx-1'
                                        onClick={() =>
                                            disminuirCantidad(item.id)
                                        }
                                    >
                                        -
                                    </button>
                                    <span className='mx-2'>
                                        {item.cantidad}
                                    </span>
                                    <button
                                        className='btn btn-outline-primary mx-1'
                                        onClick={() =>
                                            aumentarCantidad(item.id)
                                        }
                                    >
                                        +
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => eliminarCompra(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {listaCompras.length > 0 && (
                            <tr>
                                <td
                                    colSpan='3'
                                    style={{ fontWeight: 'bold' }}
                                >
                                    TOTAL:
                                </td>
                                <td style={{ fontWeight: 'bold' }}>
                                    ${calcularTotal()}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className='d-grid gap-2 mt-3'>
                <button
                    className='btn btn-primary btn-lg'
                    onClick={handleComprar}
                    disabled={listaCompras.length < 1}
                >
                    COMPRAR
                </button>
            </div>

            {modalOpen && (
                <ModalCheckoutCarrito
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    productos={listaCompras}
                    onConfirm={handleConfirmarCompra}
                />
            )}
        </>
    )
}
