import { useContext } from 'react'
import { CarritoContext } from '../context/CarritoContext'
import '../styles/card.css'

export const Card = ({ id, imagen, titulo, descripcion, precio, producto }) => {
    const { listaCompras, agregarCompra, eliminarCompra } =
        useContext(CarritoContext)

    // Ver si ya está en el carrito
    const isAdded = listaCompras.some((item) => item.id === id)

    return (
        <div className='tarjeta'>
            <img
                src={imagen}
                alt={titulo}
                className='tarjeta-imagen'
            />
            <div className='tarjeta-contenido'>
                <h3 className='tarjeta-titulo'>{titulo}</h3>
                <p className='tarjeta-descripcion'>{descripcion}</p>
                <p className='tarjeta-precio'>{precio}</p>

                {isAdded ? (
                    <button
                        className='boton-quitar'
                        onClick={() => eliminarCompra(id)}
                    >
                        Quitar del Carrito
                    </button>
                ) : (
                    <button
                        className='boton-agregar'
                        onClick={() => agregarCompra(producto)}
                    >
                        Agregar al Carrito
                    </button>
                )}
            </div>
        </div>
    )
}
