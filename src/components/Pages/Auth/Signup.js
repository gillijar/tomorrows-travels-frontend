import React from "react";

import AuthForm from "../../UI/AuthForm";

const Signup = () => {
  return (
    <div className="auth">
      <div className="auth__div">
        <p className="auth__div-title">Create Account</p>
      </div>
      <AuthForm page="signup" />
    </div>
  );
};

export default Signup;
