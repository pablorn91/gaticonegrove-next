import React from 'react'
import Link from 'next/link'
import ProductoCarrito from './ProductoCarrito'
import { HiX, HiOutlineShoppingBag } from "react-icons/hi"
import useAuth from '../hooks/useAuth'
import styles from '../styles/CartSidebar.module.css'

function CartSidebar() {

  const { auth, cart, openCartSidebar, changeOpenCartSiderbar } = useAuth()

  return (
      
      <>  
        <div 
        onClick={changeOpenCartSiderbar}
        className={`${styles.fondoCartSidebar} ${openCartSidebar && styles.openFondoCartSidebar}`}
        >
        </div>
        
        <div className={`${styles.cartSidebar} ${openCartSidebar && styles.openCartSidebar}`}>
          
            <div className={styles.wrapCerrarCart}>
           
                <p>Carrito de compras</p>
                
                <div
                    onClick={changeOpenCartSiderbar} 
                    className={styles.icono}
                >
                    <HiX />
                </div>

            </div>

            {cart?.length === 0 && (

              <div className={styles.iconoCart}>
                <HiOutlineShoppingBag/>
              </div>
                  
            )}

            {Object.values(auth).length === 0 ? (
              <>
                <p className={styles.textoCarrito}>Ingresa para empezar a agregar productos</p>   

                <Link href='/mi-cuenta/acceder-registrarse'>
                  <a 
                    onClick={changeOpenCartSiderbar}
                    className={styles.accederRegistrarse}
                  >Acceder / Registrarse</a>
                </Link>
              </>
            ): (
                cart.length > 0 ? (
                  <div className={styles.listaProductosCarrito}>
                      {cart.map( product => (
                        <ProductoCarrito
                          key={`${product.id}-${product.corte}-${product.color_franela}-${product.talla}`}
                          product={product}
                        />
                      ))}
                  </div>
                ): (
                  <>
                    <p className={styles.textoCarrito}>Aún no hay productos en el carrito</p>

                    <Link href='/tienda'>
                        <a 
                          onClick={changeOpenCartSiderbar}
                          className={styles.accederRegistrarse}
                        >Seguir Comprando</a>
                      </Link>
                  </>
                )
            )}
            
              

        </div>
      </>

  )
}

export default CartSidebar