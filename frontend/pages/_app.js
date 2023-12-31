// _app.js
import { useEffect } from "react";
import "../styles/tailwind.css";
import { AuthenticationProvider } from "../context/AuthenticationContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <AuthenticationProvider>
      <Component {...pageProps} />
    </AuthenticationProvider>
  );
}

export default MyApp;
