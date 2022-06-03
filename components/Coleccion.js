import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Coleccion.module.css'

function Coleccion({coleccion}) {
    const {nombre, imagen, url} = coleccion;

    console.log()
  return (
    <div className={styles.coleccion}>
        <h3>{nombre}</h3>
        <Link href={`/colecciones/${url}`}>
          <a>
            <Image layout="responsive" width={800} height={400} src={imagen.url} alt={`Imagen ${nombre}`}/>
          </a>
        </Link>
        
    </div>
  )
}

export default Coleccion