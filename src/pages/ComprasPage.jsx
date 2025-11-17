import { useState, useContext } from 'react'
import { Card } from '../components/Card'
import { ModalCheckout } from '../modal/ModalCheckout'

import { ProductosContext } from '../context/ProductosContext'
import { CarritoContext } from '../context/CarritoContext'

export const ComprasPage = () => {
    const { productos } = useContext(ProductosContext)
    const { agregarCompra, eliminarCompra } = useContext(CarritoContext)

    const [modalOpen, setModalOpen] = useState(false)
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)

    // Abrir modal y asignar producto
    const handleComprar = (producto) => {
        setProductoSeleccionado(producto)
        setModalOpen(true)
    }

    // Confirmar compra desde modal
    const handleConfirmarCompra = (productoConCantidad) => {
        agregarCompra(productoConCantidad)
        setModalOpen(false)
    }

    return (
        <>
            <h1>Compras: </h1>
            <hr />
            <div className='productos-grid'>
                {productos.map((producto) => (
                    <Card
                        key={producto.id}
                        id={producto.id}
                        imagen={producto.image}
                        titulo={producto.title}
                        descripcion={producto.description}
                        precio={producto.price}
                        producto={producto}
                        handleAgregar={() => agregarCompra(producto)}
                        handleQuitar={() => eliminarCompra(producto.id)}
                        handleComprar={() => handleComprar(producto)} // Nuevo botón
                    />
                ))}
            </div>

            {modalOpen && (
                <ModalCheckout
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    producto={productoSeleccionado}
                    onConfirm={handleConfirmarCompra}
                />
            )}
        </>
    )
}
