import { useState } from "react";
import axiosClient from "../../config/axios";
import Alerta from "../../components/Alerta";
import useAuth from "../../hooks/useAuth";
import styles from "../../styles/Formulario.module.css";

export default function RegisterForm() {
  const [newUser, setNewUser] = useState({
    newName: "",
    newLastnames: "",
    newEmail: "",
    newPassword: "",
    repetirPassword: "",
  });

  const [alerta, setAlerta] = useState({});

  const { setAuth, setLoading } = useAuth();

  const handleOnChangeNewUser = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmitNewUser = (e) => {
    e.preventDefault();

    if (
      Object.values(newUser).length < 3 ||
      Object.values(newUser).includes("")
    ) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    if (newUser.newPassword !== newUser.repetirPassword) {
      setAlerta({
        msg: "Los passwords no coinciden",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    if (newUser.newName.length > 15) {
      setAlerta({
        msg: "El Nombre es muy Largo",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    createUser();

    setNewUser({
      newName: "",
      newLastnames: "",
      newEmail: "",
      newPassword: "",
      repetirPassword: "",
    });

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const createUser = async () => {
    setLoading(true);
    await axiosClient
      .post("/auth/local/register", {
        name: newUser.newName,
        lastnames: newUser.newLastnames,
        username: newUser.newEmail,
        email: newUser.newEmail,
        password: newUser.newPassword,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.jwt);
        setAuth({
          id: response.data.user.id,
          name: response.data.user.name,
          lastnames: response.data.user.lastnames,
          email: response.data.user.email,
        });

        setAlerta({
          msg: "Usuario Creado",
          error: false,
        });
      })
      .catch((error) => {
        if (
          error.response.data?.message[0].messages[0].message ===
          "Email is already taken."
        )
          setAlerta({
            msg: "El email ya está en uso",
            error: true,
          });
        console.log(
          "An error occurred:",
          error.response.data.message[0].messages[0].message
        );
      });
    setLoading(false);
  };

  const { msg } = alerta;
  return (
    <>
      <h2>Registrarse</h2>

      {msg && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmitNewUser} className={styles.formulario}>
        <div className={styles.campo}>
          <label htmlFor="newName">Nombre:</label>
          <input
            id="newName"
            type="text"
            placeholder="Tu Nombre"
            name="newName"
            value={newUser.newName}
            onChange={(e) => {
              handleOnChangeNewUser(e);
            }}
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="newLastnames">Apellidos:</label>
          <input
            id="newLastnames"
            type="text"
            placeholder="Tus Apellidos"
            name="newLastnames"
            value={newUser.newLastnames}
            onChange={(e) => {
              handleOnChangeNewUser(e);
            }}
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="newEmail">Email:</label>
          <input
            id="newEmail"
            type="email"
            placeholder="Email de Usuario"
            name="newEmail"
            value={newUser.newEmail}
            onChange={(e) => {
              handleOnChangeNewUser(e);
            }}
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="newPassword">Password:</label>
          <input
            id="newPassword"
            type="password"
            placeholder="Password de Usuario"
            name="newPassword"
            value={newUser.newPassword}
            onChange={(e) => {
              handleOnChangeNewUser(e);
            }}
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="repetir-password">Repetir Password:</label>
          <input
            id="repetir-password"
            type="password"
            placeholder="Repetir Password"
            name="repetirPassword"
            value={newUser.repetirPassword}
            onChange={(e) => {
              handleOnChangeNewUser(e);
            }}
          />
        </div>

        <input type="submit" value="Registrarse" className={styles.boton} />
      </form>
    </>
  );
}
