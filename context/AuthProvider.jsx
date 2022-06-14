import { createContext, useState, useEffect } from 'react'
import { parseJwt } from '../helpers'
import axios from 'axios'

const AuthContext =createContext()

const AuthProvider = ({children}) => {

    const [ auth, setAuth ] = useState({})
    const [ loading, setLoading ] = useState(true)
    const [ cart, setCart ] = useState([])

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
                    const DbCart = data.shoppingCart ?? [];
                    setCart(DbCart)
               
               
           } catch (error) {
            console.log(error);
            setAuth({})
            setCart([])
           }
           setLoading(false)
 
        }
        autenticarUsuario();
    }, [])

    useEffect(() => {
        const updateCartInDB = () => {

            const token = localStorage.getItem('token')
            
            if (!token) {
                return
            }

            if (cart.length === 0) return

            try {
                axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${parseJwt(token).id}`,   {
                shoppingCart: cart
              },{
                headers: {
                    Authorization:
                    `Bearer ${token}`,
                },
                
              })  
            } catch (error) {
                console.log(error)
            }
        }
        updateCartInDB()
    }, [cart])

    const addToCart = product => {


        if (cart.some( item =>  item.id === product.id && item.corte === product.corte && item.talla === product.talla )) {
            const  updatedCart = cart.map( item => {
                if (item.id === product.id && item.corte === product.corte && item.talla === product.talla ) {
                    item.cantidad = product.cantidad;
                }
                return item;
            })
            setCart(updatedCart)
        } else {
            setCart([...cart, product])
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                setLoading,
                addToCart,
                cart
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