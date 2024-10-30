import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Box,
} from "@mui/material";
import { ROUTES } from "../constants";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = (e:React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 예시 회원가입 처리 로직
    // API 요청 등을 통해 회원가입 구현
    setSuccess(true);
  };

  return (
    <Container maxWidth="xs">
      {success ? (
        <Box textAlign="center" mt={5}>
          <Typography variant="h5">회원가입이 완료되었습니다!</Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            href={ROUTES.signin}
          >
            로그인 페이지로 이동
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSignup} mt={5}>
          <Typography variant="h5" align="center" gutterBottom>
            회원가입
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
          <TextField
            label="비밀번호 확인"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            회원가입
          </Button>
        </Box>
      )}
    </Container>
  );
}
