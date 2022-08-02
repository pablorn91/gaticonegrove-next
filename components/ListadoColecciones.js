import Image from "next/image";
import Link from "next/link";
import stylesListadoColecciones from "../styles/ListadoColecciones.module.css";
import stylesColeccion from "../styles/Coleccion.module.css";

export default function ({ coleccionesProps }) {
  return (
    <div className={stylesListadoColecciones.listado}>
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
    <div className={stylesColeccion.coleccion}>
      <h3>{nombre}</h3>
      <Link href={`/colecciones/${url}`}>
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
