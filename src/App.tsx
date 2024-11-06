import { RouterProvider } from "react-router-dom";
import router from "./router";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

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

// theme = createTheme(theme, {
//   palette: {
//     mode: 'dark',
//     // primary: {
//     //   main: "#333",
//     // },
//     // background: {
//     //   default: '#141414'
//     // }
//     // text: {
//     //   primary: '#fff',
//     // }
//   },
// });

export default function App() {
  return (
    <ThemeProvider theme={theme}>
    {/* <> */}
      <CssBaseline />
      <RouterProvider router={router} />
    {/* </> */}
    </ThemeProvider>
  );
}
