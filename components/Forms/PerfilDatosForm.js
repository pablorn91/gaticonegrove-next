import { useState } from "react";
import axiosClient from "../../config/axios";
import { parseJwt } from "../../helpers";
import Alerta from "../Alerta";
import useAuth from "../../hooks/useAuth";
import styles from "../../styles/Formulario.module.css";

export default function PerfilDatosForm() {
  const { auth, setAuth } = useAuth();

  const [newUserDates, setNewUserDates] = useState({
    newName: auth.name || "",
    newLastnames: auth.lastnames || "",
    newEmail: "",
    newPassword: "",
    repeatPassword: "",
  });
  const [alerta, setAlerta] = useState({});

  const handleOnChangeNewUserDates = (e) => {
    setNewUserDates({ ...newUserDates, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDates = {};

    //agregar nuevo nombre Solo si es diferente del actual y si se ha escrito algo
    if (newUserDates.newName !== auth.name && newUserDates.newName !== "") {
      newDates = { ...newDates, name: newUserDates.newName };
    }
    //agregar nuevos apellidos Solo si son diferentes del actual y si se ha escrito algo
    if (
      newUserDates.newLastnames !== auth.lastnames &&
      newUserDates.newLastnames !== ""
    ) {
      newDates = { ...newDates, lastnames: newUserDates.newLastnames };
    }

    //agregar nuevo email Solo si es diferente del actual y si se ha escrito algo
    if (newUserDates.newEmail !== auth.email && newUserDates.newEmail !== "") {
      newDates = { ...newDates, email: newUserDates.newEmail };
    }

    //agregar nuevo password Solo si es diferente del actual y si se ha escrito algo
    if (
      newUserDates.newPassword === newUserDates.repeatPassword &&
      newUserDates.newPassword !== ""
    ) {
      newDates = { ...newDates, password: newUserDates.newPassword };
    }

    //Si los password no coinciden setear una alerta
    if (newUserDates.newPassword !== newUserDates.repeatPassword) {
      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }
    //Si no se han agregado ningun campo al objeto newDates
    if (Object.values(newDates).length === 0) {
      setAlerta({
        msg: "No has ingresado nuevos datos",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    updateUserData(newDates);
  };

  //Actualizar datos de usuario
  const updateUserData = async (newDates) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }
    if (newDates.email) newDates.username = newDates.email;
    try {
      await axiosClient.put(`/users/${parseJwt(token).id}`, newDates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (newDates.password) delete newDates.password;
      if (newDates.username) delete newDates.username;

      setAuth({ ...auth, ...newDates });
      setAlerta({
        msg: "Cambios realizados exitosamente",
      });
      setNewUserDates({
        ...newUserDates,
        ...{ newEmail: "", newPassword: "", repeatPassword: "" },
      });
    } catch (error) {
      console.log(error);
      if (error) {
        setAlerta({
          msg: "Ha ocurrido un error",
          error: true,
        });
      }
    }
    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const { msg } = alerta;
  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      {msg && <Alerta alerta={alerta} />}
      <label htmlFor="newName">Cambiar tu nombre y Apellidos:</label>
      <div className={styles.dobleCampo}>
        <div className={styles.campo}>
          <input
            id="newName"
            type="text"
            placeholder="Tu nuevo nombre"
            name="newName"
            value={newUserDates.newName}
            onChange={(e) => handleOnChangeNewUserDates(e)}
          />
        </div>

        <div className={styles.campo}>
          <input
            type="text"
            placeholder="Tus nuevos apellidos"
            name="newLastnames"
            value={newUserDates.newLastnames}
            onChange={(e) => handleOnChangeNewUserDates(e)}
          />
        </div>
      </div>

      <div className={styles.campo}>
        <label htmlFor="newEmail">
          Cambiar tu Email (actual: {auth.email}):
        </label>
        <input
          id="newEmail"
          type="email"
          placeholder="Tu nuevo email"
          name="newEmail"
          value={newUserDates.newEmail}
          onChange={(e) => handleOnChangeNewUserDates(e)}
        />
      </div>

      <label htmlFor="newPassword">Cambiar tu contraseña:</label>
      <div className={styles.dobleCampo}>
        <div className={styles.campo}>
          <input
            id="newPassword"
            type="password"
            placeholder="Nueva contraseña"
            name="newPassword"
            value={newUserDates.newPassword}
            onChange={(e) => handleOnChangeNewUserDates(e)}
          />
        </div>

        <div className={styles.campo}>
          <input
            type="password"
            placeholder="Repetir contraseña"
            name="repeatPassword"
            value={newUserDates.repeatPassword}
            onChange={(e) => handleOnChangeNewUserDates(e)}
          />
        </div>
      </div>

      <input type="submit" value="Guardar Cambios" className={styles.boton} />
    </form>
  );
}
