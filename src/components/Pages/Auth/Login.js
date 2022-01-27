import React from "react";

import AuthForm from "../../UI/AuthForm";

const Login = () => {
  return (
    <div className="auth">
      <div className="auth__div">
        <p className="auth__div-title">Welcome back.</p>
      </div>
      <AuthForm page="login" />
    </div>
  );
};

export default Login;
