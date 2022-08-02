import axiosClient from "../config/axios";
import { parseJwt } from "../helpers";

export async function createAddressApi(address) {
  const addresses = await getAddressesApi();

  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  try {
    await axiosClient.put(
      `/users/${parseJwt(token).id}`,
      {
        Addresses: [...addresses, address],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAddressesApi() {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  try {
    const { data } = await axiosClient(`/users/${parseJwt(token).id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.Addresses;
  } catch (error) {
    console.log(error);
  }
}
