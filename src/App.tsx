import { RouterProvider } from "react-router-dom";
import router from "./router";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import SimpleDialog from "./components/SimpleDialog";

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <SimpleDialog />
    </ThemeProvider>
  );
}

// const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// function TestProvider() {
//   const { setUser } = useSessionStore((state) => ({
//     setUser: state.setUser,
//   }));

//   useEffect(
//     () =>
//       setUser({
//         email: "testuser@gmail.com",
//         apiKey: TMDB_API_KEY,
//       }),
//     [setUser]
//   );

//   return <App />;
// }

export default App;
