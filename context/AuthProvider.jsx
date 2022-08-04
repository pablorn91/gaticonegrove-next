import { createContext, useState, useEffect } from "react";
import { parseJwt } from "../helpers";
import axiosClient from "../config/axios";
import useUserData from "../hooks/useUserData";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const { setCart, setAddresses } = useUserData();

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
        setCart(data.shoppingCart ?? []);
        setAddresses(data.Addresses ?? []);
      } catch (error) {
        console.log(error);
        setAuth({});
        setCart(null);
      }
      setLoading(false);
    };
    autenticarUsuario();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
