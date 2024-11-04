import classNames from "classnames/bind";
import styles from "./signin.module.css";
import { useState } from 'react';

export default function SignIn() {
  const cx = classNames.bind(styles);
  const [isForm1Submitted, setIsForm1Submitted] = useState(false);
  const [isForm1Goback, setIsForm1Goback] = useState(false);
  const [isForm2Pull, setIsForm2Pull] = useState(false);
  const [isForm2Push, setIsForm2Push] = useState(false);
  // const [isForm3Active, setIsForm3Active] = useState(false);

  const handleSignUp1Submit = (e) => {
    e.preventDefault();
    setIsForm1Goback(false);
    setIsForm1Submitted(true);
    setIsForm2Push(false);
    setIsForm2Pull(true);
  };

  // const handleLogInClick = () => {
  //   setIsForm3Active(true);
  // };

  // const handleGoToSignupClick = () => {
  //   setIsForm3Active(false);
  // };

  const handleBackClick = () => {
    setIsForm1Submitted(false);
    setIsForm1Goback(true);
    setIsForm2Pull(false);
    setIsForm2Push(true);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("form-container", "form-1", {
        submitted: isForm1Submitted,
        goback: isForm1Goback
      })}>
        <div className={cx("form-image")}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 148">
            <path fill="white" fill-rule="evenodd"
              d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"
              transform="matrix(-1 0 0 1 1600 0)" />
          </svg>
        </div>
        <div className={cx("padding-wrap")}>
          <h1>Create an Account</h1>

          <form id="sign-up-1" action="" onSubmit={(e)=>e.preventDefault()}>
            <div className={cx("form-group")}>
              <input required id="name" type="text" />
              <label htmlFor="name">Name</label>
            </div>

            <div className={cx("form-group")}>
              <input required id="email" type="text" />
              <label htmlFor="email">Email</label>
            </div>

            <input type="submit" value="Get Started" />
          </form>

          <span className={cx("login")}>Already have an account? <a id="log-in" onClick={handleSignUp1Submit}>Log in.</a></span>
        </div>
      </div>

      <div className={cx("form-container", "form-2", {
        pull: isForm2Pull,
        push: isForm2Push
      })}>
        <div className={cx("form-image")}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 148">
            <path fill="white" fill-rule="evenodd"
              d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"
              transform="matrix(-1 0 0 1 1600 0)" />
          </svg>
        </div>
        <div className={cx("padding-wrap")}>
          <h1>Set Your Password</h1>

          <form id="sign-up-2" action="">
            <div className={cx("form-group")}>
              <input required id="pass" type="password" />
              <label htmlFor="pass">Password</label>
            </div>

            <div className={cx("form-group")}>
              <input required id="pass2" type="text" />
              <label htmlFor="pass2">Confirm Password</label>
            </div>

            <input type="submit" value="Sign Up" />
          </form>

          <span id="back" className={cx("login")}><a onClick={handleBackClick}>Go back.</a></span>
        </div>
      </div>

      {/* <div className={cx("form-container", "form-3", {
        active: isForm3Active
      })}>
        <div className={cx("form-image")}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 148">
            <path fill="white" fill-rule="evenodd"
              d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"
              transform="matrix(-1 0 0 1 1600 0)" />
          </svg>
        </div>
        <div className={cx("padding-wrap")}>
          <h1>Login</h1>

          <form id="log-in-1" action="">
            <div className={cx("form-group")}>
              <input required id="emailin" type="text" />
              <label htmlFor="emailin">Email</label>
            </div>

            <div className={cx("form-group")}>
              <input required id="passin" type="password" />
              <label htmlFor="passin">Password</label>
            </div>

            <input type="submit" value="Log in" />
          </form>

          <span className={cx("login")}>No account? <a id="go-to-signup" onClick={handleGoToSignupClick}>Sign up.</a></span>
        </div>
      </div> */}
    </div>
  );
}