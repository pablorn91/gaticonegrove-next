import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import LoginForm from "../../components/Forms/LoginForm";
import RegisterForm from "../../components/Forms/RegisterForm";
import useAuth from "../../hooks/useAuth";

export default function AccederRegistrar() {
  const { auth } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (Object.values(auth).length !== 0) {
      router.push("./perfil");
    }
  }, [auth]);

  return (
    <Layout pagina="Login" headerProps={false}>
      {Object.values(auth).length !== 0 ? (
        <Spinner />
      ) : (
        <>
          <LoginForm />

          <RegisterForm />
        </>
      )}
    </Layout>
  );
}
