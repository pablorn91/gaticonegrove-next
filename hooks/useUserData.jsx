import { useContext } from "react";
import UserDataContext from "../context/UserDataProvider";

const useUserData = () => useContext(UserDataContext);

export default useUserData;
