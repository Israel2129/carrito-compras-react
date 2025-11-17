import React from 'react'
import '../styles/modalCheckout.css'

export const ModalCheckoutCarrito = ({
    isOpen,
    onClose,
    productos,
    onConfirm,
}) => {
    if (!isOpen || !productos || productos.length === 0) return null

    const total = productos
        .reduce((acc, item) => acc + item.price * item.cantidad, 0)
        .toFixed(2)

    return (
        <div className='modal-overlay'>
            <div className='modal-checkout'>
                <div className='modal-header'>
                    <h2>Confirmar Compra</h2>
                    <button
                        className='modal-close'
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                <div className='modal-body'>
                    {productos.map((p) => (
                        <div
                            key={p.id}
                            className='modal-producto'
                        >
                            <img
                                src={p.image}
                                alt={p.title}
                            />
                            <p>{p.title}</p>
                            <p>
                                {p.cantidad} x ${p.price} = $
                                {(p.cantidad * p.price).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>

                <div className='modal-footer'>
                    <p style={{ fontWeight: 'bold' }}>Total: ${total}</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            className='confirmar'
                            onClick={onConfirm}
                        >
                            Confirmar Compra
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
        </div>
    )
}
