import React, { useState, useRef } from "react";

const ForgotPassword = () => {
  const [status, setStatus] = useState({});
  const emailInputRef = useRef();
  let data;

  const submitFormHandler = async (e) => {
    e.preventDefault();

    try {
      const email = { email: emailInputRef.current.value };

      if (email.email.length === 0) {
        setStatus({
          status: "fail",
          message: "Email field must contain a value",
        });
        throw new Error();
      }

      const response = await fetch(
        `${process.env.REACT_APP_WEB_HOST}/users/forgotPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        }
      );

      data = await response.json();

      if (response.ok) {
        setStatus(data);
      }

      if (!response.ok) {
        setStatus(data);
        throw new Error();
      }
    } catch (err) {}
  };

  return (
    <div className="auth">
      <p className="auth__div-title auth__div">Forgot Password?</p>
      {status.status && (
        <div
          className={`auth__msg auth__msg-${
            status.status === "fail" ? "error" : "success"
          }`}
        >
          <p>{status.message}</p>
        </div>
      )}
      <form className="auth__form-input" onSubmit={submitFormHandler}>
        <label>Confirm your email address</label>
        <input type="email" placeholder="Email address" ref={emailInputRef} />
        <div className="auth__div">
          <button type="submit" className="auth__div-button">
            Send Password Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
