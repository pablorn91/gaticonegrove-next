import styles from "./Alerta.module.css";
const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${styles.alerta} ${
        alerta.error ? styles.error : styles.aviso
      }`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
