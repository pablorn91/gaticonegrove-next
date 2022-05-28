import Coleccion from './Coleccion'
import styles from '../styles/ListadoColecciones.module.css'

const ListadoColecciones = ({coleccionesProps}) => {
  return (
    <div className={styles.listado}>
        {coleccionesProps.map(coleccion => (
            <Coleccion
                key={coleccion.id}
                coleccion={coleccion}
            />
        ))}
    </div>
  )
}

export default ListadoColecciones