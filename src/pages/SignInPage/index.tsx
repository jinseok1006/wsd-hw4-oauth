import classNames from "classnames/bind";
import styles from "./index.module.css";
import { useState } from "react";

// https://github.com/bikashdev01/First-Section-Code/tree/main/sign-in-out-form
// TODO: 반응형
// TODO: 초기 진입시 Signup카드 아래로 밀려있는 현상 수정

export default function SignIn() {
  const cx = classNames.bind(styles);
  const [isSignInFormActive, setIsSignInFormActive] = useState(false);
  const [isReturningToSignIn, setIsReturningToSignIn] = useState(false);
  const [isSignUpFormActive, setIsSignUpFormActive] = useState(false);
  const [isReturningToSignUp, setIsReturningToSignUp] = useState(false);

  const handleSignInToSignUpClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReturningToSignIn(false);
    setIsSignInFormActive(true);
    setIsReturningToSignUp(false);
    setIsSignUpFormActive(true);
  };

  const handleSignUpToSignInClick = () => {
    setIsSignInFormActive(false);
    setIsReturningToSignIn(true);
    setIsSignUpFormActive(false);
    setIsReturningToSignUp(true);
  };

  return (
    <div className={cx("container")}>
      <div
        className={cx("form-container", "sign-in-form", {
          submitted: isSignInFormActive,
          goback: isReturningToSignIn,
        })}
      >
        <div className={cx("form-image")}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 148">
            <path
              fill="white"
              fill-rule="evenodd"
              d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"
              transform="matrix(-1 0 0 1 1600 0)"
            />
          </svg>
        </div>
        <div className={cx("padding-wrap")}>
          <h1>Sign In</h1>

          <form id="sign-up-1" action="" onSubmit={(e) => e.preventDefault()}>
            <div className={cx("form-group")}>
              <input required id="name" type="email" />
              <label htmlFor="name">Email</label>
            </div>

            <div className={cx("form-group")}>
              <input required id="email" type="password" />
              <label htmlFor="email">Password</label>
            </div>

            <input type="submit" value="🔑로그인!!" />
          </form>

          <span className={cx("login")}>
            아직 계정이 없으신가요?{" "}
            <a id="log-in" onClick={handleSignInToSignUpClick}>
              회원가입
            </a>
          </span>
        </div>
      </div>

      <div
        className={cx("form-container", "sign-up-form", {
          pull: isSignUpFormActive,
          push: isReturningToSignUp,
        })}
      >
        <div className={cx("form-image")}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 148">
            <path
              fill="white"
              fill-rule="evenodd"
              d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"
              transform="matrix(-1 0 0 1 1600 0)"
            />
          </svg>
        </div>
        <div className={cx("padding-wrap")}>
          <h1>Create an Account</h1>

          <form id="sign-up-2" action="">
            <div className={cx("form-group")}>
              <input required id="name" type="text" />
              <label htmlFor="name">Name</label>
            </div>
            <div className={cx("form-group")}>
              <input required id="email" type="email" />
              <label htmlFor="pass">Email</label>
            </div>
            <div className={cx("form-group")}>
              <input required id="pass" type="password" />
              <label htmlFor="pass">Password</label>
            </div>

            <div className={cx("form-group")}>
              <input required id="pass2" type="password" />
              <label htmlFor="pass2">Confirm Password</label>
            </div>

            <input type="submit" value="🔐회원가입!!" />
          </form>

          <span id="back" className={cx("login")}>
            <a onClick={handleSignUpToSignInClick}>이미 계정이 있으신가요? </a>
          </span>
        </div>
      </div>
    </div>
  );
}
