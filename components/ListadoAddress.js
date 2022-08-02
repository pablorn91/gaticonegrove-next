import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import stylesListadoAddress from "../styles/ListadoAddress.module.css";

export default function ListadoAddress({ addresses, loading }) {
  return loading ? (
    <Spinner />
  ) : (
    <div className={stylesListadoAddress.listado}>
      {addresses?.map((address) => (
        <Address
          key={`${address.postalCode}-${address?.id}`}
          address={address}
        />
      ))}
    </div>
  );
}

function Address({ address }) {
  return (
    <div>
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city}, {address.postalCode}
      </p>
      <p>{address.phone}</p>
    </div>
  );
}
