import { createContext, useState, useEffect } from "react";
import { parseJwt } from "../helpers";
import axiosClient from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(null);
  const [openCartSidebar, setOpenCartSidebar] = useState(false);

  const changeOpenCartSiderbar = () => {
    setOpenCartSidebar(!openCartSidebar);
  };

  useEffect(() => {
    const autenticarUsuario = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axiosClient(`/users/${parseJwt(token).id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAuth({
          id: data.id,
          name: data.name,
          email: data.email,
          lastnames: data.lastnames,
        });
        const DbCart = data.shoppingCart ?? [];
        setCart(DbCart);
      } catch (error) {
        console.log(error);
        setAuth({});
        setCart(null);
      }
      setLoading(false);
    };
    autenticarUsuario();
  }, []);

  useEffect(() => {
    const updateCartInDB = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      if (cart === null) return;

      try {
        axiosClient.put(
          `/users/${parseJwt(token).id}`,
          {
            shoppingCart: cart,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    updateCartInDB();
  }, [cart]);

  const addToCart = (product) => {
    if (
      cart.some(
        (item) =>
          item.id === product.id &&
          item.corte === product.corte &&
          item.talla === product.talla
      )
    ) {
      const updatedCart = cart.map((item) => {
        if (
          item.id === product.id &&
          item.corte === product.corte &&
          item.talla === product.talla
        ) {
          item.cantidad = product.cantidad;
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, product]);
    }

    changeOpenCartSiderbar();
  };

  const deleteProductCart = (productId) => {
    const updatedCart = cart.filter(
      (articulo) => articulo.productId !== productId
    );
    setCart(updatedCart);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        setLoading,
        addToCart,
        deleteProductCart,
        cart,
        setCart,
        openCartSidebar,
        changeOpenCartSiderbar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
