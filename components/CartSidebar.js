import React from 'react'
import styles from '../styles/CartSidebar.module.css'
import { HiX } from "react-icons/hi"

function CartSidebar({openCartSidebar,changeOpenCartSiderbar}) {
  return (
      <>
        
        <div 
        onClick={changeOpenCartSiderbar}
        className={`${styles.fondoCartSidebar} ${openCartSidebar && styles.openFondoCartSidebar}`}
        >
        </div>
        <div className={`${styles.cartSidebar} ${openCartSidebar && styles.openCartSidebar}`}>
            <div
                onClick={changeOpenCartSiderbar} 
                className={styles.icono}
            >
                <HiX />
            </div>
        </div>
      </>

  )
}

export default CartSidebar