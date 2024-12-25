// import React from "react";

const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

function KakaoLoginButton() {
  const kakao = window.Kakao
  const handleLogin = async () => {
    try {
      // OAuth Redirect 방식으로 로그인 처리
      kakao.Auth.authorize({
        redirectUri: KAKAO_REDIRECT_URI, // 변경할 Redirect URI 입력
        // scope: "account_email,profile", // 요청할 추가 동의 항목 설정
      });
    } catch (error) {
      console.error("로그인 요청 실패:", error);
    }
  };

  return <button onClick={handleLogin}>카카오 로그인</button>;
}

export default KakaoLoginButton;
