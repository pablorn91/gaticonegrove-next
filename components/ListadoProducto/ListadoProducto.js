import Image from "next/image";
import Link from "next/link";
import { formatearDineroUSD } from "../../helpers";
import styles from "./ListadoProducto.module.css";

export default function ListadoProducto({ productosProps }) {
  return (
    <div className={styles.listado}>
      {productosProps.map((producto) => (
        <Producto key={producto.url} producto={producto} />
      ))}
    </div>
  );
}

function Producto({ producto }) {
  const { titulo, precio, url } = producto;
  const imagen = producto.imagen[0].formats.medium.url;

  return (
    <div className={styles.producto}>
      <Link href={`/producto/${url}`}>
        <a>
          <Image
            layout="responsive"
            width={400}
            height={400}
            src={imagen}
            alt={`Imagen ${titulo}`}
          />
        </a>
      </Link>

      <h3>{titulo}</h3>
      <p className={styles.precio}>{formatearDineroUSD(precio)}</p>
    </div>
  );
}
