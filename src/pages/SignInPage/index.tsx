import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function SignInPage() {
  const [authMode, setAuthMode] = useState("login"); // 'login' 또는 'signup' 상태를 관리합니다.

  const toggleAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === "login" ? "signup" : "login"));
  };

  if (authMode === "signup") {
    return <SignUp toggleAuthMode={toggleAuthMode} />;
  }

  return <SignIn toggleAuthMode={toggleAuthMode} />;
}
