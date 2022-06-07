import { createContext, useState, useEffect } from 'react'
import { parseJwt } from '../helpers'
import axios from 'axios'

const AuthContext =createContext()

const AuthProvider = ({children}) => {

    const [ auth, setAuth ] = useState({})
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const autenticarUsuario = async () => {
            setLoading(true)
            const token = localStorage.getItem('token')
            
            if (!token) {
                setLoading(false)
                return
            }

           try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${parseJwt(token).id}`, {
                headers: {
                    Authorization:
                    `Bearer ${token}`,
                },
                });
    
                setAuth({
                    id : data.id,
                    name : data.name,
                    email : data.email,
                    lastnames : data.lastnames
                  })
                console.log(data);
           } catch (error) {
            console.log(error);
            setAuth({})
           }
           setLoading(false)
 
        }
        autenticarUsuario();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                setLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export {
    AuthProvider
}

export default AuthContext