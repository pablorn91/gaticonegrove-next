import Producto from './Producto'
import styles from '../styles/Listado.module.css'

const Listado = ({productosProps}) => {
  return (
    <div className={styles.listado}>
        {productosProps.map(producto => (
            <Producto
                key={producto.url}
                producto={producto}
            />
        ))}
    </div>
  )
}

export default Listado