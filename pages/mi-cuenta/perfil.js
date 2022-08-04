import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import PerfilDatosForm from "../../components/Forms/PerfilDatosForm";
import AddressForm from "../../components/Forms/AddressForm";
import ListadoAddress from "../../components/ListadoAddress";
import BasicModal from "../../components/BasicModal";
import useAuth from "../../hooks/useAuth";
import useUserData from "../../hooks/useUserData";
import stylesPerfil from "../../styles/Perfil.module.css";

export default function Perfil() {
  const { auth, setAuth } = useAuth();
  const { clearUserData } = useUserData();
  const router = useRouter();

  useEffect(() => {
    if (Object.values(auth).length === 0) {
      router.push("./acceder-registrarse");
    }
  }, [auth]);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({});
    clearUserData();
  };

  return (
    <Layout pagina="Perfil" headerProps={false}>
      {Object.values(auth).length === 0 ? (
        <Spinner />
      ) : (
        <div className="contenedor">
          <h2>Perfil</h2>
          <div className={stylesPerfil.titleWrapper}>
            <h3 className={stylesPerfil.title}>Tus datos</h3>
          </div>

          <PerfilDatosForm />

          <Addresses />

          <div className={stylesPerfil.logoutContenedor}>
            <button className={stylesPerfil.botonLogout} onClick={logout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

function Addresses() {
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);

  const { addresses, addAddress, deleteAddress } = useUserData();

  const handleOpen = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        handleClose={handleClose}
        addAddress={addAddress}
        isNewAddress={address ? false : true}
        address={address || null}
      />
    );
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  return (
    <>
      <div
        className={stylesPerfil.addAddress}
        onClick={() => handleOpen("Añadir Dirección")}
      >
        <HiPlus />
      </div>
      <h3 className={stylesPerfil.title}>Tus direcciones</h3>
      <div className={stylesPerfil.datos}>
        <ListadoAddress
          addresses={addresses}
          handleOpen={handleOpen}
          deleteAddress={deleteAddress}
        />
      </div>
      <BasicModal open={openModal} handleClose={handleClose} title={titleModal}>
        {formModal}
      </BasicModal>
    </>
  );
}
