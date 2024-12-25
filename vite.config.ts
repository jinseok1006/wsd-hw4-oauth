import { defineConfig} from "vite";
import react from "@vitejs/plugin-react";
// import path from "path";
// import { fileURLToPath } from "url";



// https://vite.dev/config/
export default defineConfig(() => {
  // const env = loadEnv(mode, process.cwd());

  return {
    // define: {
    //   // 환경 변수를 클라이언트 코드에서 사용 가능하도록 정의
    //   'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    // },
    base: "/wsd-hw4-oauth/",
    plugins: [react()],
    server: {
      host: true,
    },
  };
});
