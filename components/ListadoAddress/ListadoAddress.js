import styles from "./ListadoAddress.module.css";

export default function ListadoAddress({
  addresses,
  handleOpen,
  deleteAddress,
}) {
  return addresses?.length === 0 ? (
    <p>No hay direcciones. Añade una pulsando +.</p>
  ) : (
    <div className={styles.listado}>
      {addresses?.map((address) => (
        <Address
          key={`${address.postalCode}${address?.id}${address?.title}`}
          address={address}
          handleOpen={handleOpen}
          deleteAddress={deleteAddress}
        />
      ))}
    </div>
  );
}

function Address({ address, handleOpen, deleteAddress }) {
  return (
    <div className={styles.address}>
      <div>
        <p>{address.title}</p>
        <p>{address.name}</p>
        <p>{address.address}</p>
        <p>
          {address.state}, {address.city}, {address.postalCode}
        </p>
        <p>{address.phone}</p>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => handleOpen(`Editar: ${address.title}`, address)}
        >
          Editar
        </button>
        <button
          type="button"
          className={styles.secondary}
          onClick={() => deleteAddress(address?.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
