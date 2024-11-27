import { RouterProvider } from "react-router-dom";
import router from "./router";
import { createTheme, CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import SimpleDialog from "./components/SimpleDialog";

import SimpleSnackBar from "./components/SnackBar";

const fontFamily =
  '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol", sans-serif';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#333",
    },
    secondary: {
      main: "#123",
    },
  },
  typography: {
    fontFamily,
  },
});

function App() {
  // const setUser = useSessionStore((state) => state.setUser);
  // const setEmail = useWishlistStore((state) => state.setEmail);

  // useEffect(() => {
  //   setUser({
  //     email: "testuser@gmail.com",
  //     apiKey: TMDB_API_KEY,
  //   }),
  //     setEmail("testuser@gmail.com");
  // }, [setUser, setEmail]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ".infinite-scroll-component": {
            overflowY: "hidden !important",
          },
        }}
      />
      <RouterProvider router={router} />

      <SimpleDialog />
      <SimpleSnackBar />
    </ThemeProvider>
  );
}

export default App;
