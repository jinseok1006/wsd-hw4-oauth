import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ky from "ky";
import { useSessionStore } from "../store/useSessionStore";

const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const KAKAO_RESTAPI_KEY = import.meta.env.VITE_KAKAO_RESTAPI_KEY;

interface KakaoUserProfile {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile: {
      nickname: string;
      is_default_nickname: boolean;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
  };
}

interface KakaoAuthResponse {
  access_token: string;
  token_type: string; // Typically "bearer"
  refresh_token: string;
  expires_in: number; // Time in seconds until the access token expires
  scope: string; // Space-separated list of authorized scopes
  refresh_token_expires_in: number; // Time in seconds until the refresh token expires
}

const OauthCallbackPage: React.FC = () => {
  const location = useLocation();
  const setUser = useSessionStore((state) => state.setUser);
  const navigate=useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");

    if (code) {
      // console.log("Authorization Code:", code);

      // Access Token 발급 요청
      fetchAccessToken(code);
    } else {
      console.error("로그인 실패 또는 취소되었습니다.");
    }
  }, [location.search]);

  const fetchAccessToken = async (code: string) => {
    try {
      const response = await ky
        .post("https://kauth.kakao.com/oauth/token", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: KAKAO_RESTAPI_KEY,
            redirect_uri: KAKAO_REDIRECT_URI,
            code: code,
          }),
        })
        .json<KakaoAuthResponse>();

      // console.log(`response:${JSON.stringify(response, null, 4)}`);

      if ("access_token" in response) {
        // console.log("Access Token:", response.access_token);

        // Access Token 설정
        window.Kakao.Auth.setAccessToken(response.access_token);

        // 사용자 정보 요청
        fetchUserProfile(response);
      } else {
        console.error("Access Token 발급 실패:", response);
      }
    } catch (error) {
      console.error("Access Token 요청 실패:", error);
    }
  };

  const fetchUserProfile = async (authResponse: KakaoAuthResponse) => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      console.error("Kakao SDK가 초기화되지 않았습니다.");
      return;
    }

    try {
      const response = await window.Kakao.API.request({
        url: "/v2/user/me",
      });

      const userProfile = response as KakaoUserProfile;

      console.log("사용자 정보:", userProfile);

      // 세션 스토어에 사용자 정보 저장
      setUser({
        email: userProfile.kakao_account.email,
        name: userProfile.properties.nickname,
        accessToken: authResponse.access_token,
        refreshToken: authResponse.refresh_token,
      });
      navigate('/');
    } catch (error) {
      console.error("사용자 정보 요청 실패:", error);
    }
  };

  return <div>로그인 처리 중...</div>;
};

export default OauthCallbackPage;
