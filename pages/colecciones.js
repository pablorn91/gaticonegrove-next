import Layout from "../components/Layout"
import ListadoColecciones from "../components/ListadoColecciones";

export default function Colecciones({coleccionesProps}) {
  
  

  return (
    <>
      <Layout
        pagina='Colecciones'
        headerProps={false}
      >
         <main className='contenedor'>
            
            <h2>Colecciones</h2>

            <ListadoColecciones 
              coleccionesProps={coleccionesProps}
            />

         </main>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {

  const urlColecciones = `${process.env.API_URL}/colecciones`;
  const resColecciones = await fetch(urlColecciones);
  const coleccionesProps = await resColecciones.json();

  return {
    props: {
      coleccionesProps
    }
  }

}