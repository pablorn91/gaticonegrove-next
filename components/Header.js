import Image from "next/image"
import Nav from "./Nav"
import styles from '../styles/Header.module.css'

function Header({headerProps}) {
   const { titulo, eslogan, parrafo, imagen } = headerProps;
  return (
      <>
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
                 <Nav/>
                 <div className={`${styles.contenido} 'contenedor'`}>
                       <h1>{titulo}</h1>
                       <h2>{eslogan}</h2>
                       <p>{parrafo}</p>
                 </div>
               </div>
   
           </div>
        ): (
          <div className={styles.fondoSinImagen}>
            <Nav/>
          </div>
        )}
       
        
      
      </>
     
  )
}

export default Header

