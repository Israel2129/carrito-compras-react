import { useState } from 'react'
import '../styles/modalCheckout.css'

export const ModalCheckout = ({ isOpen, onClose, producto, onConfirm }) => {
    const [cantidad, setCantidad] = useState(1)

    if (!isOpen || !producto) return null

    const aumentar = () => setCantidad((prev) => prev + 1)
    const disminuir = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1))

    const handleConfirm = () => {
        onConfirm({ ...producto, cantidad })
        onClose()
    }

    return (
        <div className='modal-overlay'>
            <div className='modal-checkout'>
                <div className='modal-header'>
                    <h2>{producto.title}</h2>
                    <button
                        className='modal-close'
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className='modal-body'>
                    <img
                        src={producto.image}
                        alt={producto.title}
                    />
                    <div className='modal-info'>
                        <p className='precio'>Precio: ${producto.price}</p>
                        <div className='cantidad'>
                            <button onClick={disminuir}>-</button>
                            <span>{cantidad}</span>
                            <button onClick={aumentar}>+</button>
                        </div>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button
                        className='confirmar'
                        onClick={handleConfirm}
                    >
                        Agregar al carrito
                    </button>
                    <button
                        className='cancelar'
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}
