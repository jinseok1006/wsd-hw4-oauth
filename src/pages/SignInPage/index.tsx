import classNames from "classnames/bind";
import styles from "./index.module.css";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import { useSessionStore } from "../../store/useSessionStore";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

// https://github.com/bikashdev01/First-Section-Code/tree/main/sign-in-out-form
// TODO: 초기 진입시 Signup카드 아래로 밀려있는 현상 수정

export default function SignInContainer() {
  const location = useLocation();
  const from = location.state?.from;
  const user = useSessionStore((state) => state.user);

  if (from && user) {
    return <Navigate to={from} replace />;
  }

  return <SignIn />;
}

function SignIn() {
  const cx = classNames.bind(styles);

  const [isSignInFormActive, setIsSignInFormActive] = useState(false);
  const [isReturningToSignIn, setIsReturningToSignIn] = useState(false);

  // const [isSignUpFormActive, setIsSignUpFormActive] = useState(false);
  // const [isReturningToSignUp, setIsReturningToSignUp] = useState(false);

  const handleSignInToSignUpClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReturningToSignIn(false);
    setIsSignInFormActive(true);
    // setIsReturningToSignUp(false);
    // setIsSignUpFormActive(true);
  };

  const handleSignUpToSignInClick = () => {
    setIsSignInFormActive(false);
    setIsReturningToSignIn(true);
    // setIsSignUpFormActive(false);
    // setIsReturningToSignUp(true);
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 스크롤 금지
    document.body.style.overflow = "hidden";

    // 컴포넌트가 언마운트될 때 원래 상태로 복구
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트/언마운트 될 때만 실행

  return (
    <div className={cx("container")}>
      <SignInForm
        isReturningToSignIn={isReturningToSignIn}
        isSignInFormActive={isSignInFormActive}
        handleSignInToSignUpClick={handleSignInToSignUpClick}
      />
      <SignUpForm
        isReturningToSignUp={isReturningToSignIn}
        isSignUpFormActive={isSignInFormActive}
        handleSignUpToSignInClick={handleSignUpToSignInClick}
      />
    </div>
  );
}
function SignUpForm({
  handleSignUpToSignInClick,
  isSignUpFormActive,
  isReturningToSignUp,
}: {
  handleSignUpToSignInClick: () => void;
  isSignUpFormActive: boolean;
  isReturningToSignUp: boolean;
}) {
  const cx = classNames.bind(styles);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false); // 약관 동의 상태 추가

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유저 정보 객체 생성
    const newUser = {
      email: email,
      password: password,
    };

    // localStorage에서 기존 users 배열을 가져오고, 없으면 빈 배열로 초기화
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // 이미 등록된 유저가 있는지 확인 (email 중복 체크)
    const userExists = users.some(
      (user: { email: string }) => user.email === email
    );

    if (userExists) {
      alert("이미 존재하는 이메일입니다.");
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 새로운 유저 추가
    users.push(newUser);

    // 업데이트된 users 배열을 localStorage에 저장
    localStorage.setItem("users", JSON.stringify(users));

    // 회원가입 후 입력값 초기화 (필요시)
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAgreeToTerms(false);

    // 회원가입 성공 후 알림 (옵션)
    alert("회원가입 성공!"); // 모달로 수정예정

    // 회원가입 후 로그인 페이지로 이동하는 함수 호출 (선택 사항)
    handleSignUpToSignInClick();
  };

  return (
    <div
      className={cx("form-container", "sign-up-form", {
        pull: isSignUpFormActive,
        push: isReturningToSignUp,
      })}
    >
      <div className={cx("form-image")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 148">
          <path
            fill="#232323"
            fillRule="evenodd"
            d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"
            transform="matrix(-1 0 0 1 1600 0)"
          />
        </svg>
      </div>
      <div className={cx("padding-wrap")}>
        <h1 style={{ paddingBottom: "16px" }}>Create an Account</h1>

        <form id="sign-up-2" onSubmit={handleSignUpSubmit}>
          <div className={cx("form-group")} style={{ marginBottom: 20 }}>
            <input
              required
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={cx("form-group")} style={{ marginBottom: 20 }}>
            <input
              required
              id="pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
            <label htmlFor="pass">Password</label>
          </div>
          <div className={cx("form-group")} style={{ marginBottom: 20 }}>
            <input
              required
              id="pass2"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=""
            />
            <label htmlFor="pass2">Confirm Password</label>
          </div>
          {/* 약관 동의 체크박스 추가 */}
          <div style={{ marginBottom: 20 }}>
            <Checkbox
              required
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              color="primary"
              id="agreeToTerms"
            />
            <label htmlFor="agreeToTerms">
              회원가입을 위한 약관에 동의합니다.
            </label>
          </div>
          {/* 체크박스를 선택하지 않으면 버튼 비활성화 */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              borderRadius: 12,
              py: 1.25,
              bgcolor: "#33383c",
            }}
            disabled={
              !agreeToTerms ||
              email.length === 0 ||
              password.length === 0 ||
              confirmPassword.length === 0
            }
          >
            회원가입
          </Button>
        </form>

        <Box display="flex" justifyContent="center">
          <Link
            component="button"
            onClick={handleSignUpToSignInClick}
            variant="body2"
            sx={{ color: "#5d6381", textAlign: "center", mt: 1 }}
          >
            이미 계정이 있으신가요?
          </Link>
        </Box>
      </div>
    </div>
  );
}

function SignInForm({
  isReturningToSignIn,
  isSignInFormActive,
  handleSignInToSignUpClick,
}: {
  isSignInFormActive: boolean;
  isReturningToSignIn: boolean;
  handleSignInToSignUpClick: (e: React.FormEvent) => void;
}) {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();

  // 이메일 패스워드 input 상태 및 핸들러 추가
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSessionStore((state) => state.setUser);
  const [rememberMe, setRememberMe] = useState(true);
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  // 컴포넌트가 처음 마운트될 때 로컬스토리지에서 rememberedEmail을 가져옴
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  // input에 대한 change handler 추가
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 로그인 로직 추가
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );

    if (user) {
      // 전역상태에 유저 정보 저장
      setUser({ email: user.email, apiKey: user.password });

      // rememberMe 핸들링
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      navigate("/");
    } else {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div
      className={cx("form-container", "sign-in-form", {
        submitted: isSignInFormActive,
        goback: isReturningToSignIn,
      })}
    >
      <div className={cx("form-image")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 148">
          <path
            fill="#232323"
            fillRule="evenodd"
            d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"
            transform="matrix(-1 0 0 1 1600 0)"
          />
        </svg>
      </div>
      <div className={cx("padding-wrap")}>
        <h1>Sign In</h1>

        <form id="sign-up-1" onSubmit={handleSubmit}>
          <div className={cx("form-group")}>
            <input
              required
              id="signin-email"
              type="email"
              placeholder=""
              value={email}
              onChange={handleEmailChange}
            />
            <label htmlFor="signin-email">Email</label>
          </div>

          <div className={cx("form-group")}>
            <input
              required
              id="signin-pass"
              type="password"
              placeholder=""
              value={password}
              onChange={handlePasswordChange}
            />
            <label htmlFor="signin-pass">Password</label>
          </div>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <FormControlLabel
              control={
                <Checkbox
                  id="remember-me"
                  onChange={handleRememberMeChange}
                  checked={rememberMe}
                />
              }
              label="Remember me"
            />

            <Link
              href="/forgot-password"
              variant="body2"
              sx={{ color: "#5d6381" }}
            >
              Forgot Password?
            </Link>
          </Box>

          <input type="submit" value="🔑로그인!!" />
        </form>

        <Box display="flex" justifyContent="center">
          <Typography color="white" variant="body2" mr={1}>
            아직 계정이 없으신가요?
          </Typography>
          <Link
            component="button"
            onClick={handleSignInToSignUpClick}
            variant="body2"
            sx={{ color: "#5d6381" }}
          >
            회원가입
          </Link>
        </Box>
      </div>
    </div>
  );
}
