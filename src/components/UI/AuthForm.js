import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { locationActions } from "../../store/location";
import LoadingSpinner from "../UI/LoadingSpinner";

const AuthForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const page = props.page;

  useEffect(() => {
    dispatch(locationActions.setPageIsHome(false));
  }, [dispatch]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({});
  const [seePass, setSeePass] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const submitFormHandler = async (e) => {
    e.preventDefault();

    let data;
    try {
      setHasError({});
      setIsLoading(true);
      let formBody;

      if (page === "login") {
        formBody = {
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
        };
      } else if (page === "signup") {
        formBody = {
          name: nameInputRef.current.value,
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
          passwordConfirm: confirmPasswordInputRef.current.value,
        };
      }

      const response = await fetch(
        `http://127.0.0.1:3000/api/v1/users/${page}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formBody),
        }
      );

      data = await response.json();

      if (response.ok) {
        history.push("/");
      }

      if (!response.ok) {
        throw new Error();
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setHasError(data);
    }
  };

  const changeAuthHandler = () => {
    if (page === "login") {
      history.push("/signup");
    } else {
      history.push("/login");
    }
  };

  const seePasswordHandler = () => {
    setSeePass((prevState) => !prevState);
  };

  const passHasValueHandler = (e) => {
    if (e.target.value.length >= 1) {
      setHasValue(true);
    } else if (e.target.value.length < 1) {
      setHasValue(false);
      setSeePass(false);
    }
  };

  const forgotPasswordHandler = () => {
    history.push("/forgot-password");
  };

  return (
    <div className="auth__div auth__form">
      {hasError.message && (
        <div className="auth__msg auth__msg-error">
          <p>{hasError.message}</p>
        </div>
      )}
      {isLoading && <LoadingSpinner styleClass="auth__loader" />}
      <form autoComplete="off" onSubmit={submitFormHandler}>
        {page === "signup" && (
          <div className="auth__form-input">
            <label htmlFor="name">Name</label>
            <input id="name" placeholder="Name" ref={nameInputRef} />
          </div>
        )}
        <div className="auth__form-input">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            ref={emailInputRef}
          />
        </div>
        <div className="auth__form-input">
          <label htmlFor="password">Password</label>
          <div className="auth__form-input--password">
            <input
              id="password"
              type={!seePass ? "password" : "text"}
              placeholder="Password"
              ref={passwordInputRef}
              onChange={passHasValueHandler}
            />
            {!seePass && hasValue && (
              <i className="far fa-eye" onClick={seePasswordHandler}></i>
            )}
            {seePass && hasValue && (
              <i className="fas fa-eye" onClick={seePasswordHandler}></i>
            )}
          </div>
        </div>
        {page === "signup" && (
          <div className="auth__form-input">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              ref={confirmPasswordInputRef}
            />
          </div>
        )}
        {page === "login" && (
          <div className="auth__forgot">
            <p onClick={forgotPasswordHandler}>Forgot password?</p>
          </div>
        )}
        <div className="auth__div">
          <button type="submit" className="auth__div-button">
            {page === "login" ? "Sign In" : "Create Account"}
          </button>
        </div>
      </form>
      <div>
        <div className="auth__div-type">
          <div></div>
          <p>{page === "login" ? "Not a member?" : "Already a member?"}</p>
          <div></div>
        </div>
        <div className="auth__div-select">
          <p>
            <span onClick={changeAuthHandler}>
              {page === "login" ? "Join" : "Login"}
            </span>{" "}
            to get the most of our membership.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
