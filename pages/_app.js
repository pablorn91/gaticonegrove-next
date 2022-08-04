import "../styles/globals.css";
import "../styles/normalize.css";
import { UserDataProvider } from "../context/UserDataProvider";
import { AuthProvider } from "../context/AuthProvider";
import { createTheme, ThemeProvider } from "@mui/material";

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    typography: {
      fontFamily: ["Lato", "sans-serif"].join(","),
    },
  });

  return (
    <UserDataProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </UserDataProvider>
  );
}

export default MyApp;
