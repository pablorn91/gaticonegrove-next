import Layout from "../components/Layout"
import Destacados from "../components/Destacados";

export default function Home({headerProps, destacadosProps}) {
  

  return (
    <>
      <Layout
        pagina='Inicio'
        headerProps={headerProps}
      >
          <main>

            <Destacados
              destacadosProps={destacadosProps}
            />

          </main>
      </Layout>
    </>
  )
}

 export async function getServerSideProps() {

   const urlHeader = `${process.env.API_URL}/header`;
   const urlDestacado = `${process.env.API_URL}/destacado`;

   const [ resHeader, resDestacado ] = await Promise.all([
     fetch(urlHeader),
     fetch(urlDestacado)
   ])

   const [headerProps , destacadosProps ] = await Promise.all([
     resHeader.json(),
     resDestacado.json()
   ])

  //  const response = await fetch(urlHeader)
  //  const headerProps = await response.json();

   return {
     props: {
      headerProps,
      destacadosProps
     }
   }

 }
