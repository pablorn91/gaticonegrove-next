import Image from 'next/image';
import styles from '../styles/Coleccion.module.css'

function Coleccion({coleccion}) {
    const {nombre, imagen} = coleccion;

    console.log()
  return (
    <div className={styles.coleccion}>
        <h3>{nombre}</h3>
        <Image layout="responsive" width={800} height={400} src={imagen.url} alt={`Imagen ${nombre}`}/>
        
    </div>
  )
}

export default Coleccion