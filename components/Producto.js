import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Producto.module.css'

function Producto({producto}) {
    const {titulo, imagen, precio, url} = producto;

    console.log()
  return (
    <div className={styles.producto}>
        
        <Link href={`/productos/${url}`}>
          <a>
            <Image layout="responsive" width={400} height={400} src={imagen[0].url} alt={`Imagen ${titulo}`}/>
          </a>
        </Link>
        
        <h3>{titulo}</h3>
        <p className={styles.precio}>${precio}</p>
    </div>
  )
}

export default Producto