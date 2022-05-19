import Image from "next/image"
import styles from '../styles/Header.module.css'

import Nav from "./Nav";
function Header({headerProps}) {
   const { titulo, eslogan, parrafo, imagen } = headerProps;
  return (
      <>

        <div className={styles.fondoimagen}>
           
          <Image 
              layout='fill'
              objectFit='cover'
              objectPosition='top'
              src={imagen.url} 
              alt={`Imagen header ${titulo}`} 
          /> 

            

            <div className={styles.fondoContenido}>
              <Nav/>
              <div className={`${styles.contenido} 'contenedor'`}>
                    <h1>{titulo}</h1>
                    <h2>{eslogan}</h2>
                    <p>{parrafo}</p>
              </div>
            </div>

        </div>
        
      
      </>
     
  )
}

export default Header

