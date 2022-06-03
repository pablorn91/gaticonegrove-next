import Layout from "../../components/Layout";
import Listado from "../../components/Listado";

function Coleccion({coleccionProp}) {

    const nombreColeccion = coleccionProp[0].coleccion.nombre;

  return (
    <Layout
        pagina='Tienda'
        headerProps={false}
      >
         <main className='contenedor'>
            
            <h2>{nombreColeccion}</h2>

            <Listado 
              productosProps={coleccionProp}
            />

         </main>
      </Layout>
  )
}

export async function getServerSideProps({ query: { url }}) {
    const urlColeccion = `${process.env.API_URL}/productos?coleccion.url=${url}`;
    const respuesta = await fetch(urlColeccion);
    const coleccionProp =await respuesta.json();
    return {
        props: {
            coleccionProp
        }
    }
}

export default Coleccion