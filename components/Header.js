import Image from "next/image"
import styles from '../styles/Header.module.css'
function Header({headerProps}) {
   const { titulo, eslogan, parrafo, imagen } = headerProps;
  return (
      <>

        <div className={styles.fondoimagen}>
           
          <Image 
              layout='responsive' 
              width={800} 
              height={600} 
              src={imagen.url} 
              alt={`Imagen header ${titulo}`} 
          /> 

          

            <div className={styles.fondoContenido}>
              <div className="contenedor">
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

