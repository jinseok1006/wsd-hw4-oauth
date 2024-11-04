import { RouterProvider } from "react-router-dom";
import router from "./router";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

let theme = createTheme({
  typography: {
    fontFamily:
      '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
  },
});

theme = createTheme(theme, {
  palette: {
    primary: {
      main: "#141414",
      contrastText: '#fefefe'
    },
  },
  text: {
    primary: "#373D47"
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}
