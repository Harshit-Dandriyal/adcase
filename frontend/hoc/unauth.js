import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import AuthenticationContext from "../context/AuthenticationContext";

export function withUnauth(Component) {
  return function UnauthenticatedComponent(props) {
    const { accessToken } = useContext(AuthenticationContext);
    const router = useRouter();

    useEffect(() => {
      if (accessToken) {
        router.replace("/main"); // Replace with your main page
      }
    }, [accessToken, router]);

    return <Component {...props} />;
  };
}
