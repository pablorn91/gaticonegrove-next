import Image from "next/image";
import Link from "next/link";
import { formatearDineroUSD } from "../helpers";
import stylesListadoProducto from "../styles/ListadoProducto.module.css";
import stylesProducto from "../styles/Producto.module.css";

export default function ListadoProducto({ productosProps }) {
  return (
    <div className={stylesListadoProducto.listado}>
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
    <div className={stylesProducto.producto}>
      <Link href={`/productos/${url}`}>
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
      <p className={stylesProducto.precio}>{formatearDineroUSD(precio)}</p>
    </div>
  );
}
