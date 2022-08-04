import { useState } from "react";
import Link from "next/link";
import axiosClient from "../../config/axios";
import Alerta from "../../components/Alerta";
import useAuth from "../../hooks/useAuth";
import useUserData from "../../hooks/useUserData";
import styles from "../../styles/Formulario.module.css";

export default function LoginForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [alerta, setAlerta] = useState({});

  const { setAuth, setLoading } = useAuth();
  const { setCart, setAddresses } = useUserData();

  const handleOnChangeUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (Object.values(user).length < 2 || Object.values(user).includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }
    loginUser();

    setUser({
      email: "",
      password: "",
    });

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const loginUser = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.post("/auth/local", {
        identifier: user.email,
        password: user.password,
      });
      localStorage.setItem("token", data.jwt);
      setAuth({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        lastnames: data.user.lastnames,
      });
      setCart(data.user.shoppingCart ?? []);
      setAddresses(data.user.Addresses ?? []);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const { msg } = alerta;

  return (
    <>
      <h2>Acceder</h2>
      <Link href="./olvide-password">
        <p className={styles.olvideLink}>Olvidaste tu password?</p>
      </Link>
      {msg && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmitLogin} className={styles.formulario}>
        <div className={styles.campo}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Usuario"
            name="email"
            value={user.email}
            onChange={(e) => {
              handleOnChangeUser(e);
            }}
          />
        </div>
        <div className={styles.campo}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Password de Usuario"
            name="password"
            value={user.password}
            onChange={(e) => {
              handleOnChangeUser(e);
            }}
          />
        </div>

        <input type="submit" value="Acceder" className={styles.boton} />
      </form>
    </>
  );
}
