import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import useAuth from "../../hooks/useAuth";
import Spinner from "../Spinner";

function Layout({ children, pagina, headerProps }) {
  const { loading } = useAuth();

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Head>
        <title>{`Gatico Negro Vzla - ${pagina}`}</title>
        <meta name="description" content="Gatico Negro Franelas y estampados" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header headerProps={headerProps} />

      {children}

      <Footer />
    </>
  );
}

export default Layout;
