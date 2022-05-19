import Layout from "../components/Layout"

export default function Home({headerProps}) {
  
  return (
    <>
      <Layout
        pagina='Inicio'
        headerProps={headerProps}
      >
          <h1>Index</h1>
      </Layout>
    </>
  )
}

 export async function getServerSideProps() {
   const urlHeader = `${process.env.API_URL}/header`;
   const response = await fetch(urlHeader)
   const headerProps = await response.json();

   return {
     props: {
      headerProps
     }
   }

 }
