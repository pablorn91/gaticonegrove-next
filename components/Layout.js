import Head from 'next/head'
import Header from './Header';

function Layout({children,pagina, headerProps}) {
  return (
    <>
        <Head>
            <title>{`Gatico Negro Venezuela - ${pagina}`}</title>
            <meta name="description" content="Gatico Negro Franelas y estampados" />
            <link rel="icon" href="/favicon.png" />
        </Head>

        <Header 
          headerProps={headerProps}
        />

        {children}

    </>
  );
}

export default Layout;
