import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import AuthenticationContext from "../context/AuthenticationContext";

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { accessToken } = useContext(AuthenticationContext);
    const router = useRouter();

    useEffect(() => {
      if (!accessToken) {
        router.replace("/");
      }
    }, [accessToken, router]);

    return accessToken ? <Component {...props} /> : null;
  };
}
