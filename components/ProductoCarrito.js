import React from 'react'
import Image from 'next/image';
import { formatearDineroUSD } from '../helpers'
import { HiX } from "react-icons/hi"
import styles from '../styles/ProductoCarrito.module.css'
import useAuth from '../hooks/useAuth';

function ProductoCarrito({product}) {
    
    const { titulo, imagen, color_franela, corte, talla, cantidad, precio, productId } = product;

    const { deleteProductCart } = useAuth();

  return (
    <>
      
      <div className={styles.productoCarrito}>
      
          <Image layout='fixed' width={60} height={60} src={imagen} alt={`Imagen ${titulo}`} />

          <div>
              <div 
                className={styles.iconX}
                onClick={() => deleteProductCart(productId)}
              >
                <HiX/>
              </div>
              <p className={styles.titulo}>{product.titulo}, {corte}, {color_franela}, {talla}</p>
              <div className={styles.cantidadPrecio}>
                  <p>Cantidad: {cantidad}</p>
                  <p className={styles.precio}>{formatearDineroUSD(precio*cantidad)}</p>
              </div>
          </div>
      </div>
    </>
  )
}

export default ProductoCarrito