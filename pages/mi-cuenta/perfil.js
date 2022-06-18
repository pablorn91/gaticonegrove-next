import { useEffect } from "react"
import Layout from "../../components/Layout"

import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import Spinner from "../../components/Spinner"

const Perfil = () => {

    const { auth,setAuth, setCart } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (Object.values(auth).length === 0) {
          router.push('./acceder-registrarse')
        }
    },[auth])

    const logout = () => {
        localStorage.removeItem('token')
        setAuth({})
        setCart([])
    }

  return (
    <Layout
    pagina='Perfil'
    headerProps={false}
    >
        {Object.values(auth).length === 0 ? <Spinner/> :(
        <>
          <h2>Perfil</h2>
          <p>Hola {auth.name}</p>
          <button onClick={logout}>Salir</button>
        </>
        )}
      

    </Layout>
  )
}

export default Perfil