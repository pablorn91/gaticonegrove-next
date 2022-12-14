import { useState, useEffect } from "react";
import { createContext } from "react";
import axiosClient from "../config/axios";
import { parseJwt } from "../helpers";

const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const [cart, setCart] = useState(null); //CARRITO
  const [openCartSidebar, setOpenCartSidebar] = useState(false);
  const [addresses, setAddresses] = useState(null); //DIRECCIONES
  const [updateAddresses, setUpdateAddresses] = useState(false);

  const clearUserData = () => {
    setCart([]);
    setAddresses([]);
  };

  /** Cart functions **/

  const changeOpenCartSiderbar = () => {
    setOpenCartSidebar(!openCartSidebar);
  };

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

  /** Addresses functions **/

  useEffect(() => {
    if (updateAddresses) {
      updateAddressesApi();
    }
    setUpdateAddresses(false);
  }, [updateAddresses]);

  const updateAddressesApi = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    if (addresses === null) return;

    try {
      const { data } = await axiosClient.put(
        `/users/${parseJwt(token).id}`,
        {
          Addresses: addresses,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddresses(data.Addresses);
    } catch (error) {
      console.log(error);
    }
  };

  const addAddress = (address) => {
    if (addresses === null) {
      setAddresses([addAddress]);
    } else {
      setAddresses([...addresses, address]);
    }
    setUpdateAddresses(true);
  };

  const updateAddress = (newDataAddress, idAddress) => {
    addresses.map((address) => {
      if (address.id === idAddress) {
        address.title = newDataAddress.title;
        address.name = newDataAddress.name;
        address.address = newDataAddress.address;
        address.city = newDataAddress.city;
        address.state = newDataAddress.state;
        address.postalCode = newDataAddress.postalCode;
        address.phone = newDataAddress.phone;
      }
      return address;
    });
    setUpdateAddresses(true);
  };

  const deleteAddress = (idAddress) => {
    const currentAddresses = addresses.filter(
      (address) => address.id !== idAddress
    );
    setAddresses(currentAddresses);
    setUpdateAddresses(true);
  };

  return (
    <UserDataContext.Provider
      value={{
        clearUserData,
        cart, //CARRITO
        setCart,
        openCartSidebar,
        changeOpenCartSiderbar,
        addToCart,
        deleteProductCart,
        addresses, //DIRECCIONES
        setAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataProvider };

export default UserDataContext;
