import { useState, useEffect } from 'react'
import Image from "next/image"
import Nav from "./Nav"
import styles from '../styles/Header.module.css'
import CartSidebar from "./CartSidebar";

function Header({headerProps}) {

  const [ openCartSidebar, setOpenCartSidebar ] = useState(false);

   const { titulo, eslogan, parrafo, imagen } = headerProps;

   const changeOpenCartSiderbar = () => {
     setOpenCartSidebar(!openCartSidebar)
   }

   useEffect(() => {
    const body = document.querySelector("body");
    if (openCartSidebar) {
      body.classList.add("noScrollCart");
    } else {
      body.classList.remove("noScrollCart");
    }
  }, [openCartSidebar]);

  return (
      <header>
        {headerProps ? (
             <div className={styles.fondoimagen}>
           
             <Image 
                 layout='fill'
                 objectFit='cover'
                 objectPosition='top'
                 priority={true}
                 src={imagen.url} 
                 alt={`Imagen header ${titulo}`} 
             /> 
   
               
   
               <div className={styles.fondoContenido}>
                 <Nav
                    changeOpenCartSiderbar={changeOpenCartSiderbar}
                 />
                 <div className={`${styles.contenido} 'contenedor'`}>
                       <h1>{titulo}</h1>
                       <h2>{eslogan}</h2>
                       <p>{parrafo}</p>
                 </div>
               </div>
   
           </div>
        ): (
          <div className={styles.fondoSinImagen}>
            <Nav
                changeOpenCartSiderbar={changeOpenCartSiderbar}
            />
          </div>
        )}
        
      <CartSidebar
        changeOpenCartSiderbar={changeOpenCartSiderbar}
        openCartSidebar={openCartSidebar}
      /> 
        
      
      </header>
     
  )
}

export default Header

