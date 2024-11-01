import React, { useState } from 'react';

function SignIn() {
  const [authMode, setAuthMode] = useState('login'); // 'login' 또는 'signup' 상태를 관리합니다.

  const toggleAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === 'login' ? 'signup' : 'login'));
  };

  return (
    <div>
      {authMode === 'login' ? (
        <div>
          <h2>로그인</h2>
          <LoginComponent />
          <p>
            계정이 없으신가요?{' '}
            <button onClick={toggleAuthMode}>회원가입하기</button>
          </p>
        </div>
      ) : (
        <div>
          <h2>회원가입</h2>
          <SignupComponent />
          <p>
            이미 계정이 있으신가요?{' '}
            <button onClick={toggleAuthMode}>로그인하기</button>
          </p>
        </div>
      )}
    </div>
  );
}

function LoginComponent() {
  return (
    <form>
      {/* 로그인 폼 */}
      <input type="email" placeholder="이메일" />
      <input type="password" placeholder="비밀번호" />
      <button type="submit">로그인</button>
    </form>
  );
}

function SignupComponent() {
  return (
    <form>
      {/* 회원가입 폼 */}
      <input type="email" placeholder="이메일" />
      <input type="password" placeholder="비밀번호" />
      <input type="password" placeholder="비밀번호 확인" />
      <button type="submit">회원가입</button>
    </form>
  );
}

export default SignIn;
