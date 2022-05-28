import Layout from "../components/Layout"
import Listado from "../components/Listado";

export default function Tienda({productosProps}) {

  return (
    <>
      <Layout
        pagina='Tienda'
        headerProps={false}
      >
         <main className='contenedor'>
            
            <h2>Tienda</h2>

            <Listado 
              productosProps={productosProps}
            />

         </main>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {

  const urlProductos = `${process.env.API_URL}/productos?_sort=createdAt:desc`;
  const resProductos = await fetch(urlProductos);
  const productosProps = await resProductos.json();

  return {
    props: {
      productosProps
    }
  }

}