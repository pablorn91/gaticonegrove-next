import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Footer.module.css";

function Footer() {
  const router = useRouter();

  return (
    <footer className={styles.theFooter}>
      <div className={styles.contenedorFooter}>
        <nav className={styles.navegacionFooter}>
          <div className={styles.logo}>
            <Link href="/">
              <a>
                <Image
                  width={280}
                  height={70}
                  src="/img/logo.svg"
                  alt={"Logo Gatico Negro"}
                />
              </a>
            </Link>
          </div>
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
        </nav>

        <p className={styles.copyrights}>
          © 2015-2022 Gatico Negro. Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;
