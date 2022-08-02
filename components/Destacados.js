import Link from "next/link";
import styles from "../styles/Destacados.module.css";

function Destacados({ destacadosProps }) {
  const {
    titulo,
    imagen1,
    imagen2,
    imagen3,
    imagen4,
    enlace1,
    enlace2,
    enlace3,
    enlace4,
    textoBoton,
    enlaceBoton,
  } = destacadosProps;
  return (
    <div className={styles.wrapDestacados}>
      <section className={styles.destacados}>
        <div className={styles.contenidoDestacado}>
          <h2>{titulo}</h2>

          <div className={styles.imagesPrimaryGrid}>
            <div className={styles.imagesSecondaryGrid}>
              <Link href={enlace1}>
                <a className={styles.image1}>
                  <img src={imagen1.url} alt="Imagen destacada" />
                </a>
              </Link>

              <Link href={enlace2}>
                <a className={styles.image2}>
                  <img src={imagen2.url} alt="Imagen destacada" />
                </a>
              </Link>

              <Link href={enlace3}>
                <a className={styles.image3}>
                  <img src={imagen3.url} alt="Imagen destacada" />
                </a>
              </Link>
            </div>
            <Link href={enlace4}>
              <a className={styles.image4}>
                <img src={imagen4.url} alt="Imagen destacada" />
              </a>
            </Link>
          </div>

          <Link href={enlaceBoton}>
            <a className={styles.botonDestacados}>{textoBoton}</a>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Destacados;
