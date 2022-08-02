import "../styles/globals.css";
import "../styles/normalize.css";
import { AuthProvider } from "../context/AuthProvider";
import { createTheme, ThemeProvider } from "@mui/material";

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    typography: {
      fontFamily: ["Lato", "sans-serif"].join(","),
    },
  });

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
