import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  HiOutlineSearch,
  HiOutlineUserCircle,
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiMenu,
  HiX,
} from "react-icons/hi";
import useAuth from "../hooks/useAuth";
import styles from "../styles/Nav.module.css";

const Nav = () => {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(false);

  const { auth } = useAuth();

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (isChecked) {
      body.classList.add("noScroll");
    } else {
      body.classList.remove("noScroll");
    }
  }, [isChecked]);

  return (
    <div className="contenedor">
      
      <nav className={styles.navegacionContenedor}>
      
        <div className={styles.burgerMenu}>
          <div className={styles.menuIcon}>
             <HiMenu />
          </div>
          <input
            type="checkbox"
            className={styles.inputMenu}
            checked={isChecked}
            onChange={handleOnChange}
          />
          <div></div>
          <div className={styles.contenedorMenuMovil}>
            <div className={styles.cerrarMenuMovil}>
              <HiX />
            
            <input
              type="checkbox"
              className={styles.inputCerrarMenu}
              checked={isChecked}
              onChange={handleOnChange}
            />
            </div>
            <div className={styles.menuMovil}>
              <div className={styles.busquedaMenuMovil}>
                <input type="text" />
                <div className={styles.iconoBusquedaMenuMovil}>
                  <HiOutlineSearch />
                </div>
              </div>
              <Link href="/tienda">
                <a
                  className={router.pathname == "/tienda" ? styles.active : ""}
                >
                  Tienda
                </a>
              </Link>
              <Link href="/colecciones">
                <a
                  className={
                    router.pathname == "/colecciones" ? styles.active : ""
                  }
                >
                  Colecciones
                </a>
              </Link>
              <Link href="/personalizar">
                <a
                  className={
                    router.pathname == "/personalizar" ? styles.active : ""
                  }
                >
                  Personalizar
                </a>
              </Link>

              {Object.values(auth).length === 0 ? (
                  <Link href='/mi-cuenta/acceder-registrarse'>
                  <a
                    className={
                      router.pathname == "/mi-cuenta/acceder-registrarse" ? styles.active : ""
                    }
                  >
                    Acceder / Registrarse 
                  </a>
                </Link>
              ): (
                <Link href='/mi-cuenta/perfil'>
                <a
                  className={
                    router.pathname == "/mi-cuenta/perfil" ? styles.active : ""
                  }
                >
                  Mi Cuenta 
                </a>
              </Link>
              )}
              
            </div>
          </div>
        </div>

        <div className={styles.logo}>
         <Link href='/'>
           <a>
              <Image
                  width={280}
                  height={50}
                  src="/img/logo.svg"
                  alt={"Logo Gatico Negro"}
              />
           </a>
         </Link>
        </div>

        <div className={styles.navegacion}>
          <div className={styles.enlaces}>
            <Link href="/tienda">
              <a className={router.pathname == "/tienda" ? styles.active : ""}>
                Tienda
              </a>
            </Link>
            <Link href="/colecciones">
              <a
                className={
                  router.pathname == "/colecciones" ? styles.active : ""
                }
              >
                Colecciones
              </a>
            </Link>
            <Link href="/personalizar">
              <a
                className={
                  router.pathname == "/personalizar" ? styles.active : ""
                }
              >
                Personalizar
              </a>
            </Link>
          </div>

          <div className={styles.iconContenedor}>
            <div className={styles.icono}>
              <HiOutlineSearch />
            </div>
            <div className={styles.icono}>
              {Object.values(auth).length === 0 ? (
                <Link href='/mi-cuenta/acceder-registrarse'>
                <a className={
                  router.pathname == "/mi-cuenta/acceder-registrarse" ? styles.activeIcon : ""
                }>
                  <HiOutlineUserCircle />
                </a>
              </Link>
              ): (
                <Link href='/mi-cuenta/perfil'>
                <a className={
                  router.pathname == "/mi-cuenta/perfil" ? styles.activeIcon : ""
                }>
                  <HiOutlineUserCircle />
                </a>
              </Link>
              ) }
              
            </div>
            <div className={styles.icono}>
              <HiOutlineHeart />
            </div>
            <div className={styles.icono}>
              <HiOutlineShoppingBag />
            </div>
            {Object.values(auth).length !== 0 && 
           <p className={styles.saludoAutenticado}>Hola, {auth.name}</p> }
          </div>
          
        </div>
      </nav>
      
    </div>
  );
};

export default Nav;
