import React from "react";
import { Box, Button, Typography } from "@mui/material";

const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const KakaoLoginPage: React.FC = () => {
  const handleKakaoLogin = async () => {
    // Replace with Kakao Login logic
    try {
      window.Kakao.Auth.authorize({
        redirectUri: KAKAO_REDIRECT_URI, // 변경할 Redirect URI 입력
        // scope: "account_email,profile", // 요청할 추가 동의 항목 설정
      });

      // Update session store with user details
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="95svh"
      bgcolor="background.default"
      px={3}
    >
      <Typography variant="h4" gutterBottom>
        카카오 로그인
      </Typography>
      <Typography variant="body1" gutterBottom>
        계속하려면 카카오 로그인을 사용하세요.
      </Typography>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={handleKakaoLogin}
        sx={{
          mt: 2,
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "8px",
          padding: "10px 20px",
        }}
      >
        카카오로 로그인
      </Button> */}

      {/* <Button
      onClick={handleKakaoLogin}
      sx={{
        textTransform: "none",
        fontWeight: 600,
        borderRadius: "8px",
        padding: "10px 20px",
        color: "#3C1E1E",
        backgroundColor: "#FEE500",
        '&:hover': {
          backgroundColor: "#E0C200",
        },
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        fontSize: "16px",
      }}
    >
      <Box component="span" sx={{ mr: 1, display: "inline-flex", alignItems: "center" }}>
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
          alt="카카오"
          style={{ width: "20px", height: "20px" }}
        />
      </Box>
      
    </Button> */}
<Button
      sx={{
        
        
        padding: 0, // 내부 패딩 제거
        minWidth: 0, // 기본 최소 너비 제거
        border: "none", // 테두리 제거
        boxShadow: "none", // 그림자 제거
        background: "none", // 기본 배경 제거
        '&:hover': {
          background: "none", // 호버 시 배경색 제거
        },
      }}
      onClick={handleKakaoLogin}
    >
      <img
        src="kakao_login.png"
        alt="카카오 로그인"
        style={{
          display: "block", // 이미지가 블록 요소로 표시되도록 설정
        
        }}
      />
    </Button>
    </Box>
  );
};

export default KakaoLoginPage;
