import Layout from "../components/Layout";
import Destacados from "../components/Destacados";
import ListadoProducto from "../components/ListadoProducto";

export default function Home({ headerProps, destacadosProps, productosProps }) {
  return (
    <>
      <Layout pagina="Inicio" headerProps={headerProps}>
        <main className="contenedor">
          <Destacados destacadosProps={destacadosProps} />

          <h2>Lo nuevo</h2>
          <ListadoProducto productosProps={productosProps} />
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const urlHeader = `${process.env.API_URL}/header`;
  const urlDestacado = `${process.env.API_URL}/destacado`;
  const urlProductos = `${process.env.API_URL}/productos?_limit=3&_sort=createdAt:desc`;

  const [resHeader, resDestacado, resProductos] = await Promise.all([
    fetch(urlHeader),
    fetch(urlDestacado),
    fetch(urlProductos),
  ]);

  const [headerProps, destacadosProps, productosProps] = await Promise.all([
    resHeader.json(),
    resDestacado.json(),
    resProductos.json(),
  ]);

  //  const response = await fetch(urlHeader)
  //  const headerProps = await response.json();

  return {
    props: {
      headerProps,
      destacadosProps,
      productosProps,
    },
  };
}
