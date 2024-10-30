import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Box,
  Link
} from "@mui/material";
import { ROUTES } from "../constants";

export default function SignInPage() {
  // 이메일, 비밀번호, 에러 메시지 및 로그인 상태를 위한 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 버튼 클릭 시 호출되는 함수
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    // 간단한 유효성 검사
    if (email === "" || password === "") {
      setError("이메일과 비밀번호를 입력하세요.");
      return;
    }

    // 예시용으로 간단한 로그인 검증
    if (email === "test@example.com" && password === "password123") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  // 로그아웃 함수
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  return (
    <Container maxWidth="xs">
      {isLoggedIn ? (
        <Box textAlign="center" mt={5}>
          <Typography variant="h5">Welcome, {email}!</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            fullWidth
            sx={{ mt: 2 }}
          >
            로그아웃
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleLogin} mt={5}>
          <Typography variant="h5" align="center" gutterBottom>
            로그인
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            label="이메일"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            로그인
          </Button>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Link href={ROUTES.signup}>회원가입</Link>
          </Box>
        </Box>
      )}
    </Container>
  );
}
