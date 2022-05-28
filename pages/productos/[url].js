import Layout from "../../components/Layout";
import Image from 'next/image';

function Producto({productoProp}) {
    const {titulo, imagen, precio, descripcion} = productoProp[0];
  return (
    <Layout
        pagina={titulo}
        headerProps={false}
    >
        <div className="contenedor">
            <h2>{titulo}</h2>
            <Image layout='responsive' width={400} height={400} src={imagen[0].url} alt={`Imagen ${titulo}`} />
            <div>
                <p>${precio}</p>
                <p>{descripcion}</p>
            </div>
        </div>
    </Layout>
  )
}

export async function getServerSideProps({ query: { url }}) {
    const urlProducto = `${process.env.API_URL}/productos?url=${url}`;
    const respuesta = await fetch(urlProducto);
    const productoProp =await respuesta.json();
    return {
        props: {
            productoProp
        }
    }
}

export default Producto