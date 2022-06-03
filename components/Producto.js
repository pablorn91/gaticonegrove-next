import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Producto.module.css'
import { formatearDineroUSD } from '../helpers'

function Producto({producto}) {
    const {titulo, precio, url} = producto;
   const imagen = producto.imagen[0].formats.medium.url;

  return (
    <div className={styles.producto}>
        
        <Link href={`/productos/${url}`}>
          <a>
            <Image layout="responsive" width={400} height={400} src={imagen} alt={`Imagen ${titulo}`}/>
          </a>
        </Link>
        
        <h3>{titulo}</h3>
        <p className={styles.precio}>{formatearDineroUSD(precio)}</p>
    </div>
  )
}

export default Producto