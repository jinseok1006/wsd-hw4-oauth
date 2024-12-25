import { useEffect, useState } from "react";

const KAKAO_JSSDK_KEY = import.meta.env.VITE_KAKAO_JSSDK_KEY;

function useKakao() {
  const [loaded, setLoading] = useState(false);
  useEffect(() => {
    // 카카오 SDK 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.js";
    script.integrity =
      "sha384-ecvGBB5fS6qIZVCfT9oUu3buDu7xIsXT0aEa2f/b+rBxNYWi3b2hksr9Jfi/jn8m";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);

    // 스크립트 로드 후 Kakao 초기화
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JSSDK_KEY); // 발급받은 JavaScript 키를 여기에 삽입
        setLoading(true);
      }
    };

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.body.removeChild(script);
    };
  }, []);

  return loaded;
}

export default useKakao;
