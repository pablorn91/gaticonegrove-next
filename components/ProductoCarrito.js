import React from 'react'
import Image from 'next/image';
import { formatearDineroUSD } from '../helpers'
import styles from '../styles/ProductoCarrito.module.css'

function ProductoCarrito({product}) {
    
    const { titulo, imagen, color_franela, corte, talla, cantidad, precio } = product;

  return (
    <div className={styles.productoCarrito}>
        <Image layout='fixed' width={60} height={60} src={imagen} alt={`Imagen ${titulo}`} />

        <div>
            <p className={styles.titulo}>{product.titulo}, {corte}, {color_franela}, {talla}</p>
            <div className={styles.cantidadPrecio}>
                <p>Cantidad: {cantidad}</p>
                <p className={styles.precio}>{formatearDineroUSD(precio*cantidad)}</p>
            </div>
        </div>
    </div>
  )
}

export default ProductoCarrito