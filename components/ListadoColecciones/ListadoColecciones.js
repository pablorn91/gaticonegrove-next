import Image from "next/image";
import Link from "next/link";
import styles from "./ListadoColecciones.module.css";

export default function ({ coleccionesProps }) {
  return (
    <div className={styles.listado}>
      {coleccionesProps.map((coleccion) => (
        <Coleccion key={coleccion.id} coleccion={coleccion} />
      ))}
    </div>
  );
}

function Coleccion({ coleccion }) {
  const { nombre, imagen, url } = coleccion;

  console.log();
  return (
    <div className={styles.coleccion}>
      <h3>{nombre}</h3>
      <Link href={`/coleccion/${url}`}>
        <a>
          <Image
            layout="responsive"
            width={800}
            height={400}
            src={imagen.url}
            alt={`Imagen ${nombre}`}
          />
        </a>
      </Link>
    </div>
  );
}
