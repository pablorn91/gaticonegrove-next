import { useState } from "react";
import Alerta from "../Alerta";
import styles from "../../styles/Formulario.module.css";

export default function AddressForm({
  isNewAddress,
  address,
  handleClose,
  addAddress,
}) {
  const [addressForm, setAddressForm] = useState({
    title: address?.title || "",
    name: address?.name || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    phone: address?.phone || "",
  });
  const [alerta, setAlerta] = useState({});

  const handleOnChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(addressForm).includes("")) {
      setAlerta({
        msg: "Por favor, introduce todos los datos",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    isNewAddress ? createAddress() : updateAddress();
  };

  const createAddress = async () => {
    await addAddress(addressForm);
    setAlerta({
      msg: "Dirección creada exitosamente",
    });

    setTimeout(() => {
      setAlerta({});
      handleClose();
    }, 2000);
  };

  const updateAddress = () => {
    console.log("actualizando direccion");
  };

  const { msg } = alerta;
  return (
    <form onSubmit={handleSubmit}>
      {msg && <Alerta alerta={alerta} />}
      <div className={styles.campo}>
        <label htmlFor="title">Título de la dirección:</label>
        <input
          id="title"
          type="text"
          placeholder="Añade el Título de la dirección"
          name="title"
          value={addressForm.title}
          onChange={(e) => handleOnChange(e)}
        />
      </div>

      <div className={styles.dobleCampo}>
        <div className={styles.campo}>
          <label htmlFor="name">Nombre y Apellidos:</label>
          <input
            id="name"
            type="text"
            placeholder="Nombre y Apellidos"
            name="name"
            value={addressForm.name}
            onChange={(e) => handleOnChange(e)}
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="address">Dirección:</label>
          <input
            id="address"
            type="text"
            placeholder="Añade la dirección"
            name="address"
            value={addressForm.address}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
      </div>

      <div className={styles.dobleCampo}>
        <div className={styles.campo}>
          <label htmlFor="city">Ciudad:</label>
          <input
            id="city"
            type="text"
            placeholder="Añade ciudad"
            name="city"
            value={addressForm.city}
            onChange={(e) => handleOnChange(e)}
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="state">Estado/Provincia/Región:</label>
          <input
            id="state"
            type="text"
            placeholder="Añade Estado/Provincia/Región"
            name="state"
            value={addressForm.state}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
      </div>

      <div className={styles.dobleCampo}>
        <div className={styles.campo}>
          <label htmlFor="postalCode">Código postal:</label>
          <input
            id="postalCode"
            type="text"
            placeholder="Añade Código postal"
            name="postalCode"
            value={addressForm.postalCode}
            onChange={(e) => handleOnChange(e)}
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="phone">Número de teléfono:</label>
          <input
            id="phone"
            type="text"
            placeholder="Añade un número de teléfono"
            name="phone"
            value={addressForm.phone}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
      </div>

      <input
        type="submit"
        value={isNewAddress ? "Guardar Dirección" : "Actualizar Dirección"}
        className={styles.boton}
      />
    </form>
  );
}
