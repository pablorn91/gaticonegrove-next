import { useEffect } from "react"
import Layout from "../../components/Layout"

import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import Spinner from "../../components/Spinner"

const Perfil = () => {

    const { auth,setAuth, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (Object.values(auth).length === 0) {
          router.push('./acceder-registrarse')
        }
    },[auth])

    const logout = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

  return (
    <Layout
    pagina='Perfil'
    headerProps={false}
    >
        {Object.values(auth).length === 0 || loading ? <Spinner/> :(

        <h2>Perfil</h2>
        )}
      
        <button onClick={logout}>Salir</button>

    </Layout>
  )
}

export default Perfil